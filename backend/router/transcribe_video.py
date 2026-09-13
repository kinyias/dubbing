"""
Custom Transcript Router — Re-implementation of /api/transcript/transcribe-video
Reverse-engineered and rebuilt from backend/routers/pipeline.cp312-win_amd64.pyd & pipeline.pyi
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import tempfile
import threading
import uuid
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

# Core bridge and settings imports
from core.node_bridge import (
    NodeHelperCancelledError,
    NodeHelperError,
    cancel_node_helper,
    run_node_helper,
)
from core.ws_manager import ws_manager

logger = logging.getLogger("router_custom_transcript")

router = APIRouter(prefix="/api/transcript", tags=["transcript"])

# Regular expression to parse SRT blocks
SRT_BLOCK_RE = re.compile(
    r"(\d+)\r?\n(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})\r?\n((?:(?!\r?\n\r?\n|\Z).)*)",
    re.DOTALL,
)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class VideoSegment(BaseModel):
    id: Optional[str] = None
    type: Optional[str] = "video"
    name: Optional[str] = None
    x: Optional[float] = None
    y: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    startTime: Optional[float] = 0.0
    endTime: Optional[float] = 0.0
    trimStart: Optional[float] = 0.0
    trimEnd: Optional[float] = 0.0
    sourceStart: Optional[float] = 0.0
    sourceEnd: Optional[float] = 0.0
    hasBeenTransformed: Optional[bool] = False

    class Config:
        extra = "allow"


class TranscribeRequest(BaseModel):
    videoPath: Optional[str] = None
    video_path: Optional[str] = None
    targetLang: Optional[str] = "vi"
    sourceLang: Optional[str] = "auto"
    transcribeEngine: Optional[str] = "auto"
    videoSegments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    ocrCrop: Optional[List[float]] = Field(default_factory=lambda: [0.1, 0.8, 0.9, 0.95])
    diarize: Optional[bool] = False
    diarizeForBoundaries: Optional[bool] = False
    numSpeakers: Optional[int] = None
    opId: Optional[str] = None

    class Config:
        extra = "allow"


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
def parse_srt_time_to_seconds(ts: str) -> float:
    """Chuyển đổi thời gian định dạng SRT (HH:MM:SS,mmm) sang giây."""
    ts = ts.strip().replace(",", ".")
    parts = ts.split(":")
    if len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
    elif len(parts) == 2:
        return int(parts[0]) * 60 + float(parts[1])
    return 0.0


def parse_srt_file(srt_path: str) -> List[Dict[str, Any]]:
    """Đọc và trích xuất các câu từ tệp phụ đề SRT."""
    if not os.path.exists(srt_path):
        return []

    with open(srt_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    segments = []
    for match in SRT_BLOCK_RE.finditer(content):
        _, start_ts, end_ts, text = match.groups()
        st = parse_srt_time_to_seconds(start_ts)
        et = parse_srt_time_to_seconds(end_ts)
        clean_text = text.strip()
        if not clean_text:
            continue

        seg_id = f"seg_{uuid.uuid4().hex}"
        segments.append({
            "id": seg_id,
            "startTime": f"{st:.3f}",
            "endTime": f"{et:.3f}",
            "text": clean_text,
            "translation": "",
        })

    return segments


def remap_ocr_segments_to_timeline(
    segments: List[Dict[str, Any]], video_segments: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Khi video được cắt ghép/chỉnh sửa (videoSegments), ánh xạ mốc thời gian
    của phụ đề nhận diện từ video gốc sang mốc thời gian hiển thị trên timeline.
    """
    if not video_segments:
        return segments

    remapped = []
    for seg in segments:
        try:
            st = float(seg.get("startTime", 0.0))
            et = float(seg.get("endTime", 0.0))
        except (ValueError, TypeError):
            remapped.append(seg)
            continue

        mid = (st + et) / 2.0
        host = None

        # Tìm video segment chứa điểm giữa của câu phụ đề
        for v in video_segments:
            v_src_start = float(v.get("sourceStart", v.get("trimStart", 0.0)) or 0.0)
            v_src_end = float(v.get("sourceEnd", v.get("endTime", 0.0)) or 0.0)
            if v_src_start <= mid <= v_src_end:
                host = v
                break

        if not host:
            # Rơi vào vùng video đã bị cắt bỏ -> bỏ qua
            continue

        host_start = float(host.get("startTime", 0.0) or 0.0)
        host_end = float(host.get("endTime", 0.0) or 0.0)
        host_src_start = float(host.get("sourceStart", host.get("trimStart", 0.0)) or 0.0)

        offset = host_start - host_src_start
        c0 = max(host_start, st + offset)
        c1 = min(host_end, et + offset)

        if c1 <= c0:
            continue

        seg["startTime"] = f"{c0:.3f}"
        seg["endTime"] = f"{c1:.3f}"
        remapped.append(seg)

    return remapped


# ---------------------------------------------------------------------------
# Main Endpoint: /api/transcript/transcribe-video
# ---------------------------------------------------------------------------
@router.post("/transcribe-video")
async def api_transcribe_video(req_payload: Union[TranscribeRequest, Dict[str, Any]]):
    """
    Endpoint nhận dạng giọng nói (ASR).
    Node ASR Branch (capcut, bcut, groq, auto): Tách âm thanh & nhận dạng qua Node.js helper.
    """
    req = req_payload.model_dump() if hasattr(req_payload, "model_dump") else (req_payload.dict() if hasattr(req_payload, "dict") else dict(req_payload))

    video_path = req.get("videoPath") or req.get("video_path")
    if not video_path:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing 'videoPath' parameter in request.",
        )

    engine = (req.get("transcribeEngine") or "capcut").lower().strip()
    op_id = req.get("opId") or f"transcribe_{uuid.uuid4().hex[:12]}"
    video_segments = req.get("videoSegments") or []

    logger.info(
        f"[Transcribe] Starting transcribe job opId={op_id}, engine='{engine}', video='{video_path}'"
    )
    # =======================================================================
    # NHẬN DIỆN GIỌNG NÓI QUA NODE HELPER (CapCut, BCut, Groq, Auto)
    # =======================================================================
    data = {
        "videoPath": video_path,
        "targetLang": req.get("targetLang", "vi"),
        "sourceLang": req.get("sourceLang", "auto"),
        "transcribeEngine": engine,
        "videoSegments": video_segments,
        "opId": op_id,
    }

    await ws_manager.broadcast_log(op_id, f"[Transcribe] Bắt đầu nhận dạng video ({engine})...")
    await ws_manager.broadcast_op_progress(
        op="transcribe",
        op_id=op_id,
        stage="init",
        engine=engine,
        message=f"Bắt đầu nhận dạng ({engine})..."
    )

    async def _on_event(event: dict):
        if not isinstance(event, dict):
            return
        if "opId" not in event:
            event["opId"] = op_id
        await ws_manager.broadcast_json(event)

        stage = event.get("stage")
        if stage == "denoise":
            await ws_manager.broadcast_log(op_id, "[Transcribe] Đang lọc tạp âm âm thanh (denoise)...")
        elif stage == "asr":
            asr_engine = event.get("engine") or engine
            done = event.get("done")
            total = event.get("total")
            if done is not None and total is not None and int(total) > 0:
                pct = round(int(done) / int(total) * 100, 1)
                await ws_manager.broadcast_log(
                    op_id, f"[Transcribe] ASR ({asr_engine}): {done}/{total} phần ({pct:.0f}%)"
                )
            else:
                await ws_manager.broadcast_log(op_id, f"[Transcribe] Đang nhận dạng giọng nói ({asr_engine})...")

    async def _on_log(message: str):
        await ws_manager.broadcast_log(op_id, message)

    try:
        raw_result = await run_node_helper(
            action="transcribe-video",
            data=data,
            on_event=_on_event,
            on_log=_on_log,
        )

        res_segments = []
        if isinstance(raw_result, list):
            for idx, item in enumerate(raw_result):
                if not isinstance(item, dict):
                    continue
                res_segments.append({
                    "id": str(item.get("id") or (idx + 1)),
                    "startTime": item.get("startTime", 0.0),
                    "endTime": item.get("endTime", 0.0),
                    "text": item.get("text", "") or "",
                    "translation": item.get("translation", "") or "",
                })
        else:
            logger.warning(f"[Transcribe] Unexpected result shape from node_helper: {type(raw_result)}")
            res_segments = raw_result or []

        await ws_manager.broadcast_log(op_id, f"[Transcribe] Hoàn tất nhận dạng: {len(res_segments)} câu phụ đề.")
        await ws_manager.broadcast_op_progress(
            op="transcribe",
            op_id=op_id,
            stage="done",
            done=len(res_segments),
            total=len(res_segments),
            pct=100.0,
            message=f"Hoàn tất: {len(res_segments)} câu"
        )

    except NodeHelperCancelledError:
        logger.info(f"[Transcribe] Operation {op_id} was cancelled.")
        await ws_manager.broadcast_log(op_id, "[Transcribe] Đã hủy nhận dạng theo yêu cầu.")
        raise HTTPException(
            status_code=499,
            detail="Transcription was cancelled.",
        )
    except NodeHelperError as e:
        logger.error(f"[Transcribe] NodeHelperError: {e.code} - {e.message}")
        await ws_manager.broadcast_error(op_id, e.message)
        await ws_manager.broadcast_log(op_id, f"[Transcribe] ✗ Lỗi nhận dạng: {e.message}")
        status_code = (
            status.HTTP_422_UNPROCESSABLE_ENTITY
            if e.code in ("FREE_EXPORT_DURATION_LIMIT", "TIMING_INFEASIBLE")
            else status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        raise HTTPException(
            status_code=status_code,
            detail=e.message,
        )
    except Exception as e:
        logger.error(f"[Transcribe] Failed to transcribe via node_helper: {e}", exc_info=True)
        await ws_manager.broadcast_error(op_id, str(e))
        await ws_manager.broadcast_log(op_id, f"[Transcribe] ✗ Lỗi nhận dạng: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    logger.info(f"[Transcribe] Completed successfully: {len(res_segments)} segments.")
    return res_segments


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/cancel-transcribe
# ---------------------------------------------------------------------------
@router.post("/cancel-transcribe")
async def api_cancel_transcribe(body: Dict[str, Any]):
    """Hủy tiến trình nhận dạng (Node ASR)."""
    op_id = body.get("opId") or body.get("op_id") or ""
    node_cancelled = False
    ocr_cancelled = False

    if op_id:
        node_cancelled = cancel_node_helper(op_id)

    return {
        "status": "ok",
        "opId": op_id,
        "nodeCancelled": node_cancelled,
        "ocrCancelled": ocr_cancelled,
    }
