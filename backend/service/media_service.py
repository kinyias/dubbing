import os
import sys
import json
import shutil
import subprocess
import logging
from pathlib import Path
from typing import Dict, Any, Optional

logger = logging.getLogger("media_service")

# Root directory of the repository
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
BUNDLED_FFMPEG = ROOT_DIR / "tools" / "ffmpeg" / "ffmpeg.exe"
BUNDLED_FFPROBE = ROOT_DIR / "tools" / "ffmpeg" / "ffprobe.exe"


def get_ffmpeg_path(custom_path: Optional[str] = None) -> str:
    """Returns absolute path to ffmpeg executable."""
    if custom_path and os.path.isfile(custom_path):
        return custom_path
    
    if BUNDLED_FFMPEG.exists():
        return str(BUNDLED_FFMPEG)
    
    sys_ffmpeg = shutil.which("ffmpeg")
    if sys_ffmpeg:
        return sys_ffmpeg
    
    return "ffmpeg"


def get_ffprobe_path(custom_path: Optional[str] = None) -> str:
    """Returns absolute path to ffprobe executable."""
    if custom_path:
        # Check if sibling ffprobe exists in same directory
        custom_dir = Path(custom_path).parent
        sibling_probe = custom_dir / ("ffprobe.exe" if sys.platform == "win32" else "ffprobe")
        if sibling_probe.exists():
            return str(sibling_probe)
            
    if BUNDLED_FFPROBE.exists():
        return str(BUNDLED_FFPROBE)
    
    sys_ffprobe = shutil.which("ffprobe")
    if sys_ffprobe:
        return sys_ffprobe
    
    return "ffprobe"


def probe_media_file(file_path: str, ffmpeg_bin_path: Optional[str] = None) -> Dict[str, Any]:
    """Inspects a media file using ffprobe and returns metadata."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Media file not found: {file_path}")
    
    ffprobe_cmd = get_ffprobe_path(ffmpeg_bin_path)
    cmd = [
        ffprobe_cmd,
        "-v", "quiet",
        "-print_format", "json",
        "-show_format",
        "-show_streams",
        file_path
    ]
    
    try:
        res = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=True,
        )
        data = json.loads(res.stdout)
        
        format_info = data.get("format", {})
        streams = data.get("streams", [])
        
        duration = float(format_info.get("duration", 0))
        width = 0
        height = 0
        fps = 0.0
        has_video = False
        has_audio = False
        
        for stream in streams:
            codec_type = stream.get("codec_type")
            if codec_type == "video" and not has_video:
                has_video = True
                width = int(stream.get("width", 0))
                height = int(stream.get("height", 0))
                
                # Extract FPS
                r_fps = stream.get("r_frame_rate", "0/0")
                if "/" in r_fps:
                    num, den = r_fps.split("/")
                    if float(den) > 0:
                        fps = float(num) / float(den)
                elif r_fps:
                    fps = float(r_fps)
            elif codec_type == "audio":
                has_audio = True
                
        return {
            "filePath": file_path,
            "duration": duration,
            "width": width,
            "height": height,
            "fps": round(fps, 2),
            "hasVideo": has_video,
            "hasAudio": has_audio,
            "format": format_info.get("format_name", "")
        }
    except Exception as e:
        logger.error(f"Error probing media file {file_path}: {e}")
        return {
            "filePath": file_path,
            "duration": 0,
            "width": 0,
            "height": 0,
            "fps": 0,
            "hasVideo": False,
            "hasAudio": False,
            "error": str(e)
        }


def resolve_non_conflicting_path(candidate_path: str) -> str:
    """Generates a non-conflicting output filename if candidate path already exists."""
    path_obj = Path(candidate_path)
    if not path_obj.exists():
        return candidate_path
    
    parent = path_obj.parent
    stem = path_obj.stem
    suffix = path_obj.suffix
    
    counter = 1
    while True:
        new_candidate = parent / f"{stem}_{counter}{suffix}"
        if not new_candidate.exists():
            return str(new_candidate)
        counter += 1
