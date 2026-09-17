"""
Subprocess bridge to node_helper.js.
Cung cấp giao diện Python tối giản (async & sync) để chạy node_helper.js.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import signal
import subprocess
import sys
from typing import Any, Callable, Optional

_log = logging.getLogger("node_bridge")

# Đường dẫn mặc định tới thư mục gốc dự án chứa node_helper.js
CORE_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(CORE_DIR)
NODE_HELPER_PATH = os.path.join(BASE_DIR, "node_helper.js")

# Quản lý tiến trình đang chạy để hỗ trợ hủy bỏ (cancel)
ACTIVE_NODE_PROCS: dict[str, subprocess.Popen] = {}
ACTIVE_CANCELLED_OPS: set[str] = set()


class NodeHelperError(Exception):
    """Lỗi được trả về từ node_helper.js qua dòng 'ERROR: {json}'."""

    def __init__(self, code: str, message: str, details: dict | None = None) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.details = details or {}

    def __str__(self) -> str:
        return f"[{self.code}] {self.message}"


class NodeHelperCancelledError(Exception):
    """Ném ra khi tác vụ node helper bị hủy bỏ."""

    pass


class NodeHelperTamperedError(Exception):
    """Giữ lại để tương thích ngược nếu có module import."""

    pass


def _kill_process_tree(proc: subprocess.Popen) -> bool:
    """Dừng tiến trình và toàn bộ cây tiến trình con."""
    try:
        if sys.platform == "win32":
            subprocess.run(
                ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                capture_output=True,
                check=False,
            )
        else:
            os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
        return True
    except Exception:
        try:
            proc.kill()
            return True
        except Exception:
            return False


def parse_node_error_line(line: str) -> NodeHelperError:
    """Parse dòng stdout dạng 'ERROR: {json}' thành NodeHelperError."""
    raw = line[6:].strip() if line.startswith("ERROR:") else line.strip()
    try:
        payload = json.loads(raw)
        if isinstance(payload, dict) and "code" in payload:
            return NodeHelperError(
                code=str(payload["code"]),
                message=str(payload.get("message", payload["code"])),
                details=payload.get("details") if isinstance(payload.get("details"), dict) else None,
            )
    except Exception:
        pass
    return NodeHelperError(code="EXPORT_PIPELINE_FAILED", message=raw, details=None)


def cancel_node_helper(op_id: str) -> bool:
    """Hủy tiến trình node_helper đang chạy theo op_id."""
    if not op_id:
        return False
    ACTIVE_CANCELLED_OPS.add(op_id)
    proc = ACTIVE_NODE_PROCS.get(op_id)
    if proc and proc.poll() is None:
        _kill_process_tree(proc)
        return True
    return False


def run_node_script_sync(
    script: str, *, timeout: float = 60.0, cwd: str | None = None
) -> subprocess.CompletedProcess:
    """Chạy một đoạn script Node.js ngắn trực tiếp (node -e)."""
    return subprocess.run(
        ["node", "-e", script],
        cwd=cwd or BASE_DIR,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=timeout,
        check=True,
    )


async def run_node_helper(
    action: str,
    data: dict,
    settings: dict | None = None,
    on_log: Optional[Callable[[str], Any]] = None,
    on_event: Optional[Callable[[dict], Any]] = None,
    helper_path: str | None = None,
) -> Any:
    """
    Chạy node_helper.js bất đồng bộ (async), truyền dữ liệu qua stdin và nhận kết quả qua stdout.
    Tự động hòa hợp với cấu hình trong settings.json nếu caller không truyền đầy đủ.
    """
    # Tự động nạp settings từ service.setting nếu có
    loaded_settings = {}
    try:
        from service.setting import load_transcript_settings
        loaded_settings = load_transcript_settings()
    except Exception as e:
        _log.debug("Không thể nạp settings từ service.setting: %s", e)

    merged_settings = dict(loaded_settings)
    if settings:
        merged_settings.update(settings)
    settings = merged_settings

    target_helper = helper_path or NODE_HELPER_PATH
    if not os.path.exists(target_helper):
        raise FileNotFoundError(f"Không tìm thấy file node helper tại: {target_helper}")

    op_id = data.get("op_id", "") or data.get("opId", "")
    ffmpeg_bin = settings.get("ffmpegPath") or settings.get("ffmpegBinPath") or "ffmpeg"
    payload = {
        "action": action,
        "data": data,
        "settings": settings,
        "ffmpegPath": ffmpeg_bin,
        "ffmpegBinPath": ffmpeg_bin,
    }
    for k, v in data.items():
        if k not in payload:
            payload[k] = v

    create_kwargs: dict[str, Any] = {}
    if sys.platform == "win32":
        create_kwargs["creationflags"] = subprocess.CREATE_NO_WINDOW
    else:
        create_kwargs["preexec_fn"] = os.setsid

    proc = None
    captured_error = None
    captured_result = None
    stderr_chunks: list[str] = []

    try:
        proc = subprocess.Popen(
            ["node", target_helper],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            bufsize=1,
            cwd=os.path.dirname(target_helper),
            **create_kwargs,
        )

        if op_id:
            ACTIVE_NODE_PROCS[op_id] = proc

        # Gửi dữ liệu vào stdin và đóng để node_helper hoàn tất đọc
        proc.stdin.write(json.dumps(payload) + "\n")
        proc.stdin.flush()
        try:
            proc.stdin.close()
        except Exception:
            pass

        async def read_stdout():
            nonlocal captured_error, captured_result
            while True:
                line = await asyncio.to_thread(proc.stdout.readline)
                if not line:
                    break
                line_str = line.strip()
                if not line_str:
                    continue

                if line_str.startswith("LOG:"):
                    log_text = line_str[4:].strip()
                    _log.info("[Node Helper LOG] %s", log_text)
                    if on_log:
                        try:
                            res = on_log(log_text)
                            if asyncio.iscoroutine(res):
                                await res
                        except Exception:
                            pass
                elif line_str.startswith("EVENT:"):
                    try:
                        event_data = json.loads(line_str[6:].strip())
                        if on_event:
                            res = on_event(event_data)
                            if asyncio.iscoroutine(res):
                                await res
                    except Exception as e:
                        _log.error("Lỗi parse EVENT JSON: %s", e)
                elif line_str.startswith("RESULT:"):
                    try:
                        captured_result = json.loads(line_str[7:].strip())
                    except Exception as e:
                        _log.error("Lỗi parse RESULT JSON: %s", e)
                elif line_str.startswith("ERROR:"):
                    captured_error = parse_node_error_line(line_str)
                else:
                    _log.debug("[Node Helper Stdout] %s", line_str)

        async def read_stderr():
            while True:
                line = await asyncio.to_thread(proc.stderr.readline)
                if not line:
                    break
                line_str = line.strip()
                if line_str:
                    stderr_chunks.append(line_str)
                    _log.warning("[Node Helper Stderr] %s", line_str)

        stdout_task = asyncio.create_task(read_stdout())
        stderr_task = asyncio.create_task(read_stderr())

        await asyncio.gather(stdout_task, stderr_task, return_exceptions=True)
        await asyncio.to_thread(proc.wait)

        if op_id and op_id in ACTIVE_CANCELLED_OPS:
            raise NodeHelperCancelledError(f"Tác vụ {op_id} đã bị hủy")

        if captured_error:
            raise captured_error

        if proc.returncode != 0:
            err_msg = (
                "\n".join(stderr_chunks)
                if stderr_chunks
                else f"Node helper kết thúc với mã lỗi {proc.returncode}"
            )
            raise NodeHelperError(
                code="EXPORT_PIPELINE_FAILED",
                message=err_msg,
            )

        return captured_result
    finally:
        if op_id:
            ACTIVE_NODE_PROCS.pop(op_id, None)
            ACTIVE_CANCELLED_OPS.discard(op_id)
        if proc and proc.poll() is None:
            _kill_process_tree(proc)


def run_node_helper_sync(
    action: str,
    data: dict,
    settings: dict | None = None,
    on_log: Optional[Callable[[str], Any]] = None,
    on_event: Optional[Callable[[dict], Any]] = None,
    helper_path: str | None = None,
) -> Any:
    """Chạy node_helper.js đồng bộ (sync) tiện lợi cho script Python."""
    return asyncio.run(
        run_node_helper(
            action=action,
            data=data,
            settings=settings,
            on_log=on_log,
            on_event=on_event,
            helper_path=helper_path,
        )
    )


async def generate_tts(
    text: str,
    voice_id: str,
    dest_path: str,
    speed: float = 1.0,
    op_id: Optional[str] = None,
    settings: Optional[dict] = None,
    on_log: Optional[Callable[[str], Any]] = None,
    on_event: Optional[Callable[[dict], Any]] = None,
    helper_path: Optional[str] = None,
) -> dict[str, Any]:
    """
    Tổng hợp giọng nói (CapCut TTS, Edge, ElevenLabs, FPT, Vbee, Zalo...)
    thông qua action 'generate-tts' của node_helper.js.
    """
    if not dest_path:
        raise ValueError("dest_path không được để trống")

    parent_dir = os.path.dirname(os.path.abspath(dest_path))
    if parent_dir and not os.path.exists(parent_dir):
        os.makedirs(parent_dir, exist_ok=True)

    data: dict[str, Any] = {
        "text": text,
        "voiceId": voice_id,
        "destPath": dest_path,
        "outputPath": dest_path,
        "speed": float(speed) if speed else 1.0,
    }
    if op_id:
        data["opId"] = op_id
        data["op_id"] = op_id

    result = await run_node_helper(
        action="generate-tts",
        data=data,
        settings=settings,
        on_log=on_log,
        on_event=on_event,
        helper_path=helper_path,
    )

    if not isinstance(result, dict):
        result = {
            "success": os.path.exists(dest_path) and os.path.getsize(dest_path) > 44,
            "outputPath": dest_path,
            "validAudio": os.path.exists(dest_path) and os.path.getsize(dest_path) > 44,
        }
    return result


def generate_tts_sync(
    text: str,
    voice_id: str,
    dest_path: str,
    speed: float = 1.0,
    op_id: Optional[str] = None,
    settings: Optional[dict] = None,
    on_log: Optional[Callable[[str], Any]] = None,
    on_event: Optional[Callable[[dict], Any]] = None,
    helper_path: Optional[str] = None,
) -> dict[str, Any]:
    """Chạy generate_tts đồng bộ (sync)."""
    return asyncio.run(
        generate_tts(
            text=text,
            voice_id=voice_id,
            dest_path=dest_path,
            speed=speed,
            op_id=op_id,
            settings=settings,
            on_log=on_log,
            on_event=on_event,
            helper_path=helper_path,
        )
    )



if __name__ == "__main__":
    if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
    print("--- KIEM TRA CHAY NODE_HELPER.JS QUA PYTHON ---")
    try:
        res = run_node_helper_sync(
            action="compute-timing-plan",
            data={"segments": []},
            settings={},
            on_log=lambda msg: print(f"[LOG]: {msg}"),
        )
        print("\n[THANH CONG] Ket qua tra ve:")
        print(json.dumps(res, indent=2, ensure_ascii=False))
    except Exception as exc:
        print(f"\n[LOI]: {exc}")
