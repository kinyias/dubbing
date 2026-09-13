"""
Main Application Server — Transcription API
Chạy API Server trên cổng 8000, nạp router từ transcribe_video.py.
Tương thích hoàn toàn với FastAPI và sẵn sàng phục vụ các request phiên âm (ASR).
"""

from __future__ import annotations

import logging
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Nạp router xử lý phiên âm, dịch thuật, TTS và tính toán timing plan
from router.compute_time_plan import router as timing_router
from router.transcribe_video import router as transcript_router
from router.translate_segments import router as translate_router
from router.tts_engines import router as tts_router

# Thiết lập encoding cho console Windows
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("main")

app = FastAPI(
    title="Video Transcription, Translation & TTS API",
    description="API Server nhận dạng giọng nói, dịch thuật và tổng hợp giọng nói VieNeu-TTS",
    version="1.0.0",
)

# Cấu hình CORS để frontend hoặc curl gọi tự do
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các router từ transcribe_video.py, translate_segments.py, tts_engines.py và compute_time_plan.py
app.include_router(transcript_router)
app.include_router(translate_router)
app.include_router(tts_router)
app.include_router(timing_router)


@app.get("/")
async def health_check():
    return {
        "status": "online",
        "message": "Transcription, Translation, TTS & Timing Plan API is running.",
        "endpoints": [
            "/api/transcript/transcribe-video",
            "/api/transcript/cancel-transcribe",
            "/api/transcript/translate-segments",
            "/api/transcript/cancel-translate",
            "/api/transcript/fetch-translate-models",
            "/api/transcript/generate-tts-batch",
            "/api/transcript/cancel-tts-batch",
            "/api/transcript/generate-tts",
            "/api/transcript/vieneu-voices",
            "/api/transcript/compute-timing-plan",
            "/api/transcript/verify-dubbing-fit",
        ],
    }


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Video Transcription & TTS API Server")
    parser.add_argument("--host", default="127.0.0.1", help="Địa chỉ host (mặc định: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Cổng chạy server (mặc định: 8000)")
    args = parser.parse_args()

    logger.info(f"Khởi động API Server tại http://{args.host}:{args.port} ...")
    uvicorn.run(app, host=args.host, port=args.port, log_level="info")
