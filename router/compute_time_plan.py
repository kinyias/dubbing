"""
Custom Timing Router — Re-implementation of /api/transcript/compute-timing-plan
Reverse-engineered and rebuilt from backend/routers/pipeline.cp312-win_amd64.pyd & pipeline.pyi
"""

from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

# Core bridge and settings
from core.node_bridge import (
    NodeHelperCancelledError,
    NodeHelperError,
    run_node_helper,
)
from service.setting import load_transcript_settings

logger = logging.getLogger("router_custom_compute")

router = APIRouter(prefix="/api/transcript", tags=["transcript"])


# ---------------------------------------------------------------------------
# Request Models
# ---------------------------------------------------------------------------
class TimingSegment(BaseModel):
    id: Optional[str] = None
    startTime: Optional[float] = 0.0
    endTime: Optional[float] = 0.0
    speakerId: Optional[str] = None
    text: Optional[str] = ""
    audioPath: Optional[str] = None
    audioDuration: Optional[float] = None
    renderedSpeed: Optional[float] = None
    spokenText: Optional[str] = None

    class Config:
        extra = "allow"


class ComputeTimingPlanRequest(BaseModel):
    segments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    totalDuration: Optional[float] = None
    mediaDuration: Optional[float] = None
    globalVoiceRate: Optional[float] = 1.0
    videoSegments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    policy: Optional[Dict[str, Any]] = None
    suggestRate: Optional[bool] = None
    voiceId: Optional[str] = None

    class Config:
        extra = "allow"


class VerifyDubbingFitRequest(BaseModel):
    segments: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    totalDuration: Optional[float] = None
    globalVoiceRate: Optional[float] = 1.0
    policy: Optional[Dict[str, Any]] = None

    class Config:
        extra = "allow"


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/compute-timing-plan
# ---------------------------------------------------------------------------
@router.post("/compute-timing-plan")
async def api_compute_timing_plan(
    req_payload: Union[ComputeTimingPlanRequest, Dict[str, Any]]
):
    """
    Endpoint tính toán kế hoạch thời gian lồng tiếng (Timing Plan / Dubbing Fit).
      1. Nạp settings qua load_transcript_settings()
      2. Đóng gói dữ liệu gửi sang Node.js helper (action: 'compute-timing-plan'):
         - segments: danh sách câu phụ đề kèm audioDuration
         - totalDuration: tổng thời lượng timeline
         - mediaDuration: thời lượng media gốc
         - videoSegments: danh sách lát cắt video trên timeline
         - globalVoiceRate: tốc độ giọng đọc chung (mặc định 1.0)
         - policy: chính sách mượn thời gian (borrowLeft, borrowRight, videoSpeed, v.v.)
         - suggestRate: cờ gợi ý tốc độ tối ưu theo phân cảnh
         - voiceId: ID giọng đọc
      3. Thực thi thuật toán tối ưu thời gian (borrowing / clustering / video speed scaling)
      4. Trả về Timing Plan chuẩn:
         - version: phiên bản thuật toán (1)
         - globalVoiceRate: tốc độ áp dụng
         - policy: thông số chi tiết của policy
         - units: danh sách từng câu với plannedStart, plannedEnd, audioTempo, videoSpeed, status
         - clusters: danh sách cụm video cần thay đổi tốc độ (nếu câu nói dài hơn khung hình)
         - feasible: cờ xác định khả thi (true/false)
         - infeasibleUnitIds: danh sách câu không thể khớp
         - totalDuration: thời lượng tổng thể
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    settings = load_transcript_settings()

    # Chuẩn bị dữ liệu khớp chính xác logic pipeline.pyd
    data: Dict[str, Any] = {
        "segments": req.get("segments"),
        "totalDuration": req.get("totalDuration"),
        "globalVoiceRate": req.get("globalVoiceRate"),
        "mediaDuration": req.get("mediaDuration"),
        "videoSegments": req.get("videoSegments"),
        "policy": req.get("policy"),
        "suggestRate": req.get("suggestRate"),
        "voiceId": req.get("voiceId"),
    }

    segments_count = len(req.get("segments") or [])
    logger.info(
        f"[ComputeTiming] Computing timing plan for {segments_count} segments, "
        f"totalDuration={req.get('totalDuration')}, globalVoiceRate={req.get('globalVoiceRate')}"
    )

    try:
        result = await run_node_helper(
            action="compute-timing-plan",
            data=data,
            settings=settings,
        )
        return result
    except NodeHelperCancelledError as e:
        logger.info("[ComputeTiming] Timing plan computation was cancelled.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e) or "Timing plan computation was cancelled",
        )
    except NodeHelperError as e:
        logger.error(f"[ComputeTiming] NodeHelperError: {e.code} - {e.message}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e.message or e),
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"[ComputeTiming] Failed to compute timing plan: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/verify-dubbing-fit
# ---------------------------------------------------------------------------
@router.post("/verify-dubbing-fit")
async def api_verify_dubbing_fit(
    req_payload: Union[VerifyDubbingFitRequest, Dict[str, Any]]
):
    """
    Endpoint kiểm tra độ khớp lồng tiếng nhanh (/api/transcript/verify-dubbing-fit).
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    settings = load_transcript_settings()

    data: Dict[str, Any] = {
        "segments": req.get("segments"),
        "totalDuration": req.get("totalDuration"),
        "globalVoiceRate": req.get("globalVoiceRate"),
        "policy": req.get("policy"),
    }

    try:
        result = await run_node_helper(
            action="verify-dubbing-fit",
            data=data,
            settings=settings,
        )
        return result
    except Exception as e:
        logger.error(f"[VerifyDubbingFit] Failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
