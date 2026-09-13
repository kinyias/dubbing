"""
Entry Point chính — Khởi chạy Hệ thống Dubbing (Frontend Web UI + Backend API)
"""

from __future__ import annotations

import argparse
import os
import sys
import webbrowser
import threading
import time

# Thiết lập encoding UTF-8 cho Windows console
if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đưa thư mục backend vào sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import uvicorn
from backend.main import app, FRONTEND_DIR


def open_browser_delayed(url: str, delay: float = 1.2):
    """Mở trình duyệt sau khi server đã khởi động."""
    def _open():
        time.sleep(delay)
        try:
            webbrowser.open(url)
        except Exception:
            pass
    threading.Thread(target=_open, daemon=True).start()


def main():
    parser = argparse.ArgumentParser(description="Chạy hệ thống Dubbing (Frontend + API Server)")
    parser.add_argument("--host", default="127.0.0.1", help="Địa chỉ host (mặc định: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="Cổng chạy server (mặc định: 8000)")
    parser.add_argument("--reload", action="store_true", help="Bật chế độ auto-reload cho development")
    parser.add_argument("--no-browser", action="store_true", help="Không tự động mở trình duyệt web")
    args = parser.parse_args()

    ui_url = f"http://{args.host}:{args.port}"
    docs_url = f"http://{args.host}:{args.port}/docs"

    print("\n" + "=" * 65)
    print("  🚀 HỆ THỐNG LỒNG TIẾNG TỰ ĐỘNG - DUBBING STUDIO")
    print("=" * 65)
    print(f"  🌐 Giao diện Web:     {ui_url}")
    print(f"  📚 Tài liệu API Docs: {docs_url}")
    print(f"  📂 Frontend tĩnh:    {FRONTEND_DIR}")
    print("=" * 65 + "\n")

    if not args.no_browser:
        open_browser_delayed(ui_url)

    if args.reload:
        uvicorn.run("backend.main:app", host=args.host, port=args.port, reload=True)
    else:
        uvicorn.run(app, host=args.host, port=args.port, log_level="info")


if __name__ == "__main__":
    main()
