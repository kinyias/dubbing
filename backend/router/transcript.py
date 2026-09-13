from core.node_bridge import run_node_script_sync
import os
import sys
import json
import time
import asyncio
import subprocess
import logging
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, BackgroundTasks, WebSocket, WebSocketDisconnect, Query
from fastapi.responses import FileResponse, JSONResponse
from service.media_service import probe_media_file, resolve_non_conflicting_path
from service.dialog_service import (
    open_video_dialog,
    open_folder_dialog,
    open_media_dialog,
    save_file_dialog
)
from core.ws_manager import ws_manager

logger = logging.getLogger("router_transcript")

router = APIRouter(prefix="/api/transcript", tags=["transcript"])

@router.api_route("/dialog/open-video", methods=["GET", "POST"])
def dialog_open_video(multiple: bool = Query(False)):
    """Native file dialog for selecting video files."""
    logger.info("Opening native video file picker dialog...")
    res = open_video_dialog(multiple=multiple)
    if multiple:
        return {"filePaths": res if isinstance(res, list) else ([res] if res else [])}
    else:
        return {"filePath": res if isinstance(res, str) else None}


@router.api_route("/dialog/open-folder", methods=["GET", "POST"])
def dialog_open_folder():
    """Native folder picker dialog."""
    logger.info("Opening native folder picker dialog...")
    res = open_folder_dialog()
    return {"dirPath": res}


@router.api_route("/dialog/open-media", methods=["GET", "POST"])
def dialog_open_media():
    """Native media picker dialog."""
    logger.info("Opening native media file picker dialog...")
    res = open_media_dialog()
    return {"filePath": res}


@router.api_route("/dialog/save-project", methods=["GET", "POST"])
def dialog_save_project():
    """Native save project file dialog."""
    res = save_file_dialog(title="Lưu Dự Án", default_ext=".ezmax", filetypes=[("Ezmax Project", "*.ezmax *.json"), ("All Files", "*.*")])
    return {"filePath": res}


@router.api_route("/dialog/load-project", methods=["GET", "POST"])
def dialog_load_project():
    """Native load project file dialog."""
    res = open_media_dialog()
    return {"filePath": res, "projectData": None}


@router.api_route("/dialog/save-subtitles", methods=["GET", "POST"])
def dialog_save_subtitles():
    """Native save subtitles file dialog."""
    res = save_file_dialog(title="Lưu Phụ Đề", default_ext=".srt", filetypes=[("Subtitles", "*.srt *.vtt *.ass"), ("All Files", "*.*")])
    return {"filePath": res}


@router.post("/save-subtitles")
async def save_subtitles_endpoint(body: Dict[str, Any]):
    """Saves subtitle content (.srt, .vtt, etc.) to a file on local disk."""
    file_path = body.get("filePath") or body.get("path")
    content = body.get("content", "")
    if not file_path:
        raise HTTPException(status_code=400, detail="Missing 'filePath' parameter")

    try:
        abs_path = os.path.abspath(file_path)
        dir_name = os.path.dirname(abs_path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)

        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(content)

        logger.info(f"Successfully saved subtitles to: {abs_path}")
        return {"success": True, "filePath": abs_path}
    except Exception as e:
        logger.error(f"Error saving subtitle file '{file_path}': {e}")
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/reveal-in-explorer")
async def reveal_in_explorer_endpoint(body: Dict[str, Any]):
    """Reveals the output file in Windows File Explorer or native OS file manager."""
    path = body.get("path") or body.get("filePath")
    if not path:
        raise HTTPException(status_code=400, detail="Missing 'path' parameter")
        
    abs_path = os.path.abspath(path)
    logger.info(f"Revealing file in explorer: {abs_path}")
    
    try:
        if sys.platform == "win32":
            if os.path.exists(abs_path):
                subprocess.Popen(["explorer.exe", "/select,", abs_path])
            else:
                dir_path = os.path.dirname(abs_path)
                if os.path.exists(dir_path):
                    subprocess.Popen(["explorer.exe", dir_path])
                else:
                    subprocess.Popen(["explorer.exe"])
        elif sys.platform == "darwin":
            subprocess.Popen(["open", "-R", abs_path])
        else:
            dir_path = os.path.dirname(abs_path) if os.path.isfile(abs_path) else abs_path
            subprocess.Popen(["xdg-open", dir_path])
        return {"success": True, "path": abs_path}
    except Exception as e:
        logger.error(f"Error revealing in explorer: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/resolve-output-path")
async def resolve_output_path_endpoint(body: Dict[str, Any]):
    """Returns a non-conflicting output filename if the file already exists."""
    candidate = body.get("candidatePath") or body.get("path")
    if not candidate:
        raise HTTPException(status_code=400, detail="Missing candidatePath")
        
    resolved = resolve_non_conflicting_path(candidate)
    return {"outputPath": resolved}


@router.post("/probe-media")
@router.post("/import-video")
async def probe_media_endpoint(body: Dict[str, Any]):
    """Probes media metadata (duration, width, height, fps)."""
    file_path = body.get("filePath") or body.get("sourceVideo")
    if not file_path:
        raise HTTPException(status_code=400, detail="Missing filePath parameter")
        
    ffmpeg_bin = body.get("ffmpegBinPath")
    info = probe_media_file(file_path, ffmpeg_bin)
    return info


@router.get("/stream-file")
async def stream_file_endpoint(path: str = Query(...)):
    """Streams local media file to browser player."""
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(path)


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time progress and logs."""
    # Check subprotocols for editor_ws_manager (e.g. ez-session)
    echo = None
    subprotocols = websocket.scope.get("subprotocols") or []
    for proto in subprotocols:
        if proto.startswith("ez-session."):
            echo = proto
            break

    # Accept connection once
    await websocket.accept(subprotocol=echo)
    if websocket not in ws_manager.active_connections:
        ws_manager.active_connections.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            # Respond to ping messages
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        ws_manager.disconnect(websocket)

# ---------------------------------------------------------------------------
# Voice Catalog (/api/transcript/voices)
# ---------------------------------------------------------------------------

_SYS_VOICES_CACHE: list = []
_SYS_VOICES_CACHE_TIME: float = 0.0
_SYS_VOICES_LOCK = asyncio.Lock()


def _load_system_voices_from_node() -> list:
    """Lấy danh sách 775 giọng từ ttsVoices.js qua Node.js."""
    script = "console.log(JSON.stringify(require('./tts/ttsVoices').getAllVoices()))"
    try:
        proc = run_node_script_sync(script, timeout=15.0)
        if proc and proc.stdout:
            data = json.loads(proc.stdout.strip())
            if isinstance(data, list):
                return data
    except Exception as e:
        logger.warning(f"Không thể nạp giọng hệ thống từ ttsVoices.js: {e}")
    return []


@router.get("/voices")
async def get_transcript_voices(refresh: bool = False):
    """
    Endpoint /api/transcript/voices:
    Gộp toàn bộ giọng hệ thống (CapCut, Edge, ElevenLabs, FPT, Vbee, Zalo...), giọng clone OmniVoice, VieNeu.
    """
    global _SYS_VOICES_CACHE, _SYS_VOICES_CACHE_TIME

    # 1. Lấy giọng hệ thống từ Cache hoặc gọi Node
    now = time.time()
    if refresh or not _SYS_VOICES_CACHE or (now - _SYS_VOICES_CACHE_TIME > 300.0):
        async with _SYS_VOICES_LOCK:
            if refresh or not _SYS_VOICES_CACHE or (now - _SYS_VOICES_CACHE_TIME > 300.0):
                _SYS_VOICES_CACHE = await asyncio.to_thread(_load_system_voices_from_node)
                _SYS_VOICES_CACHE_TIME = now

    all_voices = []

    # 2. Gộp giọng hệ thống (CapCut, Edge, ElevenLabs, FPT, Vbee, Zalo, MiniMax, SiliconFlow)
    for sv in _SYS_VOICES_CACHE:
        if isinstance(sv, dict):
            v_id = sv.get("voiceId") or sv.get("id")
            all_voices.append({
                **sv,
                "voiceId": v_id,
                "id": v_id,
                "label": sv.get("label") or v_id,
            })

    # 3. Gộp giọng VieNeu presets (nếu có module VieNeu)
    try:
        import dataclasses
        from service.vieneu import list_preset_voices as vieneu_registry
        vieneu_presets = vieneu_registry() or []
        for vp in vieneu_presets:
            if isinstance(vp, dict):
                v_id = vp.get("voiceId") or vp.get("id") or vp.get("voice_id")
                name = vp.get("label") or vp.get("name") or vp.get("display_name") or v_id
                gender = vp.get("gender") or "male"
                region = vp.get("region") or "VN"
                style = vp.get("style") or ""
                desc = vp.get("description") or ""
            elif isinstance(vp, (tuple, list)):
                name = str(vp[0])
                v_id = str(vp[1] if len(vp) > 1 else vp[0])
                gender = "female" if any(w in name.lower() for w in ["thục", "mai", "linh", "trang", "huyền", "dung", "ly", "trân", "duyên", "quỳnh", "thanh"]) else "male"
                region = "VN"
                style = ""
                desc = "Giọng đọc VieNeu chất lượng cao"
            elif isinstance(vp, str):
                v_id = name = vp
                gender = "female" if any(w in name.lower() for w in ["thục", "mai", "linh", "trang", "huyền", "dung", "ly", "trân", "duyên", "quỳnh", "thanh"]) else "male"
                region = "VN"
                style = ""
                desc = "Giọng đọc VieNeu chất lượng cao"
            elif dataclasses.is_dataclass(vp) or hasattr(vp, "voice_id"):
                v_id = getattr(vp, "voice_id", "") or getattr(vp, "id", "")
                name = getattr(vp, "name", "") or getattr(vp, "label", "") or v_id
                gender = getattr(vp, "gender", "male")
                region = getattr(vp, "region", "VN")
                style = getattr(vp, "style", "")
                desc = getattr(vp, "description", "")
            else:
                continue

            if not v_id:
                continue

            full_voice_id = v_id if v_id.startswith("vieneu:") else f"vieneu:{v_id}"

            all_voices.append({
                "voiceId": full_voice_id,
                "id": full_voice_id,
                "label": f"{name} (VieNeu)" if not name.endswith("(VieNeu)") else name,
                "name": name,
                "display_name": name,
                "engine": "vieneu",
                "gender": gender,
                "region": region,
                "lang": "vi",
                "language": "vi",
                "style": style,
                "description": desc,
                "userCreated": False,
            })
    except Exception as e:
        logger.warning(f"Lỗi khi đọc giọng VieNeu presets: {e}")

    # 4. Gộp giọng do người dùng tự tạo/clone (nếu có trong user_voices.json)
    try:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        uv_file = os.path.join(base_dir, "user_voices.json")
        if os.path.isfile(uv_file):
            with open(uv_file, "r", encoding="utf-8") as f:
                user_voices = json.load(f)
                if isinstance(user_voices, list):
                    for uv in user_voices:
                        if isinstance(uv, dict):
                            uv_id = uv.get("voiceId") or uv.get("id")
                            all_voices.append({
                                **uv,
                                "voiceId": uv_id,
                                "id": uv_id,
                                "label": uv.get("label") or uv.get("name") or uv_id,
                                "engine": uv.get("engine") or "omnivoice",
                                "userCreated": True,
                            })
    except Exception as e:
        logger.warning(f"Lỗi khi đọc giọng người dùng: {e}")

    return all_voices
