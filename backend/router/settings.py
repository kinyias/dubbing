"""
Router xử lý API cấu hình hệ thống (Settings):
- GET /api/transcript/settings: Lấy toàn bộ cấu hình hoặc lọc theo key query
- GET /api/transcript/settings/{key:path}: Lấy cấu hình của một key cụ thể (hỗ trợ nested key)
- PATCH /api/transcript/settings: Cập nhật từng phần (hỗ trợ set, unset, deep merge)
- POST /api/transcript/settings: Cập nhật hoặc lưu cấu hình
- PUT /api/transcript/settings: Cập nhật hoặc lưu cấu hình
"""

from __future__ import annotations

import logging
from typing import Any, Dict, Optional
from fastapi import APIRouter, Body, HTTPException, Query

from service.setting import (
    load_transcript_settings,
    patch_transcript_settings,
    update_transcript_settings,
    get_setting,
)

logger = logging.getLogger("router_settings")

router = APIRouter(prefix="/api/transcript/settings", tags=["settings"])


@router.get("", summary="Lấy toàn bộ cài đặt hoặc theo key query")
@router.get("/", include_in_schema=False)
async def get_settings_endpoint(key: Optional[str] = Query(None, description="Tên key cấu hình cần lấy (tuỳ chọn)")):
    """
    Lấy thông tin cấu hình settings.
    - Nếu có query param `key`: trả về giá trị của key đó dạng {"key": key, "value": val}
    - Nếu không có query param `key`: trả về toàn bộ dictionary cấu hình
    """
    try:
        if key:
            val = get_setting(key)
            return {"key": key, "value": val}
        return load_transcript_settings()
    except Exception as e:
        logger.error(f"Lỗi khi đọc settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("", summary="Cập nhật từng phần cài đặt (PATCH)")
@router.patch("/", include_in_schema=False)
async def patch_settings_endpoint(payload: Dict[str, Any] = Body(...)):
    """
    Cập nhật từng phần cấu hình settings.json.
    Tương thích hoàn toàn với payload frontend gửi:
    {
        "set": { ... },
        "unset": [ ... ]
    }
    Hoặc dict trực tiếp:
    {
        "key": "value"
    }
    Trả về toàn bộ settings sau khi cập nhật.
    """
    try:
        updated = patch_transcript_settings(patches=payload)
        return updated
    except Exception as e:
        logger.error(f"Lỗi khi patch settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("", summary="Cập nhật cài đặt (POST)")
@router.post("/", include_in_schema=False)
@router.put("", summary="Cập nhật cài đặt (PUT)")
@router.put("/", include_in_schema=False)
async def update_settings_endpoint(payload: Dict[str, Any] = Body(...)):
    """
    Cập nhật hoặc ghi nhận cấu hình settings (POST/PUT).
    Trả về toàn bộ settings sau khi cập nhật.
    """
    try:
        # Nếu client bọc trong {"settings": {...}}
        settings_data = payload.get("settings") if isinstance(payload.get("settings"), dict) else payload
        updated = update_transcript_settings(settings=settings_data)
        return updated
    except Exception as e:
        logger.error(f"Lỗi khi update settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{key:path}", summary="Lấy giá trị của một key cụ thể")
async def get_setting_by_key_endpoint(key: str):
    """
    Lấy giá trị của một key cấu hình cụ thể theo path.
    Hỗ trợ nested key như 'localTts.vieneu.engine'.
    """
    try:
        val = get_setting(key)
        return {"key": key, "value": val}
    except Exception as e:
        logger.error(f"Lỗi khi lấy key setting '{key}': {e}")
        raise HTTPException(status_code=500, detail=str(e))
