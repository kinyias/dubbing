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

logger = logging.getLogger("router_hongguo")

router = APIRouter(prefix="/api/hongguo", tags=["hongguo"])


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
    progress_lock = threading.Lock()

    def _worker(task: Dict[str, Any]) -> Dict[str, Any]:
        nonlocal completed_count, success_count, failed_count
        vid = task["vid"]
        ep = task.get("episode")
        fn = task.get("filename")
        sid = task.get("series_id")
        
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

    success_items = [r for r in results if r.get("success")]
    failed_items = [r for r in results if not r.get("success")]

    ws_manager.broadcast_op_progress_sync(
        op="hongguo_download",
        op_id=op_id,
        done=total_tasks,
        total=total_tasks,
        pct=100.0,
        stage="completed",
        message=f"Hoàn thành tải {success_count}/{total_tasks} tập phim",
        save_dir=target_save_dir,
    )

    return {
        "success": len(failed_items) == 0,
        "op_id": op_id,
        "total": len(download_tasks),
        "success_count": len(success_items),
        "failed_count": len(failed_items),
        "save_dir": target_save_dir,
        "results": results,
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
