"""
Main Application Server — Transcription API
Chạy API Server trên cổng 8000, nạp router từ transcribe_video.py.
Tương thích hoàn toàn với FastAPI và sẵn sàng phục vụ các request phiên âm (ASR).
"""

from __future__ import annotations

import logging
import os
import sys

# Thiết lập encoding cho console Windows
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đảm bảo đường dẫn backend và thư mục gốc project được nạp vào sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

# Nạp router xử lý phiên âm, dịch thuật, TTS, timing plan, xuất video, stream file và pipeline toàn trình
from router.compute_time_plan import router as timing_router
from router.export import router as export_router
from router.pipeline import router as pipeline_router
from router.settings import router as settings_router
from router.transcribe_video import router as transcript_router
from router.transcript import router as dialog_ws_router
from router.translate_segments import router as translate_router
from router.tts_engines import router as tts_router

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

# Đăng ký các router từ transcribe_video.py, translate_segments.py, tts_engines.py, compute_time_plan.py, export.py, pipeline.py và streamfile.py
app.include_router(transcript_router)
app.include_router(dialog_ws_router)
app.include_router(settings_router)
app.include_router(translate_router)
app.include_router(tts_router)
app.include_router(timing_router)
app.include_router(export_router)
app.include_router(pipeline_router)

# -------------------------------------------------------------
# Các API bổ trợ cho Frontend UI (Branding, Account, Health,...)
# -------------------------------------------------------------
@app.get("/health")
async def health_check_endpoint():
    return {"status": "ok", "message": "Backend & Frontend server is healthy."}

@app.get("/api/version")
async def get_version():
    return {"version": "1.0.0"}

@app.get("/api/branding")
async def get_branding():
    return {
        "meta_title": "ezmaxsub",
        "meta_description": "Ứng dụng tạo câu trạng thái và chuyển đổi giọng nói chất lượng cao sử dụng trí tuệ nhân tạo.",
        "name_prefix": "ezmax",
        "name_suffix": "sub",
        "slogan": "AI Subtitle & Dubbing Studio",
        "logo_icon": "fa-solid fa-microphone",
    }

@app.get("/api/account")
async def get_account():
    return {
        "plan": "pro",
        "plan_name": "Pro VIP",
        "expires_at": None,
        "machine_id": "LOCAL-HOST",
        "machine_short": "LOCAL-HOST",
        "export_policy": {
            "tier": "pro",
            "max_output_duration_sec": 86400,
            "max_project_duration_sec": 86400,
            "watermark_profile": None,
            "subtitle_export_allowed": True
        }
    }

@app.get("/api/accel/status")
async def get_accel_status():
    gpu_present = False
    try:
        import torch
        gpu_present = torch.cuda.is_available()
    except Exception:
        pass
    return {
        "gpuPresent": gpu_present,
        "enabled": gpu_present,
        "installed": gpu_present,
        "installing": False,
        "status": "ready" if gpu_present else "cpu"
    }

@app.get("/api/downloader/jobs")
async def get_downloader_jobs():
    return []

# -------------------------------------------------------------
# Phục vụ Frontend Tĩnh (Static Files & SPA Catch-all)
# -------------------------------------------------------------
# Xác định thư mục frontend: ưu tiên ../frontend, fallback backend/fe
FRONTEND_DIR = os.path.join(PROJECT_ROOT, "frontend")
if not os.path.isdir(FRONTEND_DIR):
    FRONTEND_DIR = os.path.join(BASE_DIR, "fe")

ASSETS_DIR = os.path.join(FRONTEND_DIR, "assets")
if os.path.isdir(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.get("/logo.svg")
async def get_logo():
    logo_path = os.path.join(FRONTEND_DIR, "logo.svg")
    if os.path.isfile(logo_path):
        return FileResponse(logo_path, media_type="image/svg+xml")
    return JSONResponse(status_code=404, content={"detail": "Logo not found"})

@app.get("/favicon.ico")
async def get_favicon():
    fav_path = os.path.join(FRONTEND_DIR, "favicon.ico")
    if os.path.isfile(fav_path):
        return FileResponse(fav_path)
    logo_path = os.path.join(FRONTEND_DIR, "logo.svg")
    if os.path.isfile(logo_path):
        return FileResponse(logo_path, media_type="image/svg+xml")
    return JSONResponse(status_code=404, content={"detail": "Favicon not found"})

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str, request: Request):
    # Nếu file tĩnh cụ thể tồn tại trong thư mục frontend
    target_file = os.path.join(FRONTEND_DIR, full_path)
    if full_path and os.path.isfile(target_file):
        return FileResponse(target_file)

    # Mặc định trả về index.html cho Frontend SPA
    index_file = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.isfile(index_file):
        return FileResponse(index_file)

    return JSONResponse(
        status_code=404,
        content={"detail": f"File '{full_path}' not found and frontend/index.html does not exist."}
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Video Transcription & TTS API Server")
    parser.add_argument("--host", default="127.0.0.1", help="Địa chỉ host (mặc định: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Cổng chạy server (mặc định: 8000)")
    args = parser.parse_args()

    print("\n" + "=" * 65)
    print("  🚀 HỆ THỐNG LỒNG TIẾNG VIDEO (DUBBING STUDIO)")
    print(f"  🌐 Giao diện Web: http://{args.host}:{args.port}")
    print(f"  📚 Tài liệu API:  http://{args.host}:{args.port}/docs")
    print(f"  📂 Frontend Dir:  {FRONTEND_DIR}")
    print("=" * 65 + "\n")

    uvicorn.run(app, host=args.host, port=args.port, log_level="info")
