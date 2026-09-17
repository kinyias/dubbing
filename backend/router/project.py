"""
Custom Project Router — Pure Python Re-implementation of backend.routers.project
Rebuilt & reverse-engineered from backend/routers/project.cp312-win_amd64.pyd & project.pyi

Endpoints:
  - POST /api/transcript/import-video
  - POST /api/transcript/auto-save-project
  - POST /api/transcript/save-project
  - POST /api/transcript/save-subtitles
"""

from __future__ import annotations

import os
import asyncio
import logging
from typing import Any, Dict, Optional

from fastapi import APIRouter, HTTPException
from core.storage import save_text_atomic
from service.project_store import (
    get_video_data_dir,
    load_json_resilient,
    save_json_atomic,
    generate_srt_content,
    _migrate_legacy_video_data_dir,
)

logger = logging.getLogger("backend.routers.custom_project")


def canon_path(path: str) -> str:
    try:
        return os.path.normcase(os.path.realpath(path))
    except Exception:
        return os.path.normcase(path)


def reject_executable_extension(path: str) -> None:
    _, ext = os.path.splitext(path)
    if ext.lower() in {'.exe', '.dll', '.bat', '.cmd', '.ps1', '.vbs', '.js', '.py', '.sh'}:
        raise HTTPException(status_code=403, detail='Executable extension not allowed')


def validate_local_file_path(path: str) -> str:
    if not path:
        raise HTTPException(status_code=403, detail='Path is not allowed')
    return os.path.realpath(path)

router = APIRouter(tags=["project"])


@router.post("/api/transcript/import-video")
async def api_import_video(req: dict) -> Dict[str, Any]:
    """Imports or opens an existing video project directory.
    
    Loads project.json (with automatic fallback to project.json.bak if corrupted),
    ensures cache dataDir exists, and runs legacy migration if needed.
    """
    if not isinstance(req, dict):
        raise HTTPException(status_code=400, detail="Missing videoPath")
        
    raw_path = req.get("videoPath") or req.get("filePath") or req.get("path")
    if not raw_path:
        raise HTTPException(status_code=400, detail="Missing videoPath")
        
    video_path = canon_path(raw_path)

    def _open_project():
        data_dir = get_video_data_dir(video_path)
        os.makedirs(data_dir, exist_ok=True)
        
        try:
            _migrate_legacy_video_data_dir(raw_path, video_path)
        except Exception as e:
            logger.warning(f"[Migrate] skipped (non-fatal): {e}")
            
        project_path = os.path.join(data_dir, "project.json")
        project_data, source = load_json_resilient(project_path)
        
        if source == "bak":
            logger.warning(f"[Project] project.json was corrupt; restored from .bak: {project_path}")
            
        project_exists = project_data is not None
        return data_dir, project_data, source, project_exists

    data_dir, project_data, source, project_exists = await asyncio.to_thread(_open_project)

    return {
        "success": True,
        "videoPath": video_path,
        "dataDir": data_dir,
        "projectExists": project_exists,
        "projectData": project_data,
        "restoredFromBackup": (source == "bak"),
    }


@router.post("/api/transcript/auto-save-project")
async def api_auto_save_project(req: dict) -> Dict[str, Any]:
    """Auto-saves project data atomically into project.json and derives SRTs."""
    if not isinstance(req, dict):
        raise HTTPException(status_code=400, detail="Missing videoPath")
        
    raw_video_path = req.get("videoPath") or req.get("filePath") or req.get("path")
    if not raw_video_path:
        raise HTTPException(status_code=400, detail="Missing videoPath")
        
    project_data = req.get("projectData")
    if not project_data or not isinstance(project_data, dict):
        raise HTTPException(status_code=400, detail="Missing projectData")
        
    video_path = canon_path(raw_video_path)
    data_dir = get_video_data_dir(video_path)

    def _write_autosave():
        os.makedirs(data_dir, exist_ok=True)
        project_path = os.path.join(data_dir, "project.json")
        save_json_atomic(project_path, project_data)
        
        segments = project_data.get("segments") or []
        if segments:
            orig_srt = generate_srt_content(segments, False)
            save_text_atomic(os.path.join(data_dir, "subtitles_original.srt"), orig_srt)
            
            if any(s.get("translation") for s in segments):
                trans_srt = generate_srt_content(segments, True)
                save_text_atomic(os.path.join(data_dir, "subtitles_translated.srt"), trans_srt)

    await asyncio.to_thread(_write_autosave)
    return {"success": True, "dataDir": data_dir}


@router.post("/api/transcript/save-project")
async def api_save_project(req: dict) -> Dict[str, Any]:
    """Explicitly saves project.json to a designated file path."""
    if not isinstance(req, dict):
        raise HTTPException(status_code=400, detail="Missing filePath")
        
    file_path = req.get("filePath")
    if not file_path:
        raise HTTPException(status_code=400, detail="Missing filePath")
        
    project_data = req.get("projectData")
    if not project_data:
        raise HTTPException(status_code=400, detail="Missing projectData")
        
    validate_local_file_path(file_path)
    reject_executable_extension(file_path)

    parent = os.path.dirname(file_path)
    if parent and not os.path.exists(parent):
        os.makedirs(parent, exist_ok=True)

    await asyncio.to_thread(save_json_atomic, file_path, project_data)
    return {"success": True, "filePath": file_path}


@router.post("/api/transcript/save-subtitles")
async def api_save_subtitles(req: dict) -> Dict[str, Any]:
    """Exports subtitle text content (SRT/VTT/etc.) to a designated file path."""
    if not isinstance(req, dict):
        raise HTTPException(status_code=400, detail="Missing filePath")
        
    file_path = req.get("filePath")
    if not file_path:
        raise HTTPException(status_code=400, detail="Missing filePath")
        
    content = req.get("content")
    if content is None:
        raise HTTPException(status_code=400, detail="Missing content")
        
    validate_local_file_path(file_path)
    reject_executable_extension(file_path)

    parent = os.path.dirname(file_path)
    if parent and not os.path.exists(parent):
        os.makedirs(parent, exist_ok=True)

    await asyncio.to_thread(save_text_atomic, file_path, content)
    return {"success": True, "filePath": file_path}


__all__ = [
    "router",
    "api_import_video",
    "api_auto_save_project",
    "api_save_project",
    "api_save_subtitles",
    "get_video_data_dir",
    "load_json_resilient",
    "save_json_atomic",
    "generate_srt_content",
    "_migrate_legacy_video_data_dir",
    "canon_path",
    "validate_local_file_path",
    "reject_executable_extension",
    "save_text_atomic",
]
