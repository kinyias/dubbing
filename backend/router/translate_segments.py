from __future__ import annotations

import asyncio
import inspect
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

from core.node_bridge import (
    NodeHelperCancelledError,
    NodeHelperError,
    cancel_node_helper,
    run_node_helper,
)
from core.ws_manager import ws_manager
from service.setting import load_transcript_settings

logger = logging.getLogger("router_custom_transcript")

router = APIRouter(prefix="/api/transcript", tags=["transcript"])
class TranslateRequest(BaseModel):
    segments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    targetLang: Optional[str] = "vi"
    sourceLang: Optional[str] = None
    source: Optional[str] = None
    preset: Optional[str] = "default"
    model: Optional[str] = None
    provider: Optional[str] = None
    parallelJobs: Optional[int] = 1
    glossary: Optional[List[Any]] = Field(default_factory=list)
    bible: Optional[Any] = None
    speakers: Optional[List[Any]] = Field(default_factory=list)
    videoPath: Optional[str] = None
    video_path: Optional[str] = None
    opId: Optional[str] = None
    polish: Optional[bool] = None

    class Config:
        extra = "allow"
# ===========================================================================
# TRANSLATION ROUTES
# ===========================================================================

@router.post("/translate-segments")
async def api_translate_segments(req_payload: Union[TranslateRequest, Dict[str, Any]]):
    """
    Endpoint dịch thuật phụ đề từng đoạn (/api/transcript/translate-segments).
    Khảo sát & tái tạo từ backend/routers/pipeline.cp312-win_amd64.pyd (line 714):
      1. Đọc transcript settings qua load_transcript_settings()
      2. Đính kèm thông tin xác thực ezmaxAuth (_with_ezmax_auth)
      3. Chuẩn hóa payload data cho Node.js helper (action: 'translate-segments')
      4. Định vị đường dẫn cacheFile từ videoPath qua get_translate_cache_file(videoPath)
      5. Thực thi song song / xử lý ngữ cảnh qua Node helper DeepSeekTranslator.translateSegments
      6. Trả về kết quả với cấu trúc chuẩn:
         - translations: danh sách câu dịch
         - ids: danh sách ID câu
         - suspects: danh sách câu nghi ngờ cần kiểm tra
         - statuses: trạng thái từng câu (ok / suspect)
         - dubbing: văn bản rút gọn tối ưu cho lồng tiếng
         - budgets: số lượng âm tiết tối đa
         - listeners: thông tin người nghe / ngôi xưng
         - detectedSourceLang: ngôn ngữ nguồn nhận diện
         - bible: từ điển thực thể & mối quan hệ (character, relationships, pronouns)
         - bibleConflicts: danh sách xung đột nhân vật (nếu có)
    """
    req = req_payload.model_dump() if hasattr(req_payload, "model_dump") else (req_payload.dict() if hasattr(req_payload, "dict") else dict(req_payload))

    settings = load_transcript_settings()

    video_path = req.get("videoPath") or req.get("video_path")

    # Chuẩn bị dữ liệu gửi sang Node.js helper 
    data: Dict[str, Any] = {
        "segments": req.get("segments"),
        "targetLang": req.get("targetLang"),
        "source": req.get("source") if "source" in req else req.get("sourceLang"),
        "sourceLang": req.get("sourceLang"),
        "preset": req.get("preset"),
        "model": req.get("model"),
        "provider": req.get("provider"),
        "parallelJobs": req.get("parallelJobs"),
        "glossary": req.get("glossary"),
        "bible": req.get("bible"),
        "speakers": req.get("speakers"),
        "videoPath": video_path,
        "opId": req.get("opId"),
    }

    if req.get("polish") is not None:
        data["polish"] = req.get("polish")

    op_id = req.get("opId")
    segments_count = len(req.get("segments") or [])
    logger.info(
        f"[Translate] Starting translate job opId={op_id}, provider='{req.get('provider')}', model='{req.get('model')}', count={segments_count}"
    )

    if op_id:
        await ws_manager.broadcast_log(op_id, f"[Translate] Bắt đầu dịch {segments_count} đoạn phụ đề...")
        await ws_manager.broadcast_op_progress(
            op="translate",
            op_id=op_id,
            done=0,
            total=max(1, (segments_count + 9) // 10),
            pct=0.0,
            message=f"Bắt đầu dịch {segments_count} câu..."
        )

    async def _on_event(event: dict):
        if not isinstance(event, dict):
            return
        if "opId" not in event and op_id:
            event["opId"] = op_id
        await ws_manager.broadcast_json(event)

        if op_id and event.get("type") == "progress" and event.get("op") == "translate":
            done = event.get("done")
            total = event.get("total")
            if done is not None and total is not None:
                await ws_manager.broadcast_log(
                    op_id, f"[Translate] Đang dịch: {done}/{total} cụm câu"
                )

    async def _on_log(message: str):
        if op_id:
            await ws_manager.broadcast_log(op_id, message)

    try:
        result = await run_node_helper(
            action="translate-segments",
            data=data,
            settings=settings,
            on_event=_on_event,
            on_log=_on_log,
        )

        if op_id:
            trans_count = len(result.get("translations", [])) if isinstance(result, dict) else segments_count
            await ws_manager.broadcast_log(op_id, f"[Translate] Hoàn tất dịch {trans_count} đoạn phụ đề.")
            await ws_manager.broadcast_op_progress(
                op="translate",
                op_id=op_id,
                done=1,
                total=1,
                pct=100.0,
                message=f"Hoàn tất: {trans_count} câu"
            )

        return result
    except NodeHelperCancelledError:
        logger.info(f"[Translate] Operation {op_id} was cancelled.")
        if op_id:
            await ws_manager.broadcast_log(op_id, "[Translate] Đã hủy dịch theo yêu cầu.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Translation was cancelled",
        )
    except NodeHelperError as e:
        logger.error(f"[Translate] NodeHelperError: {e.code} - {e.message}")
        if op_id:
            await ws_manager.broadcast_error(op_id, e.message)
            await ws_manager.broadcast_log(op_id, f"[Translate] ✗ Lỗi dịch: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e.message or e),
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"[Translate] Failed to translate segments: {e}", exc_info=True)
        if op_id:
            await ws_manager.broadcast_error(op_id, str(e))
            await ws_manager.broadcast_log(op_id, f"[Translate] ✗ Lỗi dịch: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post("/cancel-translate")
async def api_cancel_translate(body: Dict[str, Any]):
    """
    Hủy tiến trình dịch thuật (/api/transcript/cancel-translate).
    Khảo sát & sửa lỗi từ pipeline.py line 882 (hỗ trợ cả sync lẫn async cancel_node_helper).
    """
    op_id = body.get("opId") or body.get("op_id") or ""
    if op_id:
        res = cancel_node_helper(op_id)
        if inspect.isawaitable(res):
            await res
    return {"status": "cancelled", "opId": op_id}


@router.post("/fetch-translate-models")
async def api_fetch_translate_models(req_payload: Union[Dict[str, Any], BaseModel]):
    """
    Lấy danh sách các model dịch thuật tùy chỉnh (/api/transcript/fetch-translate-models).
    """
    req = req_payload.model_dump() if hasattr(req_payload, "model_dump") else (req_payload.dict() if hasattr(req_payload, "dict") else dict(req_payload))
    settings = load_transcript_settings()

    api_key = req.get("apiKey") or settings.get("customApiKey") or ""
    endpoint = req.get("endpoint") or settings.get("customApiEndpoint") or ""
    data = {"endpoint": endpoint, "apiKey": api_key}

    try:
        result = await run_node_helper(
            action="fetch-translate-models",
            data=data,
            settings=settings,
        )
        return result
    except Exception as e:
        logger.error(f"[Translate] Failed to fetch models: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )