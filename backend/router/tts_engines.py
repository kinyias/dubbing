"""
Router API cho phân hệ TTS (Text-to-Speech) — VieNeu-TTS.
Cung cấp route /api/transcript/generate-tts-batch cùng các endpoint phụ trợ (cancel, single tts, voice list).
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from core.ws_manager import ws_manager
from service.vieneu import (
    cancel_tts_op,
    generate_tts_batch_sync,
    list_preset_voices,
    normalize_voice_id,
)

logger = logging.getLogger("router_tts_engines")

router = APIRouter(prefix="/api/transcript", tags=["tts"])


# ===========================================================================
# PYDANTIC SCHEMAS
# ===========================================================================

class TtsBatchItem(BaseModel):
    id: str = Field(..., description="ID định danh phân đoạn/segment")
    text: str = Field(..., description="Nội dung văn bản cần đọc")
    voiceId: Optional[str] = Field(None, description="Tên hoặc ID giọng đọc (ví dụ: 'vieneu:Ngọc Huyền')")
    speakerId: Optional[Any] = Field(None, description="ID người nói (nếu có)")
    destPath: Optional[str] = Field(None, description="Đường dẫn lưu file âm thanh WAV đầu ra")
    outputPath: Optional[str] = Field(None, description="Bí danh thay thế cho destPath")
    startTime: Optional[float] = Field(None, description="Thời điểm bắt đầu phân đoạn (giây)")
    endTime: Optional[float] = Field(None, description="Thời điểm kết thúc phân đoạn (giây)")
    speed: Optional[float] = Field(1.0, description="Tốc độ đọc (1.0 = chuẩn)")
    targetDuration: Optional[float] = Field(None, description="Thời lượng mục tiêu cần khớp (giây)")

    class Config:
        extra = "allow"


class TtsBatchRequest(BaseModel):
    opId: Optional[str] = Field(None, description="Mã thao tác (operation ID) phục vụ quản lý & hủy tác vụ")
    language: Optional[str] = Field("vi", description="Mã ngôn ngữ (mặc định: 'vi')")
    items: List[TtsBatchItem] = Field(default_factory=list, description="Danh sách các câu cần tổng hợp giọng")

    class Config:
        extra = "allow"


class TtsSingleRequest(BaseModel):
    text: str = Field(..., description="Nội dung văn bản cần đọc")
    voiceId: Optional[str] = Field(None, description="ID giọng đọc (ví dụ: 'vieneu:Ngọc Huyền')")
    destPath: Optional[str] = Field(None, description="Đường dẫn file đầu ra")
    outputPath: Optional[str] = Field(None, description="Bí danh thay thế cho destPath")
    speed: Optional[float] = Field(1.0, description="Tốc độ đọc")
    opId: Optional[str] = Field(None, description="Mã thao tác")

    class Config:
        extra = "allow"


class CancelTtsRequest(BaseModel):
    opId: Optional[str] = Field(None, description="Mã thao tác cần hủy")
    op_id: Optional[str] = Field(None, description="Bí danh thay thế cho opId")

    class Config:
        extra = "allow"


# ===========================================================================
# TTS API ROUTES
# ===========================================================================

@router.post("/generate-tts-batch")
async def api_generate_tts_batch(req_payload: Union[TtsBatchRequest, Dict[str, Any]]):
    """
    Endpoint tổng hợp giọng nói hàng loạt bằng VieNeu-TTS v3 Turbo trên GPU (/api/transcript/generate-tts-batch).
    Tối ưu hóa chạy infer_batch cho nhiều câu cùng lúc để đạt throughput cao nhất.
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    op_id = req.get("opId") or ""
    language = req.get("language") or "vi"
    items = req.get("items") or []

    if not items:
        return {
            "success": True,
            "results": [],
            "failed": 0,
            "cancelled": False,
            "cancelledCount": 0,
        }

    logger.info(
        f"[TTS Batch] Bắt đầu xử lý opId='{op_id}', language='{language}', số lượng câu={len(items)}"
    )
    if op_id:
        await ws_manager.broadcast_log(op_id, f"[TTS] Bắt đầu tạo giọng đọc batch ({len(items)} câu)...")
        await ws_manager.broadcast_op_progress("tts-batch", op_id, done=0, total=len(items), pct=0.0, stage="start")

    try:
        # Chạy infer_batch trong thread pool riêng để không chặn async loop của FastAPI
        response = await asyncio.to_thread(
            generate_tts_batch_sync,
            items=items,
            op_id=op_id,
            language=language,
        )
        if op_id:
            await ws_manager.broadcast_op_progress("tts-batch", op_id, done=len(items), total=len(items), pct=100.0, stage="done")
            await ws_manager.broadcast_log(op_id, f"[TTS] Hoàn tất tạo giọng đọc batch ({len(items)} câu).")
        return response
    except Exception as e:
        logger.error(f"[TTS Batch] Thất bại khi sinh giọng nói batch: {e}", exc_info=True)
        if op_id:
            await ws_manager.broadcast_error(op_id, f"Lỗi tổng hợp giọng nói batch: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi tổng hợp giọng nói batch: {str(e)}",
        )


@router.post("/cancel-tts-batch")
@router.post("/cancel-tts")
async def api_cancel_tts_batch(body: Union[CancelTtsRequest, Dict[str, Any]]):
    """
    Hủy tiến trình tổng hợp TTS đang chạy theo opId (/api/transcript/cancel-tts-batch).
    """
    if hasattr(body, "model_dump"):
        data = body.model_dump()
    elif hasattr(body, "dict"):
        data = body.dict()
    else:
        data = dict(body)

    op_id = data.get("opId") or data.get("op_id") or ""
    if op_id:
        cancel_tts_op(op_id)
        logger.info(f"[TTS Batch] Đã tiếp nhận yêu cầu hủy opId={op_id}")
        await ws_manager.broadcast_log(op_id, f"[TTS] Đã tiếp nhận yêu cầu hủy batch opId={op_id}")

    return {"status": "cancelled", "opId": op_id}


@router.post("/generate-tts")
async def api_generate_tts_single(req_payload: Union[TtsSingleRequest, Dict[str, Any]]):
    """
    Endpoint tổng hợp âm thanh cho 1 câu đơn lẻ (/api/transcript/generate-tts).
    Tương thích với action 'generate-tts' từ node_helper / TtsRouter.
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    text = req.get("text") or ""
    voice_id = req.get("voiceId") or "vieneu:Ngọc Huyền"
    dest_path = req.get("destPath") or req.get("outputPath")
    speed = float(req.get("speed") or 1.0)
    op_id = req.get("opId")

    single_item = {
        "id": "single_0",
        "text": text,
        "voiceId": voice_id,
        "destPath": dest_path,
        "speed": speed,
    }

    res = await asyncio.to_thread(
        generate_tts_batch_sync,
        items=[single_item],
        op_id=op_id,
    )

    results = res.get("results") or []
    if results and results[0].get("success"):
        first = results[0]
        return {
            "success": True,
            "outputPath": first.get("outputPath"),
            "validAudio": first.get("validAudio", True),
            "durationSeconds": first.get("durationSeconds", 0.0),
            "sizeBytes": first.get("sizeBytes", 0),
        }
    else:
        err_msg = results[0].get("error") if results else "Unknown error"
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi tổng hợp giọng nói: {err_msg}",
        )


@router.get("/vieneu-voices")
@router.get("/fetch-tts-voices")
async def api_get_vieneu_voices():
    """
    Lấy danh sách các giọng đọc preset tích hợp của VieNeu-TTS.
    """
    voices = list_preset_voices()
    return {
        "success": True,
        "engine": "vieneu",
        "voices": [
            {
                "id": f"vieneu:{v_id}",
                "name": label,
                "engine": "vieneu",
                "lang": "vi",
            }
            for label, v_id in voices
        ],
    }
