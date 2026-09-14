# -*- coding: utf-8 -*-
"""
HongGuo Dubbing Pipeline Runner & Settings Manager
Thực thi API lồng tiếng video Hồng Quả (HongGuo) tự động:
1. Quản lý / cập nhật cấu hình hệ thống settings.json (customApiEndpoint, customApiKey, customModel, capcutTdid).
2. Tra cứu chi tiết phim Hồng Quả (tiêu đề, ảnh bìa, danh sách tập).
3. Thực thi quy trình lồng tiếng toàn trình: Tải video -> Đồng bộ format -> Ghép Stream Copy -> Lồng tiếng (ASR -> Dịch thuật AI -> VieNeu TTS -> Timing Plan -> Mix & Mux).
4. Đồng bộ tiến trình thời gian thực qua WebSocket và hỗ trợ ngắt Ctrl+C an toàn.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import re
import signal
import sys
import time
import uuid
from typing import Any, Callable, Dict, List, Optional
from urllib.parse import urlparse

# Thiết lập encoding UTF-8 cho Windows console
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đảm bảo đường dẫn backend và thư mục gốc project được nạp vào sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import requests

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run_hongguo_pipeline")

# Biến toàn cục để xử lý ngắt an toàn
_active_op_id: Optional[str] = None
_active_api_base: Optional[str] = None


# ---------------------------------------------------------------------------
# Tiện ích định dạng
# ---------------------------------------------------------------------------

def format_duration(seconds: float) -> str:
    """Định dạng số giây sang mm:ss hoặc hh:mm:ss."""
    s = float(seconds or 0.0)
    hrs = int(s // 3600)
    mins = int((s % 3600) // 60)
    secs = int(s % 60)
    if hrs > 0:
        return f"{hrs:02d}:{mins:02d}:{secs:02d}"
    return f"{mins:02d}:{secs:02d} ({s:.1f}s)"


def format_size(bytes_count: int) -> str:
    """Định dạng số byte sang KB/MB/GB."""
    b = float(bytes_count or 0)
    if b < 1024:
        return f"{b:.0f} B"
    elif b < 1024 * 1024:
        return f"{b / 1024:.2f} KB"
    elif b < 1024 * 1024 * 1024:
        return f"{b / (1024 * 1024):.2f} MB"
    else:
        return f"{b / (1024 * 1024 * 1024):.2f} GB"


def extract_series_id(raw_input: str) -> str:
    """Trích xuất series_id sạch từ chuỗi ID hoặc đường dẫn URL."""
    sid = str(raw_input or "").strip()
    if not sid:
        return ""
    if "series_id=" in sid:
        m = re.search(r"series_id=([0-9A-Za-z_-]+)", sid)
        if m:
            return m.group(1)
    # Loại bỏ ký tự thừa nếu người dùng dán cả url có param khác
    if "?" in sid:
        sid = sid.split("?")[0]
    return sid.strip("/ ")


def is_server_online(api_base: str, timeout: float = 1.5) -> bool:
    """Kiểm tra server backend FastAPI có đang phản hồi tại api_base hay không."""
    try:
        res = requests.get(f"{api_base.rstrip('/')}/health", timeout=timeout)
        return res.status_code == 200
    except Exception:
        return False


# ---------------------------------------------------------------------------
# Quản lý Cấu hình Settings (backend/router/settings.py)
# ---------------------------------------------------------------------------

def get_pipeline_settings(
    api_base: str = "http://127.0.0.1:8000",
    key: Optional[str] = None,
    force_direct: bool = False,
) -> Dict[str, Any]:
    """
    Lấy cấu hình hiện tại:
    - Ưu tiên gọi API HTTP: GET /api/transcript/settings
    - Tự động fallback sang service/setting.py nếu server offline.
    """
    clean_base = api_base.rstrip("/")
    if not force_direct and is_server_online(clean_base):
        try:
            url = f"{clean_base}/api/transcript/settings"
            params = {"key": key} if key else {}
            res = requests.get(url, params=params, timeout=5)
            if res.status_code == 200:
                data = res.json()
                if key and isinstance(data, dict) and "value" in data:
                    return {key: data.get("value")}
                return data
        except Exception as e:
            logger.warning(f"Lỗi truy vấn settings qua HTTP API: {e}. Thử đọc file local...")

    # Fallback đọc trực tiếp settings.json qua service
    try:
        from backend.service.setting import load_transcript_settings, get_setting
        if key:
            return {key: get_setting(key)}
        return load_transcript_settings()
    except Exception as exc:
        logger.error(f"Không thể đọc cấu hình settings: {exc}")
        return {}


def update_pipeline_settings(
    api_base: str = "http://127.0.0.1:8000",
    custom_endpoint: Optional[str] = None,
    custom_key: Optional[str] = None,
    custom_model: Optional[str] = None,
    capcut_tdid: Optional[str] = None,
    extra_settings: Optional[Dict[str, Any]] = None,
    force_direct: bool = False,
) -> Dict[str, Any]:
    """
    Cập nhật cài đặt hệ thống (PATCH /api/transcript/settings):
    Chủ yếu để đặt lại:
    - customApiEndpoint
    - customApiKey
    - customModel
    - capcutTdid
    Tự động fallback ghi trực tiếp settings.json nếu server backend chưa chạy.
    """
    clean_base = api_base.rstrip("/")
    patches: Dict[str, Any] = {}

    if custom_endpoint is not None:
        patches["customApiEndpoint"] = custom_endpoint.strip()
    if custom_key is not None:
        patches["customApiKey"] = custom_key.strip()
    if custom_model is not None:
        patches["customModel"] = custom_model.strip()
    if capcut_tdid is not None:
        patches["capcutTdid"] = capcut_tdid.strip()

    if extra_settings and isinstance(extra_settings, dict):
        for k, v in extra_settings.items():
            if v is not None:
                patches[k] = v

    if not patches:
        return get_pipeline_settings(api_base=clean_base, force_direct=force_direct)

    # 1. Thử gọi qua HTTP API
    if not force_direct and is_server_online(clean_base):
        try:
            url = f"{clean_base}/api/transcript/settings"
            res = requests.patch(url, json=patches, timeout=5)
            if res.status_code == 200:
                logger.info("✓ Đã cập nhật settings thành công qua HTTP API.")
                return res.json()
            else:
                logger.warning(f"Cập nhật settings qua API trả về mã lỗi: {res.status_code} - {res.text}")
        except Exception as e:
            logger.warning(f"Lỗi khi gửi PATCH settings qua API: {e}. Thử ghi file trực tiếp...")

    # 2. Fallback ghi trực tiếp bằng service.setting
    try:
        from backend.service.setting import patch_transcript_settings
        updated = patch_transcript_settings(patches=patches)
        logger.info("✓ Đã cập nhật settings thành công vào file settings.json (Local).")
        return updated
    except Exception as exc:
        logger.error(f"Lỗi nghiêm trọng khi cập nhật settings: {exc}")
        raise


def print_settings_summary(settings: Dict[str, Any]) -> None:
    """In bảng tổng kết các cấu hình cốt lõi."""
    print("\n" + "=" * 70)
    print("⚙️   CẤU HÌNH HỆ THỐNG HIỆN HÀNH (SETTINGS)")
    print("=" * 70)
    
    endpoint = settings.get("customApiEndpoint") or "(chưa thiết lập)"
    key = settings.get("customApiKey") or ""
    masked_key = (key[:6] + "..." + key[-4:]) if len(key) > 10 else (key or "(trống)")
    model = settings.get("customModel") or settings.get("deepseekModel") or "(mặc định)"
    tdid = settings.get("capcutTdid") or "(chưa thiết lập)"
    
    print(f" 🌐 customApiEndpoint : {endpoint}")
    print(f" 🔑 customApiKey      : {masked_key}")
    print(f" 🤖 customModel       : {model}")
    print(f" 📱 capcutTdid        : {tdid}")
    print("-" * 70)
    print(f" 🎙️ transcribeEngine  : {settings.get('transcribeEngine', 'capcut')}")
    print(f" 🔊 ttsVoice          : {settings.get('ttsVoice', settings.get('defaultTtsVoice', 'Ngọc Huyền'))}")
    print(f" ⚡ ttsSpeed          : {settings.get('defaultTtsSpeed', 1.0)}x")
    print(f" 📦 translateProvider : {settings.get('translateProvider', 'custom')}")
    print("=" * 70 + "\n")


# ---------------------------------------------------------------------------
# Chi tiết phim Hồng Quả (GET /api/hongguo/detail)
# ---------------------------------------------------------------------------

def get_hongguo_detail(
    api_base: str = "http://127.0.0.1:8000",
    series_id: str = "",
    no_cache: bool = False,
    force_direct: bool = False,
) -> Dict[str, Any]:
    """Lấy thông tin chi tiết bộ phim, số lượng tập và danh sách tập phim."""
    sid = extract_series_id(series_id)
    if not sid:
        raise ValueError("series_id không hợp lệ hoặc đang để trống")

    clean_base = api_base.rstrip("/")
    if not force_direct and is_server_online(clean_base):
        try:
            url = f"{clean_base}/api/hongguo/detail"
            res = requests.get(url, params={"series_id": sid, "no_cache": no_cache}, timeout=15)
            if res.status_code == 200:
                data = res.json()
                return data.get("data") or data
            else:
                raise RuntimeError(f"API detail trả về lỗi {res.status_code}: {res.text}")
        except Exception as e:
            logger.warning(f"Lỗi gọi GET /api/hongguo/detail: {e}. Thử gọi hàm service...")

    # Fallback gọi trực tiếp
    try:
        from backend.service.detail_video_hongguo import get_series_detail
        return get_series_detail(sid, use_cache=not no_cache)
    except Exception as exc:
        logger.error(f"Lỗi truy vấn chi tiết phim series_id={sid}: {exc}")
        raise


def print_hongguo_detail(detail: Dict[str, Any]) -> None:
    """In thông tin chi tiết phim Hồng Quả ra console."""
    sid = detail.get("series_id", "")
    title = detail.get("title") or detail.get("name") or "Không tên"
    ep_count = detail.get("episode_count") or len(detail.get("episodes") or [])
    episodes = detail.get("episodes") or []
    cover = detail.get("cover_url") or detail.get("cover") or ""

    print("\n" + "=" * 70)
    print("🎬  THÔNG TIN PHIM HỒNG QUẢ (HONGGUO SHORT DRAMA)")
    print("=" * 70)
    print(f" 🆔 Series ID : {sid}")
    print(f" 🏷️ Tiêu đề   : {title}")
    print(f" 📺 Tổng số tập: {ep_count} tập")
    if cover:
        print(f" 🖼️ Ảnh bìa   : {cover}")
    print("-" * 70)

    if episodes:
        print(f" 📋 Danh sách 5 tập đầu tiên:")
        for ep in episodes[:5]:
            idx = ep.get("index") or ep.get("episode")
            vid = ep.get("vid")
            dur = format_duration(float(ep.get("duration") or 0.0))
            ep_title = ep.get("title") or f"Tập {idx}"
            print(f"    • [Tập {idx:02d}] VID: {vid} | Thời lượng: {dur} | {ep_title}")
        if len(episodes) > 5:
            print(f"    ... và {len(episodes) - 5} tập tiếp theo.")
    print("=" * 70 + "\n")


# ---------------------------------------------------------------------------
# Hủy tác vụ tải / Dubbing (POST /api/hongguo/cancel-download)
# ---------------------------------------------------------------------------

def cancel_hongguo_task(api_base: str, op_id: str) -> bool:
    """Gửi yêu cầu hủy tác vụ tải / lồng tiếng qua op_id."""
    if not op_id:
        return False
    clean_base = api_base.rstrip("/")
    try:
        url = f"{clean_base}/api/hongguo/cancel-download"
        res = requests.post(url, json={"op_id": op_id}, timeout=3)
        return res.status_code == 200
    except Exception:
        # Fallback hủy trực tiếp trong bộ nhớ
        try:
            from backend.router.hongguo import cancel_hongguo_download
            cancel_hongguo_download(op_id)
            return True
        except Exception:
            return False


# ---------------------------------------------------------------------------
# WebSocket Listener (Hiển thị tiến trình & Log real-time)
# ---------------------------------------------------------------------------

class WebSocketProgressMonitor:
    """Lớp quản lý lắng nghe log và tiến độ từ /api/transcript/ws."""

    def __init__(self, api_base: str, op_id: str):
        self.api_base = api_base.rstrip("/")
        self.op_id = op_id
        self._stop_event = asyncio.Event()
        self._task: Optional[asyncio.Task] = None

    def get_ws_url(self) -> str:
        parsed = urlparse(self.api_base)
        scheme = "wss" if parsed.scheme == "https" else "ws"
        netloc = parsed.netloc or f"{parsed.hostname}:{parsed.port or 8000}"
        return f"{scheme}://{netloc}/api/transcript/ws"

    async def _listen_loop(self):
        try:
            import websockets
        except ImportError:
            return

        ws_url = self.get_ws_url()
        while not self._stop_event.is_set():
            try:
                async with websockets.connect(ws_url, ping_interval=20, ping_timeout=20) as ws:
                    while not self._stop_event.is_set():
                        try:
                            msg_str = await asyncio.wait_for(ws.recv(), timeout=1.0)
                            if not msg_str:
                                continue
                            try:
                                data = json.loads(msg_str)
                            except Exception:
                                continue

                            msg_op = data.get("opId") or data.get("op_id")
                            if msg_op and msg_op != self.op_id:
                                continue

                            msg_type = data.get("type")
                            if msg_type == "log":
                                text = data.get("message", "")
                                if text:
                                    print(f" [LOG] {text}")
                            elif msg_type in ("progress", "export_progress"):
                                stage = data.get("stage", "")
                                pct = data.get("pct", data.get("percent", 0.0))
                                message = data.get("message", "")
                                if message:
                                    print(f" ⏳ [{pct:5.1f}%] [{stage}] {message}")
                        except asyncio.TimeoutError:
                            continue
                        except Exception:
                            break
            except Exception:
                await asyncio.sleep(1.5)

    def start(self, loop: asyncio.AbstractEventLoop):
        self._task = loop.create_task(self._listen_loop())

    async def stop(self):
        self._stop_event.set()
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass


# ---------------------------------------------------------------------------
# Chạy Dubbing Pipeline (POST /api/hongguo/dubbing)
# ---------------------------------------------------------------------------

async def run_hongguo_dubbing_async(
    api_base: str,
    payload: Dict[str, Any],
    enable_ws: bool = True,
    force_in_process: bool = False,
) -> Dict[str, Any]:
    """
    Thực thi quy trình lồng tiếng Hồng Quả:
    - Nếu server đang online: Gửi POST /api/hongguo/dubbing kèm WebSocket monitor
    - Nếu server offline hoặc force_in_process: Chạy trực tiếp qua router/service trong process hiện tại.
    """
    global _active_op_id, _active_api_base
    clean_base = api_base.rstrip("/")
    op_id = payload.get("op_id") or f"hg-dubbing-cli-{uuid.uuid4().hex[:8]}"
    payload["op_id"] = op_id

    _active_op_id = op_id
    _active_api_base = clean_base

    online = is_server_online(clean_base)

    print("\n" + "=" * 70)
    print("🚀  BẮT ĐẦU PIPELINE LỒNG TIẾNG HỒNG QUẢ (HONGGUO DUBBING)")
    print("=" * 70)
    print(f" 🆔 Operation ID    : {op_id}")
    print(f" 🎞️ Series ID       : {payload.get('series_id')}")
    if payload.get("series_title"):
        print(f" 🏷️ Tên phim        : {payload.get('series_title')}")
    print(f" 🔢 Khoảng tập      : {payload.get('episode_range') or 'all'}")
    print(f" 🧵 Luồng tải video : {payload.get('max_workers', 3)}")
    print(f" 🎙️ Engine ASR      : {payload.get('transcribe_engine', 'capcut')}")
    print(f" 🌐 Ngôn ngữ        : {payload.get('source_lang', 'auto')} ➔ {payload.get('target_lang', 'vi')}")
    print(f" 🤖 LLM Provider    : {payload.get('provider', 'custom')} (Model: {payload.get('model') or 'theo settings'})")
    print(f" 🔊 Giọng đọc VieNeu: {payload.get('voice_id', 'Ngọc Huyền')} @ {payload.get('tts_speed', 1.0)}x")
    print(f" 📐 Chế độ khớp nhịp: {payload.get('fit_mode', 'natural_flow')}")
    if payload.get("save_dir"):
        print(f" 📂 Thư mục lưu     : {payload.get('save_dir')}")
    print(f" ⚡ Chế độ thực thi : {'HTTP API Server (' + clean_base + ')' if (online and not force_in_process) else 'In-Process (Trực tiếp)'}")
    print("=" * 70 + "\n")

    start_time = time.time()

    # 1. Chế độ chạy qua HTTP API Server
    if online and not force_in_process:
        ws_monitor = None
        current_loop = asyncio.get_running_loop()
        if enable_ws:
            ws_monitor = WebSocketProgressMonitor(clean_base, op_id)
            ws_monitor.start(current_loop)

        try:
            url = f"{clean_base}/api/hongguo/dubbing"
            # Sử dụng run_in_executor để POST requests không block event loop WebSocket
            logger.info("Đang gửi yêu cầu tới POST /api/hongguo/dubbing...")
            response = await current_loop.run_in_executor(
                None,
                lambda: requests.post(url, json=payload, timeout=7200) # Cho phép chạy tối đa 2 giờ
            )

            if response.status_code != 200:
                err_text = response.text
                try:
                    err_json = response.json()
                    err_text = err_json.get("detail") or err_text
                except Exception:
                    pass
                raise RuntimeError(f"Server trả về lỗi ({response.status_code}): {err_text}")

            result = response.json()
            return result
        finally:
            if ws_monitor:
                await ws_monitor.stop()

    # 2. Chế độ In-Process (Fallback khi không chạy server)
    else:
        logger.info("Thực thi trực tiếp trong process bằng router handler...")
        from starlette.testclient import TestClient
        from backend.main import app
        
        current_loop = asyncio.get_running_loop()
        
        def _call_test_client():
            with TestClient(app) as client:
                res = client.post("/api/hongguo/dubbing", json=payload)
                if res.status_code != 200:
                    raise RuntimeError(f"Lỗi In-Process ({res.status_code}): {res.text}")
                return res.json()

        result = await current_loop.run_in_executor(None, _call_test_client)
        return result


def print_dubbing_result(result: Dict[str, Any], elapsed: float) -> None:
    """In kết quả hoàn tất dubbing ra màn hình."""
    print("\n" + "=" * 70)
    print("🎉  QUY TRÌNH LỒNG TIẾNG ĐÃ HOÀN TẤT THÀNH CÔNG!")
    print("=" * 70)
    print(f" ⏱️  Tổng thời gian xử lý: {elapsed:.2f} giây ({format_duration(elapsed)})")
    print(f" 📺 Tổng số tập đã ghép : {result.get('total_episodes', 0)} tập")
    print(f" 📊 Số câu phụ đề/dịch  : {result.get('segments_count', 0)} câu")
    print(f" ⏳ Thời lượng video     : {format_duration(result.get('duration', 0.0))}")
    print("-" * 70)
    print(f" 📁 Video lồng tiếng     : {result.get('output_file')}")
    out_size = result.get("output_size_bytes", 0)
    if out_size:
        print(f" 💾 Dung lượng file xuất: {format_size(out_size)}")
    if result.get("stream_copy_video"):
        print(f" 🎞️ Video gốc stream copy: {result.get('stream_copy_video')}")
    print("-" * 70)
    print(" ☁️  LIÊN KẾT TẢI VỀ (STORAGE.TO):")
    if result.get("dubbed_video_url"):
        print(f"    • Video lồng tiếng    : {result.get('dubbed_video_url')}")
    if result.get("concat_video_storage_url"):
        print(f"    • Video gốc stream copy: {result.get('concat_video_storage_url')}")
    if result.get("original_srt_url"):
        print(f"    • Phụ đề gốc (SRT)   : {result.get('original_srt_url')}")
    if result.get("translated_srt_url"):
        print(f"    • Phụ đề dịch (SRT)  : {result.get('translated_srt_url')}")
    print("=" * 70 + "\n")


# ---------------------------------------------------------------------------
# Xử lý Ngắt Ctrl+C
# ---------------------------------------------------------------------------

def handle_sigint(signum, frame):
    """Bắt phím Ctrl+C để hủy tải và thoát an toàn."""
    print("\n\n⚠️  ĐÃ NHẬN TÍN HIỆU DỪNG (Ctrl+C)...")
    if _active_op_id and _active_api_base:
        print(f"Đang gửi tín hiệu hủy tác vụ {_active_op_id}...")
        cancel_hongguo_task(_active_api_base, _active_op_id)
        print("✓ Đã gửi yêu cầu dừng các luồng tải.")
    sys.exit(0)


# ---------------------------------------------------------------------------
# CLI Argument Parser & Main
# ---------------------------------------------------------------------------

def build_cli_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="🚀 HongGuo Dubbing Pipeline Runner & Settings Manager",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ví dụ sử dụng:
  # 1. Xem cấu hình hiện hành
  python run_hongguo_pipeline.py --show-settings

  # 2. Cập nhật 4 tham số cấu hình cốt lõi (Endpoint, Key, Model, CapCut TDID)
  python run_hongguo_pipeline.py --only-settings \\
      --custom-endpoint "http://localhost:20128/v1" \\
      --custom-key "sk-xxx" \\
      --custom-model "gemini-3.8-flash" \\
      --capcut-tdid "77e6e7f6-fc91-439a-87af-d8e8b1504aad"

  # 3. Xem chi tiết phim và danh sách tập
  python run_hongguo_pipeline.py --series-id 74123456789 --detail-only

  # 4. Tải & lồng tiếng tập 1 đến 3 của phim, dùng giọng Ngọc Huyền và model tùy chỉnh
  python run_hongguo_pipeline.py --series-id 74123456789 --range 1-3 \\
      --custom-model "gemini-lite" --voice "Ngọc Huyền" --tts-speed 1.0

  # 5. Lồng tiếng toàn bộ phim với 5 luồng tải
  python run_hongguo_pipeline.py --series-id "https://hongguo.example.com?series_id=74123456789" \\
      --range all --max-workers 5
        """
    )

    # Server config
    server_group = parser.add_argument_group("Cấu hình Kết nối Server")
    server_group.add_argument(
        "--api-base",
        default="http://127.0.0.1:8000",
        help="Địa chỉ API server backend (mặc định: http://127.0.0.1:8000)",
    )
    server_group.add_argument(
        "--in-process",
        action="store_true",
        help="Bắt buộc thực thi In-Process không qua mạng HTTP",
    )
    server_group.add_argument(
        "--no-ws",
        action="store_true",
        help="Tắt hiển thị log tiến trình qua WebSocket",
    )

    # Settings config
    settings_group = parser.add_argument_group("Cấu hình Settings (backend/router/settings.py)")
    settings_group.add_argument(
        "--show-settings",
        action="store_true",
        help="Hiển thị thông tin cài đặt hiện tại rồi thoát",
    )
    settings_group.add_argument(
        "--only-settings",
        action="store_true",
        help="Chỉ cập nhật cài đặt rồi thoát, không chạy dubbing",
    )
    settings_group.add_argument(
        "--custom-endpoint",
        default=None,
        help="Cập nhật customApiEndpoint (URL OpenAI compatible, vd: http://localhost:20128/v1)",
    )
    settings_group.add_argument(
        "--custom-key",
        default=None,
        help="Cập nhật customApiKey (API Key dịch thuật)",
    )
    settings_group.add_argument(
        "--custom-model",
        default=None,
        help="Cập nhật customModel (Model AI dịch thuật, vd: gemini-lite, gemini-3.8-flash)",
    )
    settings_group.add_argument(
        "--capcut-tdid",
        default=None,
        help="Cập nhật capcutTdid (Device ID nhận diện giọng nói CapCut ASR)",
    )

    # HongGuo drama options
    hg_group = parser.add_argument_group("Tùy chọn Phim Hồng Quả (HongGuo Drama)")
    hg_group.add_argument(
        "--series-id", "-s",
        default=None,
        help="ID bộ phim (series_id) hoặc URL chứa series_id",
    )
    hg_group.add_argument(
        "--range", "-r", "--episode-range",
        dest="episode_range",
        default=None,
        help="Khoảng tập muốn tải & lồng tiếng (vd: '1-3', '1,5,7', 'all')",
    )
    hg_group.add_argument(
        "--title", "--series-title",
        dest="series_title",
        default=None,
        help="Tên phim tùy chỉnh (dùng để đặt thư mục lưu)",
    )
    hg_group.add_argument(
        "--save-dir",
        default=None,
        help="Đường dẫn thư mục lưu file tải về & thành phẩm",
    )
    hg_group.add_argument(
        "--max-workers",
        type=int,
        default=3,
        help="Số luồng tải video song song (1-10, mặc định: 3)",
    )
    hg_group.add_argument(
        "--detail-only",
        action="store_true",
        help="Chỉ lấy thông tin chi tiết phim và danh sách tập rồi thoát",
    )
    hg_group.add_argument(
        "--no-cache",
        action="store_true",
        help="Bỏ qua cache khi lấy thông tin chi tiết phim",
    )

    # Dubbing Pipeline options
    dub_group = parser.add_argument_group("Tùy chọn Lồng tiếng (Dubbing Pipeline)")
    dub_group.add_argument(
        "--transcribe-engine", "--asr",
        dest="transcribe_engine",
        default="capcut",
        choices=["capcut", "bcut", "groq", "auto"],
        help="Engine nhận dạng giọng nói ASR (mặc định: capcut)",
    )
    dub_group.add_argument(
        "--source-lang",
        default="auto",
        help="Ngôn ngữ nguồn video (mặc định: auto)",
    )
    dub_group.add_argument(
        "--target-lang",
        default="vi",
        help="Ngôn ngữ dịch thuật (mặc định: vi)",
    )
    dub_group.add_argument(
        "--provider",
        default="custom",
        choices=["custom", "deepseek", "ezmax"],
        help="Nhà cung cấp dịch thuật (mặc định: custom)",
    )
    dub_group.add_argument(
        "--model",
        default=None,
        help="Model LLM dịch thuật lượt này (nếu không truyền sẽ lấy theo settings.customModel)",
    )
    dub_group.add_argument(
        "--preset",
        default="default",
        help="Preset prompt dịch thuật (mặc định: default)",
    )
    dub_group.add_argument(
        "--voice", "--voice-id",
        dest="voice_id",
        default="Ngọc Huyền",
        help="Tên giọng đọc VieNeu-TTS (mặc định: 'Ngọc Huyền')",
    )
    dub_group.add_argument(
        "--tts-speed",
        type=float,
        default=1.0,
        help="Tốc độ giọng đọc TTS (mặc định: 1.0)",
    )
    dub_group.add_argument(
        "--voice-rate",
        type=float,
        default=1.0,
        help="Tỉ lệ tốc độ giọng đọc chung (mặc định: 1.0)",
    )
    dub_group.add_argument(
        "--fit-mode",
        default="natural_flow",
        choices=["natural_flow", "speed_up_tts", "stretch_video", "speed_voice", "fixed"],
        help="Chế độ khớp nhịp thời gian (mặc định: natural_flow)",
    )
    dub_group.add_argument(
        "--parallel-jobs",
        type=int,
        default=6,
        help="Số luồng dịch thuật song song (mặc định: 6)",
    )
    dub_group.add_argument(
        "--output-filename",
        default=None,
        help="Tên file video lồng tiếng xuất ra (mặc định: tự sinh)",
    )

    return parser


async def main_async():
    # Đăng ký bắt tín hiệu Ctrl+C
    signal.signal(signal.SIGINT, handle_sigint)

    parser = build_cli_parser()
    args = parser.parse_args()

    api_base = args.api_base.rstrip("/")
    force_in_process = args.in_process

    # 1. Cập nhật Settings nếu có truyền tham số
    has_settings_to_update = any([
        args.custom_endpoint is not None,
        args.custom_key is not None,
        args.custom_model is not None,
        args.capcut_tdid is not None,
    ])

    if has_settings_to_update:
        print("\n🔧 Đang cập nhật các thông số cài đặt hệ thống...")
        current_settings = update_pipeline_settings(
            api_base=api_base,
            custom_endpoint=args.custom_endpoint,
            custom_key=args.custom_key,
            custom_model=args.custom_model,
            capcut_tdid=args.capcut_tdid,
            force_direct=force_in_process,
        )
        print_settings_summary(current_settings)
        if args.only_settings:
            return

    # 2. Hiển thị Settings và thoát nếu có cờ --show-settings
    if args.show_settings:
        current_settings = get_pipeline_settings(api_base=api_base, force_direct=force_in_process)
        print_settings_summary(current_settings)
        if not args.series_id:
            return

    # Nếu chỉ cập nhật settings mà không truyền series_id
    if not args.series_id:
        if has_settings_to_update or args.show_settings:
            return
        # Nếu chạy không tham số, hiển thị hướng dẫn
        current_settings = get_pipeline_settings(api_base=api_base, force_direct=force_in_process)
        print_settings_summary(current_settings)
        print("💡 Vui lòng cung cấp --series-id để thực hiện tra cứu hoặc lồng tiếng phim Hồng Quả.")
        print("   Ví dụ: python run_hongguo_pipeline.py --series-id 74123456789 --range 1-3\n")
        return

    series_id = extract_series_id(args.series_id)
    if not series_id:
        logger.error(f"❌ Series ID không hợp lệ: {args.series_id}")
        sys.exit(1)

    # 3. Tra cứu thông tin phim
    print(f"🔍 Đang truy vấn chi tiết phim series_id={series_id}...")
    try:
        detail = get_hongguo_detail(
            api_base=api_base,
            series_id=series_id,
            no_cache=args.no_cache,
            force_direct=force_in_process,
        )
        print_hongguo_detail(detail)
    except Exception as exc:
        logger.error(f"❌ Không thể truy vấn thông tin phim: {exc}")
        if args.detail_only:
            sys.exit(1)
        detail = {}

    if args.detail_only:
        return

    # Xác định tiêu đề phim
    series_title = args.series_title or detail.get("title") or detail.get("name") or ""

    # 4. Chuẩn bị payload lồng tiếng
    episode_range = args.episode_range or "1-3" # Mặc định 1-3 nếu không chọn

    # Ưu tiên model truyền qua CLI, nếu không lấy từ custom_model vừa set hoặc trong settings
    actual_model = args.model or args.custom_model
    if not actual_model:
        st = get_pipeline_settings(api_base=api_base, force_direct=force_in_process)
        actual_model = st.get("customModel")

    payload: Dict[str, Any] = {
        "series_id": series_id,
        "series_title": series_title,
        "episode_range": episode_range,
        "max_workers": max(1, min(args.max_workers, 10)),
        "save_dir": args.save_dir,
        "transcribe_engine": args.transcribe_engine,
        "source_lang": args.source_lang,
        "target_lang": args.target_lang,
        "provider": args.provider,
        "model": actual_model,
        "preset": args.preset,
        "voice_id": args.voice_id,
        "tts_speed": args.tts_speed,
        "voice_rate": args.voice_rate,
        "fit_mode": args.fit_mode,
        "parallel_jobs": args.parallel_jobs,
        "output_filename": args.output_filename,
    }

    start_time = time.time()
    try:
        result = await run_hongguo_dubbing_async(
            api_base=api_base,
            payload=payload,
            enable_ws=not args.no_ws,
            force_in_process=force_in_process,
        )
        elapsed = time.time() - start_time
        if result.get("cancelled"):
            print("\n⚠️  Tác vụ lồng tiếng đã bị tạm dừng/hủy bỏ.")
        elif result.get("success"):
            print_dubbing_result(result, elapsed)
        else:
            print(f"\n❌ Lồng tiếng thất bại: {result.get('error') or result}")
    except Exception as exc:
        elapsed = time.time() - start_time
        logger.error(f"❌ Lỗi khi thực thi lồng tiếng ({elapsed:.1f}s): {exc}", exc_info=True)
        sys.exit(1)


def main():
    try:
        asyncio.run(main_async())
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
