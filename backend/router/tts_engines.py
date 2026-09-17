"""
Router API cho phân hệ TTS (Text-to-Speech) — Hỗ trợ song song VieNeu-TTS (GPU) và CapCut TTS (qua node_bridge).
Cung cấp route /api/transcript/generate-tts, /api/transcript/generate-tts-batch, /api/transcript/generate-capcut-tts cùng các endpoint phụ trợ.
"""

from __future__ import annotations

import asyncio
import logging
import os
import tempfile
import uuid
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from core.node_bridge import generate_tts as node_generate_tts
from core.ws_manager import ws_manager
from backend.service.vieneu_tts import (
    cancel_tts_op,
    generate_tts_batch_sync,
    list_preset_voices,
    normalize_voice_id,
)

logger = logging.getLogger("router_tts_engines")

router = APIRouter(prefix="/api/transcript", tags=["tts"])


# ===========================================================================
# HELPER FUNCTIONS
# ===========================================================================

def is_vieneu_voice(voice_id: Optional[str]) -> bool:
    """Kiểm tra ID giọng có phải thuộc VieNeu-TTS hay không."""
    if not voice_id:
        return False
    v = str(voice_id).strip().lower()
    return v.startswith("vieneu:")


def normalize_capcut_voice_id(voice_id: Optional[str]) -> str:
    """Chuẩn hóa voiceId cho CapCut TTS / node_helper."""
    if not voice_id:
        return "bv:vi_female_huong"
    v = str(voice_id).strip()
    if v.lower().startswith("capcut:"):
        v = v[7:].strip()
    return v or "bv:vi_female_huong"


def probe_audio_info(file_path: str) -> tuple[float, int]:
    """
    Đo thời lượng (durationSeconds) và dung lượng (sizeBytes) của file audio.
    """
    if not file_path or not os.path.exists(file_path):
        return 0.0, 0
    size_bytes = os.path.getsize(file_path)
    dur = 0.0
    try:
        import soundfile as sf
        info = sf.info(file_path)
        dur = float(info.duration)
        return dur, size_bytes
    except Exception:
        pass

    try:
        import torchaudio
        si = torchaudio.info(file_path)
        if si.sample_rate > 0:
            dur = float(si.num_frames) / float(si.sample_rate)
            return dur, size_bytes
    except Exception:
        pass

    return dur, size_bytes


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
    voiceId: Optional[str] = Field(None, description="ID giọng đọc (ví dụ: 'vieneu:Ngọc Huyền', 'bv:vi_female_huong')")
    engine: Optional[str] = Field(None, description="Engine TTS: 'vieneu', 'capcut' (tự động nhận diện nếu bỏ trống)")
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
@router.post("/generate-capcut-tts")
async def api_generate_tts_single(req_payload: Union[TtsSingleRequest, Dict[str, Any]]):
    """
    Endpoint tổng hợp âm thanh cho 1 câu đơn lẻ (/api/transcript/generate-tts).
    Tự động định tuyến:
    - Nếu voiceId là giọng CapCut (hoặc engine='capcut') -> Gọi node_bridge.generate_tts.
    - Nếu voiceId là giọng VieNeu -> Gọi VieNeu-TTS (GPU).
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    text = (req.get("text") or "").strip()
    voice_id = req.get("voiceId") or req.get("voice_id")
    dest_path = req.get("destPath") or req.get("outputPath")
    speed = float(req.get("speed") or 1.0)
    op_id = req.get("opId") or req.get("op_id")
    explicit_engine = (req.get("engine") or "").lower().strip()

    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nội dung văn bản (text) không được để trống",
        )

    # Nhận diện engine: CapCut vs VieNeu
    is_capcut = (
        explicit_engine == "capcut"
        or (voice_id and not is_vieneu_voice(voice_id))
    )

    if is_capcut:
        # === 1. XỬ LÝ QUA CAPCUT TTS / NODE BRIDGE ===
        clean_voice_id = normalize_capcut_voice_id(voice_id)
        if not dest_path:
            dest_path = os.path.join(tempfile.gettempdir(), f"tts_capcut_{uuid.uuid4().hex}.mp3")

        logger.info(
            f"[TTS Single] Đang tạo CapCut TTS qua node_bridge: voiceId='{clean_voice_id}', speed={speed}, destPath='{dest_path}'"
        )
        try:
            res = await node_generate_tts(
                text=text,
                voice_id=clean_voice_id,
                dest_path=dest_path,
                speed=speed,
                op_id=op_id,
            )
            out_path = res.get("outputPath") or dest_path
            dur, size = probe_audio_info(out_path)
            valid = bool(res.get("validAudio", True) and os.path.exists(out_path) and size > 44)
            return {
                "success": True,
                "outputPath": out_path,
                "validAudio": valid,
                "durationSeconds": dur,
                "sizeBytes": size,
                "engine": "capcut",
                "voiceId": clean_voice_id,
            }
        except Exception as e:
            logger.error(f"[TTS Single] Lỗi khi tạo CapCut TTS qua node_bridge: {e}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Lỗi tổng hợp giọng nói CapCut: {str(e)}",
            )
    else:
        # === 2. XỬ LÝ QUA VIENEU-TTS (GPU) ===
        target_voice_id = voice_id or "vieneu:Ngọc Huyền"
        if not dest_path:
            dest_path = os.path.join(tempfile.gettempdir(), f"tts_vieneu_{uuid.uuid4().hex}.wav")

        single_item = {
            "id": "single_0",
            "text": text,
            "voiceId": target_voice_id,
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
            out_path = first.get("outputPath") or dest_path
            dur, size = probe_audio_info(out_path)
            if dur <= 0.0:
                dur = float(first.get("durationSeconds", 0.0))
            if size <= 0:
                size = int(first.get("sizeBytes", 0))

            return {
                "success": True,
                "outputPath": out_path,
                "validAudio": first.get("validAudio", True),
                "durationSeconds": dur,
                "sizeBytes": size,
                "engine": "vieneu",
                "voiceId": target_voice_id,
            }
        else:
            err_msg = results[0].get("error") if results else "Unknown error"
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Lỗi tổng hợp giọng nói VieNeu: {err_msg}",
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

