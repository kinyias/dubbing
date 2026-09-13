"""
Script kiểm thử Pipeline lồng tiếng video tự động (End-to-End Dubbing Pipeline)
Thực thi toàn bộ quy trình:
Nhận video -> Transcribe video -> Translate segments -> Generate TTS batch -> Compute timing plan -> Export video
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Any, Dict

# Thiết lập encoding UTF-8 cho console Windows
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run_pipeline")

# Import trực tiếp hàm xử lý pipeline từ router
from router.pipeline import api_run_dubbing_pipeline, probe_video_metadata
from service.setting import load_transcript_settings


def format_duration(seconds: float) -> str:
    """Định dạng số giây sang định dạng mm:ss."""
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m:02d}:{s:02d} ({seconds:.2f}s)"


def format_size(bytes_count: int) -> str:
    """Định dạng số byte sang KB/MB."""
    if bytes_count < 1024:
        return f"{bytes_count} B"
    elif bytes_count < 1024 * 1024:
        return f"{bytes_count / 1024:.2f} KB"
    else:
        return f"{bytes_count / (1024 * 1024):.2f} MB"


async def main_async(args: argparse.Namespace) -> None:
    video_path = os.path.abspath(args.video)
    output_path = os.path.abspath(args.output) if args.output else None

    print("\n" + "=" * 75)
    print("🎬  BẮT ĐẦU KIỂM THỬ END-TO-END DUBBING PIPELINE")
    print("=" * 75)

    if not os.path.exists(video_path):
        logger.error(f"❌ Không tìm thấy video nguồn tại: {video_path}")
        sys.exit(1)

    # Đọc settings
    settings = load_transcript_settings()
    ffmpeg_bin = settings.get("ffmpegPath") or "ffmpeg"

    # Lấy thông tin video nguồn
    meta = probe_video_metadata(video_path, ffmpeg_bin)
    duration = meta.get("duration", 0.0)
    width = meta.get("width", 0)
    height = meta.get("height", 0)
    fps = meta.get("fps", 30.0)
    file_size = os.path.getsize(video_path)

    # Tự sinh tên file xuất nếu chưa truyền
    if not output_path:
        v_stem = Path(video_path).stem
        v_dir = Path(video_path).parent
        output_path = str(v_dir / f"{v_stem}_dubbed.mp4")

    print(f"📁 Video nguồn:    {video_path}")
    print(f"💾 Dung lượng:     {format_size(file_size)}")
    print(f"⏱️  Thời lượng:     {format_duration(duration)}")
    print(f"📐 Độ phân giải:   {width}x{height} @ {fps:.2f} fps")
    print(f"🎯 File xuất:      {output_path}")
    print("-" * 75)
    print(f"⚙️  Ngôn ngữ:       {args.source_lang} ➔ {args.target_lang}")
    print(f"🎙️  Engine ASR:     {args.transcribe_engine}")
    print(f"🤖 Model Dịch:     {args.model or settings.get('customModel') or settings.get('deepseekModel')}")
    print(f"🔊 Giọng đọc TTS:  {args.voice}")
    print(f"⚡ Tốc độ TTS:     {args.tts_speed}x")
    print(f"📐 Chế độ khớp:    {args.fit_mode}")
    print(f"📝 Burn phụ đề:    {'Bật' if args.burn_subtitles else 'Tắt'}")
    print("=" * 75 + "\n")

    # Đóng gói payload gửi tới pipeline
    payload: Dict[str, Any] = {
        "videoPath": video_path,
        "outputFilePath": output_path,
        "sourceLang": args.source_lang,
        "targetLang": args.target_lang,
        "transcribeEngine": args.transcribe_engine,
        "voiceId": args.voice,
        "ttsSpeed": args.tts_speed,
        "fitMode": args.fit_mode,
        "videoVolume": args.video_volume,
        "ttsVolume": args.tts_volume,
        "burnSubtitles": args.burn_subtitles,
        "allowInfeasible": args.allow_infeasible,
    }

    if args.model:
        payload["model"] = args.model
    if args.provider:
        payload["provider"] = args.provider

    start_time = time.time()

    try:
        # Thực thi pipeline trực tiếp qua hàm handler
        result = await api_run_dubbing_pipeline(payload)
        elapsed = time.time() - start_time

        print("\n" + "=" * 75)
        print("🎉  PIPELINE ĐÃ HOÀN TẤT THÀNH CÔNG!")
        print("=" * 75)
        print(f"⏱️  Tổng thời gian xử lý:  {elapsed:.2f} giây ({format_duration(elapsed)})")
        print(f"📁 Video xuất thành công:   {result.get('outputFilePath')}")

        final_out = result.get("outputFilePath", "")
        if os.path.exists(final_out):
            out_size = os.path.getsize(final_out)
            print(f"💾 Dung lượng video xuất:  {format_size(out_size)}")

        print(f"📊 Số câu phụ đề/lồng tiếng: {result.get('segmentsCount', 0)}")

        tp = result.get("timingPlan") or {}
        feasible = tp.get("feasible")
        units_count = len(tp.get("units") or [])
        clusters_count = len(tp.get("clusters") or [])
        print(f"🧩 Kế hoạch Timing Plan:    Feasible={feasible}, Units={units_count}, Clusters={clusters_count}")

        # In danh sách một vài câu dịch đầu tiên làm mẫu
        segments = result.get("segments") or []
        if segments:
            print("\n" + "-" * 75)
            print("📝 MẪU PHÂN ĐOẠN ĐÃ DỊCH & LỒNG TIẾNG (Tối đa 5 câu đầu):")
            print("-" * 75)
            for idx, s in enumerate(segments[:5]):
                st = float(s.get("startTime", 0.0))
                et = float(s.get("endTime", 0.0))
                orig = s.get("text", "").strip()
                trans = s.get("translation", "").strip()
                dur = float(s.get("audioDuration") or 0.0)
                print(f" [{idx + 1:02d}] {st:.2f}s -> {et:.2f}s (TTS: {dur:.2f}s)")
                print(f"      Gốc:  {orig}")
                print(f"      Dịch: {trans}")
            if len(segments) > 5:
                print(f"      ... và {len(segments) - 5} câu tiếp theo.")
            print("-" * 75)

        print("\n✅ Video đã sẵn sàng để xem thử tại:")
        print(f"   {final_out}\n")

    except Exception as e:
        elapsed = time.time() - start_time
        logger.error(f"❌ Thất bại sau {elapsed:.2f}s: {e}", exc_info=True)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Test End-to-End Dubbing Pipeline")
    parser.add_argument(
        "--video",
        default=r"",
        help="Đường dẫn đến file video nguồn",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Đường dẫn file video đầu ra (mặc định: cùng thư mục kèm hậu tố _dubbed.mp4)",
    )
    parser.add_argument(
        "--source-lang",
        default="auto",
        help="Ngôn ngữ nguồn video (mặc định: auto)",
    )
    parser.add_argument(
        "--target-lang",
        default="vi",
        help="Ngôn ngữ đích (mặc định: vi)",
    )
    parser.add_argument(
        "--transcribe-engine",
        default="capcut",
        help="Engine ASR nhận diện giọng: capcut, bcut, groq, auto (mặc định: capcut)",
    )
    parser.add_argument(
        "--voice",
        default="vieneu:Ngọc Huyền",
        help="Giọng đọc VieNeu-TTS (mặc định: vieneu:Ngọc Huyền)",
    )
    parser.add_argument(
        "--tts-speed",
        type=float,
        default=1.0,
        help="Tốc độ giọng đọc TTS (mặc định: 1.0)",
    )
    parser.add_argument(
        "--fit-mode",
        default="natural_flow",
        help="Chế độ khớp thời gian: natural_flow, stretch_video, speed_voice, fixed",
    )
    parser.add_argument(
        "--video-volume",
        type=float,
        default=0.1,
        help="Âm lượng video gốc (mặc định: 0.1)",
    )
    parser.add_argument(
        "--tts-volume",
        type=float,
        default=3.0,
        help="Âm lượng lồng tiếng TTS (mặc định: 3.0)",
    )
    parser.add_argument(
        "--burn-subtitles",
        action="store_true",
        default=True,
        help="Burn phụ đề vào video (mặc định: True)",
    )
    parser.add_argument(
        "--no-burn-subtitles",
        dest="burn_subtitles",
        action="store_false",
        help="Không burn phụ đề",
    )
    parser.add_argument(
        "--allow-infeasible",
        action="store_true",
        default=True,
        help="Cho phép xuất ngay cả khi câu nói hơi dài so với khung hình",
    )
    parser.add_argument(
        "--model",
        default=None,
        help="Model dịch thuật LLM (mặc định: lấy từ settings)",
    )
    parser.add_argument(
        "--provider",
        default=None,
        help="Provider dịch thuật: custom, deepseek, ezmax",
    )

    args = parser.parse_args()
    asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
