"""
Service quản lý cấu hình (settings) cho transcript, translation và TTS.
Đọc/ghi tệp settings.json để cung cấp cấu hình chuẩn cho node_bridge và node_helper.js.
"""

from __future__ import annotations

import json
import logging
import os
import threading
from typing import Any, Dict, List, Optional

logger = logging.getLogger("service_setting")

SERVICE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SERVICE_DIR)
DEFAULT_SETTINGS_PATH = os.path.join(PROJECT_DIR, "settings.json")
EXAMPLE_SETTINGS_PATH = os.path.join(PROJECT_DIR, "settings.example.json")

_lock = threading.Lock()
_cached_settings: Optional[Dict[str, Any]] = None


def get_settings_path(custom_path: Optional[str] = None) -> str:
    """Trả về đường dẫn tới tệp settings.json."""
    if custom_path and os.path.isfile(custom_path):
        return custom_path
    if os.path.exists(DEFAULT_SETTINGS_PATH):
        return DEFAULT_SETTINGS_PATH
    return DEFAULT_SETTINGS_PATH


def _deep_merge(target: Dict[str, Any], source: Dict[str, Any]) -> Dict[str, Any]:
    """
    Hợp nhất đệ quy source vào target:
    - Bỏ qua giá trị placeholder bí mật '__ez_secret_unchanged__'
    - Hợp nhất nested dictionary thay vì ghi đè toàn bộ dictionary con
    """
    for key, value in source.items():
        if value == "__ez_secret_unchanged__":
            continue
        if isinstance(value, dict) and isinstance(target.get(key), dict):
            _deep_merge(target[key], value)
        else:
            target[key] = value
    return target


def _unset_path(target: Dict[str, Any], path: str) -> bool:
    """
    Xóa một key hoặc đường dẫn lồng nhau (phân cách bằng dấu chấm) khỏi target dictionary.
    Ví dụ: 'geminiApiKey' hoặc 'localTts.vieneu.gpuSlot'.
    """
    if not path or not isinstance(path, str):
        return False
    parts = path.split(".")
    curr = target
    for part in parts[:-1]:
        if isinstance(curr, dict) and part in curr:
            curr = curr[part]
        else:
            return False
    if isinstance(curr, dict) and parts[-1] in curr:
        del curr[parts[-1]]
        return True
    return False


def load_transcript_settings(path: Optional[str] = None) -> Dict[str, Any]:
    """
    Nạp toàn bộ cấu hình từ settings.json.
    Trả về dict chứa các thông số: API keys, model, provider, ffmpegPath, v.v.
    """
    global _cached_settings
    settings_file = get_settings_path(path)

    if not os.path.exists(settings_file):
        # Thử nạp từ settings.example.json nếu settings.json chưa tồn tại
        if os.path.exists(EXAMPLE_SETTINGS_PATH):
            try:
                with open(EXAMPLE_SETTINGS_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, dict):
                    save_transcript_settings(data, settings_file)
                    return data
            except Exception as e:
                logger.warning(f"Lỗi khi đọc file settings.example.json: {e}")

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


def patch_transcript_settings(
    patches: Optional[Dict[str, Any]] = None,
    unset: Optional[List[str]] = None,
    path: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Cập nhật một phần cấu hình và lưu vào settings.json.
    Hỗ trợ:
    - payload dạng chuẩn frontend: {"set": {...}, "unset": [...]}
    - payload dạng trực tiếp: {"key": "val", ...}
    - unset danh sách key đơn hoặc dotted path
    """
    current = load_transcript_settings(path)
    unset_list: List[str] = list(unset or [])

    if patches and isinstance(patches, dict):
        # 1. Hỗ trợ cấu trúc frontend gửi lên: {"set": {...}, "unset": [...]}
        if "set" in patches and isinstance(patches["set"], dict):
            _deep_merge(current, patches["set"])
            if "unset" in patches and isinstance(patches["unset"], list):
                unset_list.extend([u for u in patches["unset"] if isinstance(u, str)])
            if "unsetPaths" in patches and isinstance(patches["unsetPaths"], list):
                unset_list.extend([u for u in patches["unsetPaths"] if isinstance(u, str)])
        else:
            # 2. Hỗ trợ format dict trực tiếp
            clean_patches = {}
            for k, v in patches.items():
                if k in ("unset", "unsetPaths") and isinstance(v, list):
                    unset_list.extend([u for u in v if isinstance(u, str)])
                else:
                    clean_patches[k] = v
            _deep_merge(current, clean_patches)

    # Thực hiện unset các trường được yêu cầu
    for p in unset_list:
        _unset_path(current, p)

    save_transcript_settings(current, path)
    return current


def update_transcript_settings(settings: Dict[str, Any], path: Optional[str] = None) -> Dict[str, Any]:
    """Cập nhật cài đặt (hỗ trợ cả partial hoặc toàn phần)."""
    return patch_transcript_settings(patches=settings, path=path)


def get_setting(key: str, default: Any = None, path: Optional[str] = None) -> Any:
    """
    Lấy giá trị của một key cấu hình cụ thể.
    Hỗ trợ nested dotted key path như 'localTts.vieneu.engine'.
    """
    settings = load_transcript_settings(path)
    if "." in key:
        curr = settings
        for part in key.split("."):
            if isinstance(curr, dict) and part in curr:
                curr = curr[part]
            else:
                return default
        return curr
    return settings.get(key, default)
