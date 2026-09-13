"""
Service quản lý cấu hình (settings) cho transcript, translation và TTS.
Đọc/ghi tệp settings.json để cung cấp cấu hình chuẩn cho node_bridge và node_helper.js.
"""

from __future__ import annotations

import json
import logging
import os
import threading
from typing import Any, Dict, Optional

logger = logging.getLogger("service_setting")

SERVICE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SERVICE_DIR)
DEFAULT_SETTINGS_PATH = os.path.join(PROJECT_DIR, "settings.json")

_lock = threading.Lock()
_cached_settings: Optional[Dict[str, Any]] = None


def get_settings_path(custom_path: Optional[str] = None) -> str:
    """Trả về đường dẫn tới tệp settings.json."""
    if custom_path and os.path.isfile(custom_path):
        return custom_path
    if os.path.exists(DEFAULT_SETTINGS_PATH):
        return DEFAULT_SETTINGS_PATH
    return DEFAULT_SETTINGS_PATH


def load_transcript_settings(path: Optional[str] = None) -> Dict[str, Any]:
    """
    Nạp toàn bộ cấu hình từ settings.json.
    Trả về dict chứa các thông số: API keys, model, provider, ffmpegPath, v.v.
    """
    global _cached_settings
    settings_file = get_settings_path(path)

    if not os.path.exists(settings_file):
        logger.warning(f"Không tìm thấy file settings tại: {settings_file}. Sử dụng cấu hình mặc định.")
        return {
            "ffmpegPath": "ffmpeg",
            "translateProvider": "custom",
            "customApiEndpoint": "",
            "customApiKey": "",
            "customModel": "",
            "transcribeEngine": "capcut",
        }

    try:
        with _lock:
            with open(settings_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict):
                _cached_settings = data
                return data
    except Exception as e:
        logger.error(f"Lỗi khi đọc file settings.json ({settings_file}): {e}")
        if _cached_settings is not None:
            return _cached_settings

    return {}


def save_transcript_settings(settings: Dict[str, Any], path: Optional[str] = None) -> bool:
    """Ghi đè cấu hình vào settings.json."""
    global _cached_settings
    settings_file = get_settings_path(path)
    try:
        with _lock:
            with open(settings_file, "w", encoding="utf-8") as f:
                json.dump(settings, f, indent=4, ensure_ascii=False)
            _cached_settings = settings
        return True
    except Exception as e:
        logger.error(f"Lỗi khi lưu settings.json ({settings_file}): {e}")
        return False


def patch_transcript_settings(patches: Dict[str, Any], path: Optional[str] = None) -> Dict[str, Any]:
    """Cập nhật một phần cấu hình và lưu vào settings.json."""
    current = load_transcript_settings(path)
    current.update(patches)
    save_transcript_settings(current, path)
    return current


def get_setting(key: str, default: Any = None) -> Any:
    """Lấy giá trị của một key cấu hình cụ thể."""
    settings = load_transcript_settings()
    return settings.get(key, default)
