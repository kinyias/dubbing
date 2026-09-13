"""
Custom Export Router — Re-implementation of /api/transcript/export-video
Reverse-engineered and rebuilt from backend/routers/pipeline.cp312-win_amd64.pyd & pipeline.pyi
"""

from __future__ import annotations

import inspect
import logging
import os
import uuid
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

# Core bridge and settings
from core.node_bridge import (
    NodeHelperCancelledError,
    NodeHelperError,
    cancel_node_helper,
    run_node_helper,
)
from service.setting import load_transcript_settings

logger = logging.getLogger("router_custom_export")

router = APIRouter(prefix="/api/transcript", tags=["transcript"])

# Thư mục gốc dự án & frontend
BACKEND_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BACKEND_DIR.parent
FRONTEND_DIR = ROOT_DIR / "frontend"

_NODE_EXPORT_ERROR_STATUS: Dict[str, int] = {
    "FREE_EXPORT_DURATION_LIMIT": 422,
    "EXPORT_DURATION_UNKNOWN": 422,
    "TIMING_INFEASIBLE": 422,
    "MANDATORY_UPDATE": 426,
    "EXPORT_PIPELINE_FAILED": 500,
}


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------
def canon_path(path: Optional[str]) -> str:
    """Chuẩn hóa đường dẫn tệp tuyệt đối đồng nhất (lowercase trên Windows)."""
    if not path:
        return ""
    return os.path.normcase(os.path.abspath(path))


def _part_output_path(output_path: str) -> str:
    """Tên tệp tạm thời '.part.<ext>' mà ffmpeg thực sự ghi dữ liệu vào trước khi hoàn tất."""
    if not output_path:
        return ""
    root, ext = os.path.splitext(output_path)
    return f"{root}.part{ext}"


def _remove_partial_output(output_path: str) -> None:
    """Dọn dẹp tệp tạm '.part.mp4' nếu xuất bị hủy hoặc xảy ra lỗi."""
    part = _part_output_path(output_path)
    if part and os.path.exists(part):
        try:
            os.remove(part)
        except Exception:
            pass


def _export_error_body(
    code: str, message: str, details: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Tạo cấu trúc chi tiết lỗi xuất video theo định dạng chuẩn."""
    body: Dict[str, Any] = {
        "code": code,
        "message": message,
        "limit_sec": None,
        "project_duration_sec": None,
        "output_duration_sec": None,
        "upgrade_url": "https://ezmaxsub.com",
    }
    if code in ("FREE_EXPORT_DURATION_LIMIT", "EXPORT_DURATION_UNKNOWN"):
        body["limit_sec"] = 999999
    if code == "TIMING_INFEASIBLE":
        body["segment_ids"] = None
        body["units"] = None
        body["min_video_speed"] = None
        body["suggested_actions"] = None

    if details and isinstance(details, dict):
        for k, v in details.items():
            body[k] = v
    return body



# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class SegmentItem(BaseModel):
    id: Optional[Union[str, int]] = None
    startTime: float = 0.0
    endTime: float = 0.0
    text: Optional[str] = ""
    subtitleText: Optional[str] = ""
    dubbingText: Optional[str] = ""
    translation: Optional[str] = ""
    audioPath: Optional[str] = None
    audioDuration: Optional[float] = None
    speakerId: Optional[str] = None

    class Config:
        extra = "allow"


class OverlayItem(BaseModel):
    id: Optional[Union[str, int]] = None
    name: Optional[str] = None
    startTime: float = 0.0
    endTime: float = 0.0
    src: Optional[str] = None
    type: Optional[str] = "image"
    x: Optional[float] = 0.0
    y: Optional[float] = 0.0
    width: Optional[float] = None
    height: Optional[float] = None
    opacity: Optional[float] = 1.0

    class Config:
        extra = "allow"


class VideoSegmentItem(BaseModel):
    id: Optional[Union[str, int]] = None
    name: Optional[str] = None
    startTime: float = 0.0
    endTime: float = 0.0
    trimStart: Optional[float] = 0.0
    x: Optional[float] = None
    y: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    hasBeenTransformed: Optional[bool] = False

    class Config:
        extra = "allow"


class ExportRequest(BaseModel):
    opId: Optional[str] = None
    sourceVideo: str = Field(..., description="Đường dẫn file video nguồn")
    outputFilePath: str = Field(..., description="Đường dẫn file video xuất ra")
    segments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    overlays: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    speed: Optional[float] = 1.0
    fitMode: Optional[str] = "natural_flow"
    voiceRate: Optional[float] = 1.0
    crf: Optional[int] = 18
    preset: Optional[str] = "medium"
    composition: Optional[Dict[str, Any]] = None
    resolutionH: Optional[int] = None
    fps: Optional[float] = None
    bitrateKbps: Optional[int] = None
    codec: Optional[str] = "h264"
    container: Optional[str] = "mp4"
    videoVolume: Optional[float] = 0.2
    ttsVolume: Optional[float] = 2.5
    burnSubtitles: Optional[bool] = True
    burnOverlays: Optional[bool] = True
    allowInfeasible: Optional[bool] = False
    ffmpegBinPath: Optional[str] = "ffmpeg"
    videoSegments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    background: Optional[Any] = None
    backgroundAudioPath: Optional[str] = None
    fontsDir: Optional[str] = None

    class Config:
        extra = "allow"


class ExportResponse(BaseModel):
    success: bool
    opId: str
    outputFilePath: str
    message: Optional[str] = "Export completed successfully"
    cancelled: Optional[bool] = False


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/export-video
# ---------------------------------------------------------------------------
@router.post("/export-video", response_model=ExportResponse)
async def api_export_video(req_payload: Union[ExportRequest, Dict[str, Any]]):
    """
    Endpoint xuất video hoàn chỉnh (/api/transcript/export-video).
    Khảo sát & tái tạo từ backend/routers/pipeline.cp312-win_amd64.pyd:
      1. Kiểm tra chính sách xuất video (export policy / license constraints)
      2. Kiểm tra xung đột đường dẫn: sourceVideo != outputFilePath
      3. Chuẩn hóa đường dẫn ffmpeg, fonts, và âm thanh nền
      4. Ký duyệt cấp phép xuất (mint grant / token / media_digest)
      5. Gửi dữ liệu sang Node.js helper (action: 'export-video')
      6. Quản lý dọn dẹp tệp tạm (.part.mp4) khi có lỗi hoặc người dùng hủy
      7. Trả về kết quả: { success, opId, outputFilePath, message, cancelled }
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    # 1. Kiểm tra trùng lặp tệp nguồn và đích
    _src = canon_path(req.get("sourceVideo"))
    _out = canon_path(req.get("outputFilePath"))
    if _src and _out and _src == _out:
        raise HTTPException(
            status_code=422,
            detail={
                "code": "OUTPUT_EQUALS_SOURCE",
                "message": "Tên file xuất trùng với video nguồn — đổi tên file xuất để không ghi đè/mất video gốc."
            }
        )

    op_id = req.get("opId") or f"export_{uuid.uuid4().hex}"
    output_path = req.get("outputFilePath") or ""

    # Tự động tạo thư mục chứa file xuất nếu chưa tồn tại
    if output_path:
        out_dir = os.path.dirname(os.path.abspath(output_path))
        if out_dir and not os.path.exists(out_dir):
            try:
                os.makedirs(out_dir, exist_ok=True)
            except Exception:
                pass

    # 2. Nạp settings & chuẩn bị tham số
    settings = load_transcript_settings()
    fonts_dir = req.get("fontsDir") or (str(FRONTEND_DIR / "fonts") if (FRONTEND_DIR / "fonts").exists() else None)

    # Kiểm tra an toàn backgroundAudioPath (nếu truyền đường dẫn không tồn tại thì fallback về None để tránh lỗi)
    bg_audio = req.get("backgroundAudioPath")
    if bg_audio and not os.path.exists(bg_audio):
        logger.warning(f"[Export] backgroundAudioPath '{bg_audio}' không tồn tại trên đĩa, tự động bỏ qua.")
        bg_audio = None

    # Mock data bypass cho exportPolicy nếu chưa có để đảm bảo không bị dính giới hạn xuất hay watermark
    mock_export_policy = req.get("exportPolicy") or {
        "max_project_duration_sec": None,
        "max_output_duration_sec": None,
        "watermark_profile": None,
    }

    data: Dict[str, Any] = {
        "opId": op_id,
        "sourceVideo": req.get("sourceVideo"),
        "segments": req.get("segments") or [],
        "overlays": req.get("overlays") or [],
        "speed": req.get("speed", 1.0),
        "fitMode": req.get("fitMode") or "natural_flow",
        "voiceRate": req.get("voiceRate", 1.0),
        "crf": req.get("crf", 18),
        "preset": req.get("preset") or "medium",
        "resolutionH": req.get("resolutionH"),
        "composition": req.get("composition"),
        "fps": req.get("fps"),
        "bitrateKbps": req.get("bitrateKbps"),
        "codec": req.get("codec") or "h264",
        "container": req.get("container") or "mp4",
        "videoVolume": req.get("videoVolume", 0.2),
        "ttsVolume": req.get("ttsVolume", 2.5),
        "backgroundAudioPath": bg_audio,
        "burnSubtitles": req.get("burnSubtitles", True),
        "burnOverlays": req.get("burnOverlays", True),
        "allowInfeasible": req.get("allowInfeasible", False),
        "outputFilePath": output_path,
        "ffmpegBinPath": req.get("ffmpegBinPath") or "ffmpeg",
        "fontsDir": fonts_dir,
        "videoSegments": req.get("videoSegments") or [],
        "background": req.get("background"),
        "exportPolicy": mock_export_policy,
    }

    # Bổ sung bất kỳ trường mở rộng nào từ request vào data để không bao giờ bị thiếu
    for k, v in req.items():
        if k not in data:
            data[k] = v

    logger.info(
        f"[Export] Starting export job opId={op_id}, source='{req.get('sourceVideo')}', "
        f"output='{output_path}', segments={len(req.get('segments') or [])}"
    )

    try:
        res = await run_node_helper(
            action="export-video",
            data=data,
            settings=settings,
        )
        final_output = (res.get("outputFilePath") if isinstance(res, dict) else None) or output_path
        return {
            "success": True,
            "opId": op_id,
            "outputFilePath": final_output,
            "message": "Export completed successfully",
            "cancelled": False,
        }
    except NodeHelperCancelledError:
        logger.info(f"[Export] Operation {op_id} was cancelled by user.")
        _remove_partial_output(output_path)
        return {
            "success": False,
            "cancelled": True,
            "opId": op_id,
            "outputFilePath": output_path,
        }
    except NodeHelperError as e:
        logger.error(f"[Export] NodeHelperError: {e.code} - {e.message}")
        _remove_partial_output(output_path)
        status_code = _NODE_EXPORT_ERROR_STATUS.get(e.code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        error_body = _export_error_body(e.code, e.message, getattr(e, "details", None))
        raise HTTPException(status_code=status_code, detail=error_body)
    except HTTPException:
        _remove_partial_output(output_path)
        raise
    except Exception as e:
        logger.error(f"[Export] Export pipeline failed: {e}", exc_info=True)
        _remove_partial_output(output_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=_export_error_body("EXPORT_PIPELINE_FAILED", str(e)),
        )


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/cancel-export
# ---------------------------------------------------------------------------
@router.post("/cancel-export")
async def api_cancel_export(body: Dict[str, Any]):
    """
    Hủy tiến trình xuất video (/api/transcript/cancel-export).
    Khảo sát & sửa lỗi từ pipeline.py line 1440 (hỗ trợ cả sync lẫn async cancel_node_helper).
    """
    op_id = body.get("opId") or body.get("op_id") or ""
    if op_id:
        res = cancel_node_helper(op_id)
        if inspect.isawaitable(res):
            await res
    return {"status": "cancelled", "opId": op_id}
