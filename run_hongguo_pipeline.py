# -*- coding: utf-8 -*-
"""
HongGuo Dubbing Pipeline Runner & Settings Manager (Direct Execution)
Thực thi quy trình lồng tiếng phim Hồng Quả (HongGuo Short Drama) TRỰC TIẾP trong Python:
- KHÔNG CẦN CHẠY SERVER BACKEND (tiết kiệm CPU, RAM và tránh lỗi mạng / port).
- Quản lý / cập nhật cấu hình hệ thống settings.json (customApiEndpoint, customApiKey, customModel, capcutTdid).
- Tra cứu chi tiết phim Hồng Quả (tiêu đề, ảnh bìa, danh sách tập).
- Thực thi toàn trình: Tải video -> Đồng bộ format -> Ghép Stream Copy -> Lồng tiếng (ASR -> AI Translate -> VieNeu TTS -> Timing Plan -> Mix & Mux).
- Lắng nghe tiến trình thời gian thực trực tiếp qua event callback và hỗ trợ ngắt Ctrl+C an toàn.
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

# Thiết lập encoding UTF-8 cho Windows console
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đảm bảo nạp BASE_DIR và BACKEND_DIR vào sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Cấu hình logging: ẩn log chi tiết, chỉ hiển thị cảnh báo và tiến trình process
logging.basicConfig(
    level=logging.WARNING,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run_hongguo_pipeline")

# Nạp các core service & router từ backend
from backend.core.ws_manager import ws_manager
from backend.router.hongguo import (
    batch_download_and_dubbing_hongguo,
    cancel_hongguo_download,
    DubbingBatchRequest,
)
from backend.service.detail_video_hongguo import get_series_detail
from backend.service.setting import (
    load_transcript_settings,
    patch_transcript_settings,
    get_setting,
)

# Biến toàn cục để xử lý ngắt Ctrl+C
_active_op_id: Optional[str] = None


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
    if "?" in sid:
        sid = sid.split("?")[0]
    return sid.strip("/ ")


# ---------------------------------------------------------------------------
# Quản lý Cấu hình Settings (backend/service/setting.py & settings.json)
# ---------------------------------------------------------------------------

def get_pipeline_settings(key: Optional[str] = None) -> Dict[str, Any]:
    """
    Lấy cấu hình hiện tại trực tiếp từ settings.json (không cần server).
    """
    try:
        if key:
            return {key: get_setting(key)}
        return load_transcript_settings()
    except Exception as exc:
        logger.error(f"Lỗi khi đọc cấu hình settings: {exc}")
        return {}


def update_pipeline_settings(
    custom_endpoint: Optional[str] = None,
    custom_key: Optional[str] = None,
    custom_model: Optional[str] = None,
    capcut_tdid: Optional[str] = None,
    extra_settings: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """
    Cập nhật cài đặt hệ thống trực tiếp vào settings.json:
    - customApiEndpoint
    - customApiKey
    - customModel
    - capcutTdid
    """
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
        return get_pipeline_settings()

    try:
        updated = patch_transcript_settings(patches=patches)
        logger.info("✓ Đã cập nhật thành công cấu hình vào settings.json.")
        return updated
    except Exception as exc:
        logger.error(f"Lỗi khi cập nhật settings: {exc}")
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
# Chi tiết phim Hồng Quả (Trực tiếp từ service)
# ---------------------------------------------------------------------------

def get_hongguo_detail(
    series_id: str = "",
    no_cache: bool = False,
) -> Dict[str, Any]:
    """Lấy thông tin chi tiết phim, tổng số tập và danh sách tập phim."""
    sid = extract_series_id(series_id)
    if not sid:
        raise ValueError("series_id không hợp lệ hoặc đang để trống")

    try:
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
# Chạy Dubbing Pipeline Trực Tiếp (In-Process)
# ---------------------------------------------------------------------------

async def run_hongguo_dubbing_direct(
    req: DubbingBatchRequest,
    enable_live_logs: bool = True,
) -> Dict[str, Any]:
    """
    Thực thi toàn bộ quy trình lồng tiếng trực tiếp trong process hiện hành:
    - Tiết kiệm bộ nhớ, CPU, không cần uvicorn hay cổng mạng.
    - Lắng nghe sự kiện tiến độ qua local listener của ws_manager.
    """
    global _active_op_id
    op_id = req.op_id or f"hg-dubbing-cli-{uuid.uuid4().hex[:8]}"
    req.op_id = op_id
    _active_op_id = op_id

    # Đăng ký listener nhận sự kiện tiến trình trực tiếp từ ws_manager
    def _on_ws_event(data: dict):
        if not isinstance(data, dict):
            return
        msg_op = data.get("opId") or data.get("op_id")
        if msg_op and msg_op != op_id:
            return

        msg_type = data.get("type")
        # Chỉ hiển thị tiến trình xử lý (process / progress)
        if msg_type in ("progress", "export_progress"):
            stage = data.get("stage", "")
            pct = data.get("pct", data.get("percent", 0.0))
            message = data.get("message", "")
            done = data.get("done")
            total = data.get("total")

            # Tự động bổ sung thông tin số lượng đã làm và số lượng còn lại nếu message chưa có
            if done is not None and total is not None and total > 0 and "còn" not in message:
                remaining = max(0, total - done)
                if stage == "tts":
                    message = f"Đang tạo TTS: {done}/{total} câu (còn {remaining} câu chưa tạo) - {pct:.0f}%"
                elif stage == "translate":
                    message = f"Đang dịch AI: {done}/{total} câu (còn {remaining} câu chưa dịch) - {pct:.0f}%"
                elif stage in ("downloading", "hongguo_download"):
                    message = f"Đang tải video: {done}/{total} tập (còn {remaining} tập chưa tải)"

            if message:
                print(f" ⏳ [{pct:5.1f}%] [{stage}] {message}")

    if enable_live_logs:
        ws_manager.add_listener(_on_ws_event)

    print("\n" + "=" * 70)
    print("🚀  BẮT ĐẦU PIPELINE LỒNG TIẾNG HỒNG QUẢ (DIRECT IN-PROCESS)")
    print("=" * 70)
    print(f" 🆔 Operation ID    : {op_id}")
    print(f" 🎞️ Series ID       : {req.series_id}")
    if req.series_title:
        print(f" 🏷️ Tên phim        : {req.series_title}")
    print(f" 🔢 Khoảng tập      : {req.episode_range or 'all'}")
    print(f" 🧵 Luồng tải video : {req.max_workers}")
    print(f" 🎙️ Engine ASR      : {req.transcribe_engine}")
    print(f" 🌐 Ngôn ngữ        : {req.source_lang} ➔ {req.target_lang}")
    print(f" 🤖 LLM Provider    : {req.provider} (Model: {req.model or 'theo settings'})")
    print(f" 🔊 Giọng đọc VieNeu: {req.voice_id} @ {req.tts_speed}x")
    print(f" 📐 Chế độ khớp nhịp: {req.fit_mode}")
    if req.save_dir:
        print(f" 📂 Thư mục lưu     : {req.save_dir}")
    print(" ⚡ Phương thức     : Chạy trực tiếp (Không tốn tài nguyên chạy server)")
    print("=" * 70 + "\n")

    try:
        # Gọi trực tiếp router handler
        result = await batch_download_and_dubbing_hongguo(req, request=None)
        return result
    finally:
        if enable_live_logs:
            ws_manager.remove_listener(_on_ws_event)


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
    """Bắt phím Ctrl+C để hủy tải an toàn."""
    print("\n\n⚠️  ĐÃ NHẬN TÍN HIỆU DỪNG (Ctrl+C)...")
    if _active_op_id:
        print(f"Đang dừng tác vụ {_active_op_id}...")
        cancel_hongguo_download(_active_op_id)
        print("✓ Đã gửi yêu cầu dừng các luồng tải.")
    sys.exit(0)


# ---------------------------------------------------------------------------
# CLI Argument Parser & Main
# ---------------------------------------------------------------------------

def build_cli_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="🚀 HongGuo Dubbing Pipeline Runner & Settings Manager (Direct Execution)",
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

  # 4. Tải & lồng tiếng tập 1 đến 3 của phim, dùng giọng Ngọc Huyền
  python run_hongguo_pipeline.py --series-id 74123456789 --range 1-3 \\
      --custom-model "gemini-lite" --voice "Ngọc Huyền" --tts-speed 1.0

  # 5. Lồng tiếng toàn bộ phim với 5 luồng tải
  python run_hongguo_pipeline.py --series-id "https://hongguo.example.com?series_id=74123456789" \\
      --range all --max-workers 5
        """
    )

    # Settings config
    settings_group = parser.add_argument_group("Cấu hình Settings (settings.json)")
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
    dub_group.add_argument(
        "--no-live-log",
        action="store_true",
        help="Tắt hiển thị log tiến trình trực tiếp",
    )

    return parser


async def main_async():
    # Đăng ký bắt phím Ctrl+C
    signal.signal(signal.SIGINT, handle_sigint)

    # Đăng ký event loop với ws_manager để các tác vụ ngầm hoạt động đồng bộ
    ws_manager.set_loop(asyncio.get_running_loop())

    parser = build_cli_parser()
    args = parser.parse_args()

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
            custom_endpoint=args.custom_endpoint,
            custom_key=args.custom_key,
            custom_model=args.custom_model,
            capcut_tdid=args.capcut_tdid,
        )
        print_settings_summary(current_settings)
        if args.only_settings:
            return

    # 2. Hiển thị Settings và thoát nếu có cờ --show-settings
    if args.show_settings:
        current_settings = get_pipeline_settings()
        print_settings_summary(current_settings)
        if not args.series_id:
            return

    # Nếu chỉ cập nhật settings mà không truyền series_id
    if not args.series_id:
        if has_settings_to_update or args.show_settings:
            return
        # Nếu chạy không tham số, hiển thị hướng dẫn
        current_settings = get_pipeline_settings()
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
            series_id=series_id,
            no_cache=args.no_cache,
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

    # 4. Chuẩn bị request lồng tiếng
    episode_range = args.episode_range or "1-3"

    # Ưu tiên model truyền qua CLI, nếu không lấy từ custom_model vừa set hoặc trong settings
    actual_model = args.model or args.custom_model
    if not actual_model:
        st = get_pipeline_settings()
        actual_model = st.get("customModel")

    req = DubbingBatchRequest(
        series_id=series_id,
        series_title=series_title,
        episode_range=episode_range,
        max_workers=max(1, min(args.max_workers, 10)),
        save_dir=args.save_dir,
        transcribe_engine=args.transcribe_engine,
        source_lang=args.source_lang,
        target_lang=args.target_lang,
        provider=args.provider,
        model=actual_model,
        preset=args.preset,
        voice_id=args.voice_id,
        tts_speed=args.tts_speed,
        voice_rate=args.voice_rate,
        fit_mode=args.fit_mode,
        parallel_jobs=args.parallel_jobs,
        output_filename=args.output_filename,
    )

    start_time = time.time()
    try:
        result = await run_hongguo_dubbing_direct(
            req=req,
            enable_live_logs=not args.no_live_log,
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
