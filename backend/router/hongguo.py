# -*- coding: utf-8 -*-
"""
HongGuo Short Drama API Router
Cung cấp API:
1. GET /api/hongguo/detail: Xem chi tiết phim, metadata, tổng số tập và danh sách tập phim (index, vid, title, duration, cover)
2. POST /api/hongguo/download-batch: Tải video hàng loạt theo danh sách vid hoặc range tập, tùy chỉnh số luồng download và thư mục lưu.
3. GET /api/hongguo/download-single: Tải nhanh 1 tập lẻ hoặc lấy link phát video.
"""

from __future__ import annotations

import asyncio
import concurrent.futures
import logging
import os
import re
import threading
import uuid
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, Query, Request
from pydantic import BaseModel, Field

from core.ws_manager import ws_manager
from service.detail_video_hongguo import get_series_detail, get_episodes
from service.dialog_service import open_folder_dialog
from service.download_hongguo import (
    handle_video_request,
    resolve_batch_video_models,
    get_download_base_dir,
    generate_video_filename,
)
from service.handle_video import (
    ensure_homogeneous_videos,
    concat_videos_stream_copy,
    extract_and_concat_clean_audio,
    execute_dubbing_pipeline_for_stream_copy,
)

logger = logging.getLogger("router_hongguo")

router = APIRouter(prefix="/api/hongguo", tags=["hongguo"])

# ---------------------------------------------------------------------------
# Download Cancellation / Pause Management
# ---------------------------------------------------------------------------
_cancelled_download_ops: set[str] = set()
_cancelled_ops_lock = threading.Lock()


def cancel_hongguo_download(op_id: str) -> None:
    """Đánh dấu op_id bị hủy/tạm dừng tải."""
    if not op_id:
        return
    with _cancelled_ops_lock:
        _cancelled_download_ops.add(op_id)


def is_hongguo_download_cancelled(op_id: Optional[str]) -> bool:
    """Kiểm tra xem tác vụ tải có đang bị yêu cầu dừng không."""
    if not op_id:
        return False
    with _cancelled_ops_lock:
        return op_id in _cancelled_download_ops


def clear_cancelled_hongguo_op(op_id: str) -> None:
    """Xóa op_id khỏi danh sách đã dừng khi bắt đầu lượt mới."""
    if not op_id:
        return
    with _cancelled_ops_lock:
        _cancelled_download_ops.discard(op_id)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class DownloadItemRequest(BaseModel):
    vid: str = Field(..., description="Video ID (vid) của tập phim")
    episode: Optional[Union[int, str]] = Field(None, description="Số tập (vd: 1, 2, 'tập 1')")
    filename: Optional[str] = Field(None, description="Tên file tùy chỉnh (nếu có)")


class BatchDownloadRequest(BaseModel):
    op_id: Optional[str] = Field(None, description="Operation ID để theo dõi qua WebSocket")
    series_id: Optional[str] = Field(None, description="ID bộ phim (series_id)")
    series_title: Optional[str] = Field(None, description="Tên phim dùng để đặt thư mục lưu (tùy chọn)")
    items: Optional[List[DownloadItemRequest]] = Field(
        None, description="Danh sách các tập cần tải (nếu truyền trực tiếp list vid)"
    )
    episode_range: Optional[str] = Field(
        None, description="Khoảng tập muốn tải nếu có series_id, ví dụ: '1-10', '1,3,5' hoặc 'all'"
    )
    max_workers: int = Field(3, ge=1, le=10, description="Số luồng tải đồng thời (mặc định 3, tối đa 10)")
    save_dir: Optional[str] = Field(None, description="Đường dẫn thư mục lưu file tùy chỉnh (tùy chọn)")


class DubbingBatchRequest(BaseModel):
    op_id: Optional[str] = Field(None, description="Operation ID để theo dõi qua WebSocket")
    series_id: Optional[str] = Field(None, description="ID bộ phim (series_id)")
    series_title: Optional[str] = Field(None, description="Tên phim dùng để đặt thư mục lưu (tùy chọn)")
    items: Optional[List[DownloadItemRequest]] = Field(
        None, description="Danh sách các tập cần tải & lồng tiếng"
    )
    episode_range: Optional[str] = Field(
        None, description="Khoảng tập muốn tải nếu có series_id, ví dụ: '1-10', '1,3,5' hoặc 'all'"
    )
    max_workers: int = Field(3, ge=1, le=10, description="Số luồng tải đồng thời")
    save_dir: Optional[str] = Field(None, description="Đường dẫn thư mục lưu file")

    # Dubbing Pipeline settings
    transcribe_engine: Optional[str] = Field("capcut", description="Engine phiên âm ASR (capcut, bcut, groq, auto)")
    source_lang: Optional[str] = Field("auto", description="Ngôn ngữ nguồn (auto, zh, en...)")
    target_lang: Optional[str] = Field("vi", description="Ngôn ngữ dịch thuật (vi...)")
    preset: Optional[str] = Field("default", description="Preset dịch thuật LLM")
    provider: Optional[str] = Field("custom", description="Nhà cung cấp dịch thuật (custom, deepseek, ezmax)")
    model: Optional[str] = Field(None, description="Model LLM dịch thuật")
    voice_id: Optional[str] = Field("Ngọc Huyền", description="Tên giọng đọc VieNeu (ví dụ: 'Ngọc Huyền')")
    tts_speed: Optional[float] = Field(1.0, description="Tốc độ giọng đọc TTS")
    voice_rate: Optional[float] = Field(1.0, description="Tỉ lệ tốc độ giọng đọc chung")
    fit_mode: Optional[str] = Field("natural_flow", description="Chế độ khớp nhịp")
    parallel_jobs: Optional[int] = Field(6, ge=1, le=10, description="Số luồng dịch song song (mặc định 6)")
    output_filename: Optional[str] = Field(None, description="Tên file video lồng tiếng xuất ra")



# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def parse_range_indices(range_str: str, max_count: int) -> List[int]:
    """Chuyển chuỗi range như '1-10' hoặc '1,3,5' thành danh sách index 1-based."""
    if not range_str:
        return list(range(1, max_count + 1))
    
    clean_str = range_str.strip().lower()
    if clean_str in ("all", "*"):
        return list(range(1, max_count + 1))

    indices = set()
    for part in clean_str.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            segments = part.split("-", 1)
            try:
                start = int(segments[0])
                end = int(segments[1])
                for idx in range(start, end + 1):
                    if 1 <= idx <= max_count:
                        indices.add(idx)
            except ValueError:
                pass
        else:
            try:
                idx = int(part)
                if 1 <= idx <= max_count:
                    indices.add(idx)
            except ValueError:
                pass

    return sorted(list(indices))


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/detail")
async def get_hongguo_detail(
    series_id: str = Query(..., description="ID bộ phim (series_id) hoặc url chứa series_id"),
    no_cache: bool = Query(False, description="Bỏ qua cache local nếu true")
):
    """
    Xem chi tiết phim Hồng Quả (Hongguo):
    - Trả về thông tin phim: tiêu đề, ảnh bìa, số tập, thể loại, diễn viên, lượt xem,...
    - Trả về danh sách chi tiết các tập: số tập (index), vid, tiêu đề tập, thời lượng, thumbnail.
    """
    sid = str(series_id).strip()
    if "series_id=" in sid:
        m = re.search(r"series_id=([0-9A-Za-z_-]+)", sid)
        if m:
            sid = m.group(1)

    if not sid:
        raise HTTPException(status_code=400, detail="series_id không được để trống")

    try:
        loop = asyncio.get_running_loop()
        detail = await loop.run_in_executor(
            None, get_series_detail, sid, not no_cache
        )
        return {
            "success": True,
            "data": detail
        }
    except Exception as exc:
        logger.error(f"Lỗi lấy chi tiết phim series_id={sid}: {exc}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Không thể lấy thông tin phim series_id={sid}: {str(exc)}"
        )


@router.post("/download-batch")
async def batch_download_hongguo(
    req: BatchDownloadRequest,
    request: Request
):
    """
    Tải video hàng loạt cho phim Hồng Quả:
    - Có thể truyền theo series_id kèm episode_range (ví dụ '1-5', '1,2,3', 'all')
    - Hoặc truyền danh sách items gồm các vid cụ thể.
    - Hỗ trợ chọn số luồng tải đồng thời (`max_workers`, mặc định 3).
    - Có thể truyền thư mục lưu `save_dir`.
    """
    download_tasks: List[Dict[str, Any]] = []
    series_id = req.series_id.strip() if req.series_id else None
    series_title = req.series_title.strip() if req.series_title else ""

    # Xác định thư mục lưu
    target_save_dir = req.save_dir
    if not target_save_dir:
        base_dir = get_download_base_dir()
        if series_id:
            folder_name = f"{series_id}_{re.sub(r'[\\/*?:\"<>|]', '_', series_title)}" if series_title else series_id
            target_save_dir = str(base_dir / folder_name)
        else:
            target_save_dir = str(base_dir)

    os.makedirs(target_save_dir, exist_ok=True)

    loop = asyncio.get_running_loop()

    # 1. Nếu có items truyền vào trực tiếp
    if req.items:
        for it in req.items:
            vid = str(it.vid).strip()
            if not vid:
                continue
            download_tasks.append({
                "vid": vid,
                "episode": it.episode,
                "filename": it.filename,
                "series_id": series_id,
            })

    # 2. Nếu có series_id và cần lấy danh sách tập theo range
    elif series_id:
        try:
            meta, eps = await loop.run_in_executor(None, get_episodes, series_id, True)
            total_eps = len(eps)
            selected_indices = set(parse_range_indices(req.episode_range or "all", total_eps))
            
            for ep in eps:
                if ep.get("index") in selected_indices and ep.get("vid"):
                    download_tasks.append({
                        "vid": ep["vid"],
                        "episode": ep["index"],
                        "filename": generate_video_filename(
                            ep["vid"], series_id=series_id, episode=ep["index"]
                        ),
                        "series_id": series_id,
                    })
        except Exception as exc:
            raise HTTPException(
                status_code=500,
                detail=f"Lỗi truy vấn danh sách tập của series_id={series_id}: {str(exc)}"
            )

    if not download_tasks:
        raise HTTPException(
            status_code=400,
            detail="Không có tập phim nào hợp lệ để tải (hãy truyền items hoặc series_id hợp lệ)"
        )

    # 3. Tối ưu trước: Batch resolve video models bằng 1 Liushen signature cho mỗi block 20 vids
    op_id = req.op_id or f"hg-download-{uuid.uuid4().hex[:8]}"
    clear_cancelled_hongguo_op(op_id)
    total_tasks = len(download_tasks)

    num_workers = max(1, min(req.max_workers, 10))

    ws_manager.broadcast_op_progress_sync(
        op="hongguo_download",
        op_id=op_id,
        done=0,
        total=total_tasks,
        pct=0.0,
        stage="resolve_signatures",
        message=f"Đang chuẩn bị giải mã & tải {total_tasks} tập phim...",
    )
    ws_manager.broadcast_log_sync(
        op_id, f"[Hồng Quả] Bắt đầu tải {total_tasks} tập, {num_workers} luồng..."
    )

    all_vids = [t["vid"] for t in download_tasks]
    try:
        await loop.run_in_executor(
            None, resolve_batch_video_models, all_vids, 20
        )
    except Exception as exc:
        logger.warning(f"Batch resolve models cảnh báo: {exc}")

    # 4. Thực thi tải đa luồng
    logger.info(
        f"Bắt đầu tải {total_tasks} video với {num_workers} luồng, lưu vào: {target_save_dir}"
    )

    completed_count = 0
    success_count = 0
    failed_count = 0
    skipped_or_cancelled_count = 0
    progress_lock = threading.Lock()

    def _worker(task: Dict[str, Any]) -> Dict[str, Any]:
        nonlocal completed_count, success_count, failed_count, skipped_or_cancelled_count
        vid = task["vid"]
        ep = task.get("episode")
        fn = task.get("filename")
        sid = task.get("series_id")
        
        if is_hongguo_download_cancelled(op_id):
            with progress_lock:
                skipped_or_cancelled_count += 1
            return {
                "vid": vid,
                "episode": ep,
                "success": False,
                "error": "Tác vụ đã bị tạm dừng/hủy bỏ bởi người dùng",
                "cancelled": True,
            }

        ws_manager.broadcast_log_sync(
            op_id, f"[Hồng Quả] Đang tải tập {ep or vid}..."
        )
        
        try:
            res = handle_video_request(
                video_id=vid,
                request=request,
                max_retries=3,
                series_id=sid,
                episode=ep,
                filename=fn,
                save_dir=target_save_dir,
            )
            item_result = {
                "vid": vid,
                "episode": ep,
                "success": True,
                "file": res.get("url"),
                "quality": res.get("quality"),
                "size": res.get("size"),
                "duration": res.get("duration"),
            }
            with progress_lock:
                completed_count += 1
                success_count += 1
                pct = round((completed_count / total_tasks) * 100, 1)
                ws_manager.broadcast_op_progress_sync(
                    op="hongguo_download",
                    op_id=op_id,
                    done=completed_count,
                    total=total_tasks,
                    pct=pct,
                    stage="downloading",
                    message=f"Đã tải xong tập {ep or vid} ({completed_count}/{total_tasks})",
                    last_result=item_result,
                )
                ws_manager.broadcast_log_sync(
                    op_id, f"[Hồng Quả] ✓ Tải xong tập {ep or vid} ({res.get('size', '')})"
                )
            return item_result
        except Exception as err:
            if is_hongguo_download_cancelled(op_id):
                with progress_lock:
                    skipped_or_cancelled_count += 1
                return {
                    "vid": vid,
                    "episode": ep,
                    "success": False,
                    "error": "Tác vụ đã bị tạm dừng",
                    "cancelled": True,
                }
            logger.error(f"Tải thất bại vid={vid}, tập={ep}: {err}")
            item_result = {
                "vid": vid,
                "episode": ep,
                "success": False,
                "error": str(err),
            }
            with progress_lock:
                completed_count += 1
                failed_count += 1
                pct = round((completed_count / total_tasks) * 100, 1)
                ws_manager.broadcast_op_progress_sync(
                    op="hongguo_download",
                    op_id=op_id,
                    done=completed_count,
                    total=total_tasks,
                    pct=pct,
                    stage="downloading",
                    message=f"Lỗi tải tập {ep or vid}: {str(err)}",
                    last_result=item_result,
                )
                ws_manager.broadcast_log_sync(
                    op_id, f"[Hồng Quả] ✗ Lỗi tải tập {ep or vid}: {str(err)}"
                )
            return item_result

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_workers) as executor:
        results = await loop.run_in_executor(
            None, lambda: list(executor.map(_worker, download_tasks))
        )

    was_cancelled = is_hongguo_download_cancelled(op_id)
    success_items = [r for r in results if r.get("success")]
    failed_items = [r for r in results if not r.get("success")]

    if was_cancelled:
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_download",
            op_id=op_id,
            done=completed_count,
            total=total_tasks,
            pct=round((completed_count / total_tasks) * 100, 1) if total_tasks else 0,
            stage="paused",
            message=f"Đã tạm dừng tải phim. Đã hoàn thành {success_count}/{total_tasks} tập.",
            save_dir=target_save_dir,
            cancelled=True,
        )
        ws_manager.broadcast_log_sync(
            op_id, f"[Hồng Quả] Đã tạm dừng tải phim theo yêu cầu ({success_count}/{total_tasks} tập)."
        )
    else:
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_download",
            op_id=op_id,
            done=total_tasks,
            total=total_tasks,
            pct=100.0,
            stage="completed",
            message=f"Hoàn thành tải {success_count}/{total_tasks} tập phim",
            save_dir=target_save_dir,
            cancelled=False,
        )

    return {
        "success": len(failed_items) == 0 and not was_cancelled,
        "cancelled": was_cancelled,
        "op_id": op_id,
        "total": len(download_tasks),
        "success_count": len(success_items),
        "failed_count": len(failed_items),
        "save_dir": target_save_dir,
        "results": results,
    }


@router.post("/dubbing")
async def batch_download_and_dubbing_hongguo(
    req: DubbingBatchRequest,
    request: Request
):
    """
    Tải hàng loạt video Hồng Quả và tự động thực hiện toàn bộ quy trình lồng tiếng:
    1. Tải toàn bộ danh sách tập theo yêu cầu.
    2. Quét kiểm tra định dạng các video tải về, tự động phát hiện GPU/CPU để render đồng bộ nếu có tập dị biệt.
    3. Ghép nối tiếp video siêu tốc bằng Stream Copy.
    4. Trích xuất & ghép audio chuẩn (48kHz Stereo) tránh giật tiếng.
    5. Thực thi Pipeline Dubbing: Transcribe -> Translate -> VieNeu TTS -> Compute Timing Plan -> Mix TTS audio & Ducked/Muted Background Audio -> Ghép vào Video stream copy.
    """
    download_tasks: List[Dict[str, Any]] = []
    series_id = req.series_id.strip() if req.series_id else None
    series_title = req.series_title.strip() if req.series_title else ""

    # Xác định thư mục lưu
    target_save_dir = req.save_dir
    if not target_save_dir:
        base_dir = get_download_base_dir()
        if series_id:
            folder_name = f"{series_id}_{re.sub(r'[\\/*?:\"<>|]', '_', series_title)}" if series_title else series_id
            target_save_dir = str(base_dir / folder_name)
        else:
            target_save_dir = str(base_dir)

    os.makedirs(target_save_dir, exist_ok=True)
    loop = asyncio.get_running_loop()

    # 1. Danh sách tasks
    if req.items:
        for it in req.items:
            vid = str(it.vid).strip()
            if not vid:
                continue
            download_tasks.append({
                "vid": vid,
                "episode": it.episode,
                "filename": it.filename,
                "series_id": series_id,
            })
    elif series_id:
        try:
            meta, eps = await loop.run_in_executor(None, get_episodes, series_id, True)
            total_eps = len(eps)
            selected_indices = set(parse_range_indices(req.episode_range or "all", total_eps))
            
            for ep in eps:
                if ep.get("index") in selected_indices and ep.get("vid"):
                    download_tasks.append({
                        "vid": ep["vid"],
                        "episode": ep["index"],
                        "filename": generate_video_filename(
                            ep["vid"], series_id=series_id, episode=ep["index"]
                        ),
                        "series_id": series_id,
                    })
        except Exception as exc:
            raise HTTPException(
                status_code=500,
                detail=f"Lỗi truy vấn danh sách tập của series_id={series_id}: {str(exc)}"
            )

    if not download_tasks:
        raise HTTPException(
            status_code=400,
            detail="Không có tập phim nào hợp lệ để tải & lồng tiếng."
        )

    op_id = req.op_id or f"hg-dubbing-{uuid.uuid4().hex[:8]}"
    clear_cancelled_hongguo_op(op_id)
    total_tasks = len(download_tasks)
    num_workers = max(1, min(req.max_workers, 10))

    ws_manager.broadcast_op_progress_sync(
        op="hongguo_dubbing",
        op_id=op_id,
        done=0,
        total=total_tasks,
        pct=0.0,
        stage="init",
        message=f"Bắt đầu tải và lồng tiếng {total_tasks} tập phim...",
    )
    ws_manager.broadcast_log_sync(
        op_id, f"[Hồng Quả Lồng Tiếng] Khởi tạo tác vụ lồng tiếng {total_tasks} tập..."
    )

    # 2. Batch resolve
    all_vids = [t["vid"] for t in download_tasks]
    try:
        await loop.run_in_executor(
            None, resolve_batch_video_models, all_vids, 20
        )
    except Exception as exc:
        logger.warning(f"Batch resolve models cảnh báo: {exc}")

    # 3. Tải các video
    completed_count = 0
    progress_lock = threading.Lock()

    def _worker(task: Dict[str, Any]) -> Dict[str, Any]:
        nonlocal completed_count
        vid = task["vid"]
        ep = task.get("episode")
        fn = task.get("filename")
        sid = task.get("series_id")

        if is_hongguo_download_cancelled(op_id):
            return {"vid": vid, "episode": ep, "success": False, "cancelled": True}

        ws_manager.broadcast_log_sync(op_id, f"[Hồng Quả] Đang tải tập {ep or vid}...")
        try:
            res = handle_video_request(
                video_id=vid,
                request=request,
                max_retries=3,
                series_id=sid,
                episode=ep,
                filename=fn,
                save_dir=target_save_dir,
            )
            local_path = None
            if fn:
                candidate = os.path.join(target_save_dir, fn)
                if os.path.exists(candidate):
                    local_path = candidate

            with progress_lock:
                completed_count += 1
                pct = round((completed_count / total_tasks) * 30, 1) # Tải chiếm 30% pipeline
                ws_manager.broadcast_op_progress_sync(
                    op="hongguo_dubbing",
                    op_id=op_id,
                    done=completed_count,
                    total=total_tasks,
                    pct=pct,
                    stage="downloading",
                    message=f"Đã tải xong tập {ep or vid} ({completed_count}/{total_tasks})",
                )
                ws_manager.broadcast_log_sync(op_id, f"[Hồng Quả] ✓ Tải xong tập {ep or vid}")

            return {
                "vid": vid,
                "episode": ep,
                "success": True,
                "local_path": local_path,
                "file": res.get("url"),
                "quality": res.get("quality"),
            }
        except Exception as err:
            logger.error(f"Tải thất bại tập {ep or vid}: {err}")
            return {"vid": vid, "episode": ep, "success": False, "error": str(err)}

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_workers) as executor:
        dl_results = await loop.run_in_executor(
            None, lambda: list(executor.map(_worker, download_tasks))
        )

    if is_hongguo_download_cancelled(op_id):
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_dubbing",
            op_id=op_id,
            done=completed_count,
            total=total_tasks,
            pct=0.0,
            stage="cancelled",
            message="Tác vụ lồng tiếng đã bị hủy.",
            cancelled=True,
        )
        return {"success": False, "cancelled": True, "op_id": op_id}

    # Thu thập danh sách các file video đã tải về máy
    downloaded_video_paths: List[str] = []
    for r in dl_results:
        lp = r.get("local_path")
        if lp and os.path.exists(lp):
            downloaded_video_paths.append(lp)

    if not downloaded_video_paths or len(downloaded_video_paths) < len(download_tasks):
        # Tìm các file mp4 theo filename đã định dạng
        downloaded_video_paths = []
        for t in download_tasks:
            fn = t.get("filename") or f"{t['vid']}.mp4"
            candidate = os.path.join(target_save_dir, fn)
            if os.path.exists(candidate):
                downloaded_video_paths.append(candidate)

    if not downloaded_video_paths:
        raise HTTPException(
            status_code=500,
            detail="Không tìm thấy tệp video nào đã tải về để tiến hành ghép và lồng tiếng."
        )

    # 4. Kiểm tra format & Đồng bộ hóa video
    ws_manager.broadcast_op_progress_sync(
        op="hongguo_dubbing",
        op_id=op_id,
        done=completed_count,
        total=total_tasks,
        pct=35.0,
        stage="check_formats",
        message="Đang kiểm tra đồng bộ định dạng video (GPU/CPU)...",
    )
    
    temp_pipeline_dir = os.path.join(target_save_dir, f"dubbing_work_{op_id}")
    os.makedirs(temp_pipeline_dir, exist_ok=True)

    def _log_msg(msg: str):
        ws_manager.broadcast_log_sync(op_id, msg)

    normalized_video_paths = await loop.run_in_executor(
        None,
        lambda: ensure_homogeneous_videos(
            video_paths=downloaded_video_paths,
            temp_dir=temp_pipeline_dir,
            log_callback=_log_msg,
        )
    )

    # 5. Ghép Video Stream Copy & Nối Audio chuẩn
    ws_manager.broadcast_op_progress_sync(
        op="hongguo_dubbing",
        op_id=op_id,
        done=completed_count,
        total=total_tasks,
        pct=45.0,
        stage="stream_copy_concat",
        message="Đang thực hiện ghép video stream copy và nối audio chuẩn...",
    )
    ws_manager.broadcast_log_sync(op_id, "[Hồng Quả] Ghép video nối tiếp stream copy và trích xuất audio chuẩn...")

    concat_stream_copy_video = os.path.join(temp_pipeline_dir, f"concat_stream_copy_{op_id}.mp4")
    clean_audio_path = os.path.join(temp_pipeline_dir, f"clean_audio_{op_id}.m4a")

    await loop.run_in_executor(
        None,
        lambda: concat_videos_stream_copy(
            video_paths=normalized_video_paths,
            output_path=concat_stream_copy_video,
        )
    )

    await loop.run_in_executor(
        None,
        lambda: extract_and_concat_clean_audio(
            video_paths=normalized_video_paths,
            output_audio_path=clean_audio_path,
            target_sample_rate=48000,
        )
    )

    # 6. Pipeline Lồng tiếng: Transcribe -> Translate -> TTS -> Timing -> Mix & Mux
    out_name = req.output_filename
    if not out_name:
        s_title_clean = re.sub(r'[\\/*?:\"<>|]', '_', series_title) if series_title else "hongguo"
        out_name = f"{series_id or 'drama'}_{s_title_clean}_dubbed.mp4"

    if not out_name.lower().endswith(".mp4"):
        out_name += ".mp4"

    final_dubbed_output = os.path.join(target_save_dir, out_name)

    def _progress_cb(stage: str, sub_pct: int, msg: str):
        # Ánh xạ tiến độ pipeline dubbing từ 50% đến 100%
        overall_pct = round(45.0 + (sub_pct * 0.55), 1)
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_dubbing",
            op_id=op_id,
            done=total_tasks,
            total=total_tasks,
            pct=overall_pct,
            stage=stage,
            message=msg,
        )

    dubbing_res = await execute_dubbing_pipeline_for_stream_copy(
        stream_copy_video_path=concat_stream_copy_video,
        original_audio_path=clean_audio_path,
        output_dubbed_video_path=final_dubbed_output,
        op_id=op_id,
        transcribe_engine=req.transcribe_engine or "capcut",
        source_lang=req.source_lang or "auto",
        target_lang=req.target_lang or "vi",
        preset=req.preset or "default",
        provider=req.provider or "custom",
        model=req.model,
        voice_id=req.voice_id or "Ngọc Huyền",
        tts_speed=req.tts_speed or 1.0,
        voice_rate=req.voice_rate or 1.0,
        fit_mode=req.fit_mode or "natural_flow",
        parallel_jobs=req.parallel_jobs or 6,
        temp_dir=temp_pipeline_dir,
        log_callback=_log_msg,
        progress_callback=_progress_cb,
    )

    out_size = os.path.getsize(final_dubbed_output) if os.path.exists(final_dubbed_output) else 0

    ws_manager.broadcast_op_progress_sync(
        op="hongguo_dubbing",
        op_id=op_id,
        done=total_tasks,
        total=total_tasks,
        pct=100.0,
        stage="completed",
        message=f"Hoàn thành xuất sắc video lồng tiếng: {os.path.basename(final_dubbed_output)}",
        save_dir=target_save_dir,
        output_file=final_dubbed_output,
    )
    ws_manager.broadcast_log_sync(
        op_id, f"[Hồng Quả] ✓ Đã hoàn thành toàn bộ quá trình tải và lồng tiếng! File: {final_dubbed_output}"
    )

    return {
        "success": True,
        "op_id": op_id,
        "series_id": series_id,
        "total_episodes": len(download_tasks),
        "save_dir": target_save_dir,
        "stream_copy_video": concat_stream_copy_video,
        "output_file": final_dubbed_output,
        "output_size_bytes": out_size,
        "segments_count": dubbing_res.get("segmentsCount", 0),
        "duration": dubbing_res.get("duration", 0.0),
    }


@router.get("/download-single")
async def download_single_video(
    vid: str = Query(..., description="Video ID (vid) của tập phim"),
    series_id: Optional[str] = Query(None, description="Series ID (nếu có)"),
    episode: Optional[Union[int, str]] = Query(None, description="Số tập"),
    save_dir: Optional[str] = Query(None, description="Thư mục lưu tùy chọn"),
    op_id: Optional[str] = Query(None, description="Operation ID theo dõi qua WS"),
    request: Request = None,
):
    """
    Tải hoặc giải mã 1 tập phim lẻ theo vid.
    """
    vid_clean = str(vid).strip()
    if not vid_clean:
        raise HTTPException(status_code=400, detail="vid không được để trống")

    current_op_id = op_id or f"hg-single-{uuid.uuid4().hex[:8]}"
    ws_manager.broadcast_op_progress_sync(
        op="hongguo_single_download",
        op_id=current_op_id,
        done=0,
        total=1,
        pct=10.0,
        stage="start",
        message=f"Bắt đầu tải tập {episode or vid_clean}...",
    )
    ws_manager.broadcast_log_sync(
        current_op_id, f"[Hồng Quả] Bắt đầu tải tập {episode or vid_clean}..."
    )

    loop = asyncio.get_running_loop()
    try:
        res = await loop.run_in_executor(
            None,
            lambda: handle_video_request(
                video_id=vid_clean,
                request=request,
                max_retries=3,
                series_id=series_id,
                episode=episode,
                save_dir=save_dir,
            ),
        )
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_single_download",
            op_id=current_op_id,
            done=1,
            total=1,
            pct=100.0,
            stage="completed",
            message=f"Tải thành công tập {episode or vid_clean}",
            data=res,
        )
        ws_manager.broadcast_log_sync(
            current_op_id, f"[Hồng Quả] ✓ Tải xong tập {episode or vid_clean}"
        )
        return {
            "success": True,
            "data": res
        }
    except Exception as exc:
        logger.error(f"Lỗi tải vid={vid_clean}: {exc}", exc_info=True)
        ws_manager.broadcast_op_progress_sync(
            op="hongguo_single_download",
            op_id=current_op_id,
            done=1,
            total=1,
            pct=100.0,
            stage="error",
            message=f"Lỗi tải tập {episode or vid_clean}: {str(exc)}",
        )
        ws_manager.broadcast_log_sync(
            current_op_id, f"[Hồng Quả] ✗ Lỗi tải tập {episode or vid_clean}: {str(exc)}"
        )
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/cancel-download")
async def cancel_batch_download(body: Dict[str, Any]):
    """Tạm dừng/hủy bỏ tác vụ tải phim Hồng Quả theo op_id."""
    op_id = body.get("op_id") or body.get("opId")
    if not op_id:
        raise HTTPException(status_code=400, detail="op_id không được để trống")

    cancel_hongguo_download(str(op_id))
    logger.info(f"Đã kích hoạt dừng download cho op_id={op_id}")
    ws_manager.broadcast_log_sync(
        str(op_id), f"[Hồng Quả] Đang dừng các luồng tải..."
    )
    return {
        "success": True,
        "op_id": str(op_id),
        "status": "cancelled",
        "message": "Đã gửi tín hiệu dừng tải"
    }


@router.get("/get-download-dir")
async def get_current_download_dir():
    """Lấy thư mục tải về mặc định trên server."""
    base_dir = get_download_base_dir()
    return {
        "success": True,
        "default_dir": str(base_dir.resolve())
    }


@router.api_route("/select-folder", methods=["GET", "POST"])
def select_download_folder():
    """Mở hộp thoại native trên hệ điều hành để chọn thư mục lưu trữ."""
    logger.info("Mở dialog chọn thư mục lưu phim Hồng Quả...")
    folder = open_folder_dialog()
    return {
        "success": bool(folder),
        "folder": folder or ""
    }
