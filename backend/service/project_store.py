"""
Per-video project storage helpers — data-dir naming, legacy migration, and SRT.

A project lives in DATA_DIR/projects/<cleanName>_<md5(path)[:8]>/. get_video_data_dir()
resolves the directory and handles migration of legacy project directories, rewriting
the absolute paths stored inside project.json.

Two generations of layout migration:
  1. Pre-canonicalization: raw path hashed -> canonical path hashed.
  2. 2026-08-05: project nằm trong DATA_DIR -> DATA_DIR/projects/.
     migrate_projects_into_subdir() quét DATA_DIR tìm các thư mục khớp PROJECT_DIR_RE
     và chuyển chúng vào projects/ (hoặc được get_video_data_dir() di chuyển on-demand).

NOTE: format_seconds_to_srt_time / generate_srt_content provide SRT formatting for
derived exports (subtitles_original.srt, subtitles_translated.srt).
"""

from __future__ import annotations

import os
import re
import shutil
import hashlib
from typing import Any, Dict, List, Optional, Tuple


DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "projects")

try:
    from backend.core.storage import load_json_resilient, save_json_atomic
except ImportError:
    try:
        from core.storage import load_json_resilient, save_json_atomic
    except ImportError:
        import json
        import tempfile

        def save_json_atomic(path: str, data: Any, *, keep_bak: bool = True, indent: int = 2) -> None:
            directory = os.path.dirname(path) or "."
            if directory and not os.path.exists(directory):
                os.makedirs(directory, exist_ok=True)
            fd, tmp_path = tempfile.mkstemp(dir=directory, prefix=".tmp_")
            try:
                with open(fd, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=indent)
                    f.flush()
                    os.fsync(f.fileno())
                if keep_bak and os.path.exists(path):
                    os.replace(path, path + ".bak")
                os.replace(tmp_path, path)
            except Exception:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
                raise

        def load_json_resilient(path: str) -> Tuple[Any | None, str]:
            if os.path.exists(path):
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        return json.load(f), "main"
                except Exception:
                    corrupt = path + ".corrupt"
                    try:
                        os.replace(path, corrupt)
                    except Exception:
                        pass
            bak = path + ".bak"
            if os.path.exists(bak):
                try:
                    with open(bak, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    try:
                        shutil.copy2(bak, path)
                    except Exception:
                        pass
                    return data, "bak"
                except Exception:
                    pass
            return None, "none"

PROJECT_DIR_RE = re.compile(r"^.+_[0-9a-f]{8}$")


def _real_path(path: str) -> str:
    """Safely return realpath resolving symlinks and normalising on Windows."""
    try:
        return os.path.realpath(path)
    except Exception:
        return path


def projects_root() -> str:
    """Root folder containing all per-video project directories."""
    return os.path.join(DATA_DIR, "projects")


def get_video_data_dir(video_path: str) -> str:
    """Return the dedicated project directory path for a given video path.
    
    Format: DATA_DIR/projects/<cleanName>_<md5(path)[:8]>
    If legacy directory exists in DATA_DIR directly, moves it to DATA_DIR/projects/.
    """
    filename = os.path.basename(video_path)
    name, _ = os.path.splitext(filename)
    clean_name = re.sub(r"[^a-zA-Z0-9_-]", "_", name)
    path_hash = hashlib.md5(video_path.encode("utf-8")).hexdigest()[:8]
    folder_name = f"{clean_name}_{path_hash}"
    
    new_dir = os.path.join(projects_root(), folder_name)
    old_dir = os.path.join(DATA_DIR, folder_name)
    
    if os.path.isdir(old_dir) and not os.path.exists(new_dir):
        _move_project_dir_into_subdir(old_dir, new_dir)
        
    return new_dir


def _move_project_dir_into_subdir(old_dir: str, new_dir: str) -> None:
    """Move an old project folder from DATA_DIR/ into DATA_DIR/projects/ and rewrite paths."""
    root = os.path.dirname(new_dir)
    os.makedirs(root, exist_ok=True)
    try:
        os.rename(old_dir, new_dir)
    except Exception as e:
        try:
            shutil.move(old_dir, new_dir)
        except Exception:
            return
            
    print(f"[Migrate] projects/: {old_dir} -> {new_dir}")
    project_file = os.path.join(new_dir, "project.json")
    data, _source = load_json_resilient(project_file)
    canon_video = data.get("videoPath") if isinstance(data, dict) else None
    _rewrite_project_prefixes(new_dir, old_dir, canon_video)


def migrate_projects_into_subdir() -> int:
    """Scan DATA_DIR for unmigrated project folders and move them into DATA_DIR/projects/."""
    root = projects_root()
    os.makedirs(root, exist_ok=True)
    moved = 0
    try:
        entries = os.listdir(DATA_DIR)
    except Exception:
        return 0
        
    for name in entries:
        if name == "projects":
            continue
        if PROJECT_DIR_RE.match(name):
            old_dir = os.path.join(DATA_DIR, name)
            if os.path.isdir(old_dir):
                new_dir = os.path.join(root, name)
                if not os.path.exists(new_dir):
                    _move_project_dir_into_subdir(old_dir, new_dir)
                    moved += 1
    return moved


def _rewrite_project_prefixes(
    data_dir: str,
    old_prefix: str,
    canon_video: Optional[str] = None
) -> None:
    """Rewrite absolute paths inside a migrated project.json:
    seg.audioPath, overlay.src, vocalSeparation.backgroundPath.
    """
    project_path = os.path.join(data_dir, "project.json")
    data, source = load_json_resilient(project_path)
    if not data or not isinstance(data, dict):
        return

    if canon_video:
        data["videoPath"] = canon_video

    old_cmp = os.path.normcase(_real_path(old_prefix))

    def swap(p: Any) -> Any:
        if not isinstance(p, str) or not p:
            return p
        p_real = os.path.normcase(_real_path(p))
        if p_real.startswith(old_cmp):
            rel = os.path.relpath(p, old_prefix)
            return os.path.join(data_dir, rel)
        return p

    for seg in data.get("segments") or []:
        if isinstance(seg, dict) and "audioPath" in seg:
            seg["audioPath"] = swap(seg["audioPath"])

    for ov in data.get("overlays") or []:
        if isinstance(ov, dict) and "src" in ov:
            ov["src"] = swap(ov["src"])

    for vs in data.get("videoSegments") or []:
        if isinstance(vs, dict):
            if "src" in vs:
                vs["src"] = swap(vs["src"])
            if "path" in vs:
                vs["path"] = swap(vs["path"])

    vs_obj = data.get("vocalSeparation")
    if isinstance(vs_obj, dict) and "backgroundPath" in vs_obj:
        vs_obj["backgroundPath"] = swap(vs_obj["backgroundPath"])

    save_json_atomic(project_path, data)


def _migrate_legacy_video_data_dir(raw_path: str, canon: str) -> None:
    """Pre-canonicalization, get_video_data_dir hashed the RAW path string.
    If the canonical-hash dir doesn't exist but a raw-hash dir does, rename it once
    and rewrite the absolute paths stored inside its project.json.
    """
    new_dir = get_video_data_dir(canon)
    if os.path.exists(new_dir):
        return

    candidates = (raw_path, os.path.normpath(raw_path), _real_path(raw_path), canon)
    seen = set()
    for cand in candidates:
        if not cand or cand in seen:
            continue
        seen.add(cand)
        legacy = get_video_data_dir(cand)
        if legacy != new_dir and os.path.isdir(legacy):
            try:
                os.rename(legacy, new_dir)
            except Exception:
                try:
                    shutil.move(legacy, new_dir)
                except Exception:
                    continue
            print(f"[Migrate] video data dir: {legacy} -> {new_dir}")
            _rewrite_project_prefixes(new_dir, legacy, canon)
            break


def get_translate_cache_file(video_path: str) -> str:
    """Resumable translate-chunk cache location for a video (Phase 2).
    Ensures the data dir exists; the node helper reads/writes the file itself.
    """
    data_dir = get_video_data_dir(video_path)
    os.makedirs(data_dir, exist_ok=True)
    return os.path.join(data_dir, "translate_cache.json")


def clear_translate_cache(video_path: str) -> bool:
    """Delete a video's resumable translate cache."""
    path = os.path.join(get_video_data_dir(video_path), "translate_cache.json")
    if os.path.exists(path):
        try:
            os.remove(path)
            return True
        except Exception:
            return False
    return False


def format_seconds_to_srt_time(seconds: float) -> str:
    """Format seconds (float) into SRT timestamp string HH:MM:SS,mmm."""
    secs = float(seconds)
    h = int(secs // 3600)
    m = int((secs % 3600) // 60)
    s = int(secs % 60)
    ms = int(round((secs % 1) * 1000))
    if ms == 1000:
        ms = 999
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def _subtitle_text_of(seg: Dict[str, Any]) -> str:
    """Overlay text model (Phase 1, audit TQ-01): subtitle display prefers the
    subtitle override, then the canonical translation, then the source text.
    """
    parts = (seg.get("subtitleText"), seg.get("translation"), seg.get("text"))
    return next((p.strip() for p in parts if isinstance(p, str) and p.strip()), "")


def generate_srt_content(segments: List[Dict[str, Any]], use_translation: bool = False) -> str:
    """Generate SRT formatted subtitle text from a list of segment dictionaries."""
    if not segments:
        return ""
    lines = []
    idx = 1
    for seg in segments:
        start = format_seconds_to_srt_time(seg.get("startTime", 0))
        end = format_seconds_to_srt_time(seg.get("endTime", 0))
        if use_translation:
            text = _subtitle_text_of(seg)
        else:
            text = (seg.get("text") or "").strip()
        lines.append(f"{idx}\n{start} --> {end}\n{text}\n")
        idx += 1
    return "\n".join(lines)


__all__ = [
    "DATA_DIR",
    "PROJECT_DIR_RE",
    "_real_path",
    "projects_root",
    "get_video_data_dir",
    "_move_project_dir_into_subdir",
    "migrate_projects_into_subdir",
    "_rewrite_project_prefixes",
    "_migrate_legacy_video_data_dir",
    "get_translate_cache_file",
    "clear_translate_cache",
    "format_seconds_to_srt_time",
    "_subtitle_text_of",
    "generate_srt_content",
    "load_json_resilient",
    "save_json_atomic",
]
