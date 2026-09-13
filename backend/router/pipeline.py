"""
Custom Pipeline Router — End-to-End Automated Video Dubbing Pipeline
Thực hiện toàn bộ quy trình lồng tiếng video tuần tự:
1. Nhận video (Validate & Probe metadata: duration, fps, resolution)
2. Transcribe video (ASR via Node helper: CapCut, BCut, Groq, Auto)
3. Translate segments (LLM Translation: DeepSeek, Custom, Ezmax)
4. Generate TTS batch (VieNeu-TTS v3 Turbo trên GPU)
5. Compute timing plan (Đồng bộ thời lượng, borrow left/right, speed scaling)
6. Export video (FFmpeg Export: subtitle ASS, TTS audio bed mixing, retiming)
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import shutil
import subprocess
import tempfile
import time
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
from router.export import (
    FRONTEND_DIR,
    _NODE_EXPORT_ERROR_STATUS,
    _export_error_body,
    _remove_partial_output,
    canon_path,
)
from service.setting import load_transcript_settings
from backend.service.vieneu_tts import (
    cancel_tts_op,
    generate_tts_batch_sync,
    is_tts_cancelled,
    normalize_voice_id,
)

logger = logging.getLogger("router_pipeline")

router = APIRouter(prefix="/api/transcript", tags=["pipeline"])

# Theo dõi tiến độ các tác vụ pipeline đang chạy
ACTIVE_PIPELINES: Dict[str, Dict[str, Any]] = {}


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------
class PipelineRequest(BaseModel):
    # Core inputs
    videoPath: Optional[str] = Field(None, description="Đường dẫn tuyệt đối đến video nguồn")
    video_path: Optional[str] = Field(None, description="Bí danh của videoPath")
    sourceVideo: Optional[str] = Field(None, description="Bí danh của videoPath")
    outputFilePath: Optional[str] = Field(None, description="Đường dẫn file video xuất ra")
    output_file_path: Optional[str] = Field(None, description="Bí danh của outputFilePath")
    output_path: Optional[str] = Field(None, description="Bí danh của outputFilePath")

    opId: Optional[str] = Field(None, description="ID tác vụ phục vụ theo dõi & hủy")

    # 1. Transcribe (ASR)
    transcribeEngine: Optional[str] = Field(None, description="Engine nhận diện: capcut, bcut, groq, auto")
    sourceLang: Optional[str] = Field("auto", description="Ngôn ngữ nguồn video (auto, zh, en, vi...)")
    targetLang: Optional[str] = Field("vi", description="Ngôn ngữ đích cần dịch & lồng tiếng")
    videoSegments: Optional[List[Dict[str, Any]]] = Field(default_factory=list, description="Phân đoạn cắt ghép video timeline")
    initialSegments: Optional[List[Dict[str, Any]]] = Field(default_factory=list, description="Danh sách subtitle có sẵn (bỏ qua bước ASR nếu truyền)")

    # 2. Translate (LLM)
    preset: Optional[str] = Field(None, description="Phong cách dịch thuật: default, anime, drama, co_trang...")
    model: Optional[str] = Field(None, description="Model LLM dịch thuật")
    provider: Optional[str] = Field(None, description="Nhà cung cấp dịch thuật: custom, deepseek, ezmax")
    parallelJobs: Optional[int] = Field(None, description="Số tác vụ dịch song song")
    glossary: Optional[List[Any]] = Field(default_factory=list, description="Bảng thuật ngữ chuyên ngành")
    bible: Optional[Any] = Field(None, description="Từ điển nhân vật & danh xưng (Lore Bible)")
    speakers: Optional[List[Any]] = Field(default_factory=list, description="Cấu hình giọng đọc người nói")
    polish: Optional[bool] = Field(None, description="Bật/tắt bước trau chuốt câu dịch")

    # 3. TTS (VieNeu-TTS)
    voiceId: Optional[str] = Field(None, description="Tên giọng đọc VieNeu (ví dụ: 'vieneu:Ngọc Huyền')")
    voice: Optional[str] = Field(None, description="Bí danh của voiceId")
    ttsSpeed: Optional[float] = Field(1.0, description="Tốc độ giọng đọc TTS (1.0 = chuẩn)")
    ttsDir: Optional[str] = Field(None, description="Thư mục lưu các file audio WAV sinh ra")

    # 4. Timing Plan
    fitMode: Optional[str] = Field("natural_flow", description="Chế độ khớp thời gian: natural_flow, stretch_video, speed_voice, fixed")
    voiceRate: Optional[float] = Field(1.0, description="Tỉ lệ tốc độ giọng đọc chung")
    globalVoiceRate: Optional[float] = Field(None, description="Bí danh của voiceRate")
    policy: Optional[Dict[str, Any]] = Field(None, description="Chính sách mượn thời gian (borrowLeft, borrowRight)")
    suggestRate: Optional[bool] = Field(None, description="Gợi ý tốc độ đọc theo phân cảnh")
    allowInfeasible: Optional[bool] = Field(True, description="Cho phép xuất ngay cả khi câu nói hơi dài so với cảnh")

    # 5. Export Video
    burnSubtitles: Optional[bool] = Field(True, description="Chèn (burn) phụ đề vào video")
    burnOverlays: Optional[bool] = Field(True, description="Chèn overlay/logo")
    videoVolume: Optional[float] = Field(0.2, description="Âm lượng video gốc (0.0 - 1.0)")
    ttsVolume: Optional[float] = Field(2.5, description="Âm lượng giọng đọc lồng tiếng (0.0 - 3.0)")
    speed: Optional[float] = Field(1.0, description="Tốc độ phát tổng thể video")
    crf: Optional[int] = Field(18, description="Chỉ số chất lượng nén FFmpeg (CRF)")
    exportPreset: Optional[str] = Field("medium", description="FFmpeg preset: ultrafast, fast, medium, slow")
    resolutionH: Optional[int] = Field(None, description="Chiều cao độ phân giải xuất: 720, 1080, 1440...")
    fps: Optional[float] = Field(None, description="Tốc độ khung hình (FPS)")
    bitrateKbps: Optional[int] = Field(None, description="Bitrate video (Kbps)")
    codec: Optional[str] = Field("h264", description="Codec video: h264, hevc...")
    container: Optional[str] = Field("mp4", description="Định dạng container: mp4, mkv...")
    ffmpegBinPath: Optional[str] = Field("ffmpeg", description="Đường dẫn thực thi FFmpeg")
    overlays: Optional[List[Dict[str, Any]]] = Field(default_factory=list)
    composition: Optional[Dict[str, Any]] = Field(None)
    background: Optional[Any] = Field(None)
    backgroundAudioPath: Optional[str] = Field(None)
    fontsDir: Optional[str] = Field(None)

    class Config:
        extra = "allow"


class CancelPipelineRequest(BaseModel):
    opId: Optional[str] = None
    op_id: Optional[str] = None

    class Config:
        extra = "allow"


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------
def probe_video_metadata(video_path: str, ffmpeg_bin: str = "ffmpeg") -> Dict[str, Any]:
    """
    Sử dụng ffprobe để đo chính xác thời lượng (duration), kích thước khung hình và fps của video.
    """
    ffprobe_bin = "ffprobe"
    if ffmpeg_bin and ffmpeg_bin != "ffmpeg":
        dir_name = os.path.dirname(ffmpeg_bin)
        base = os.path.basename(ffmpeg_bin).lower()
        if "ffmpeg" in base:
            probe_name = "ffprobe.exe" if base.endswith(".exe") else "ffprobe"
            candidate = os.path.join(dir_name, probe_name)
            if os.path.exists(candidate):
                ffprobe_bin = candidate

    cmd = [
        ffprobe_bin,
        "-v", "error",
        "-show_entries", "format=duration:stream=width,height,r_frame_rate,duration",
        "-of", "json",
        video_path,
    ]
    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True, text=True)
        data = json.loads(res.stdout)
        duration = 0.0
        if "format" in data and "duration" in data["format"]:
            try:
                duration = float(data["format"]["duration"] or 0.0)
            except (ValueError, TypeError):
                duration = 0.0

        width = 1920
        height = 1080
        fps = 30.0
        streams = data.get("streams", [])
        for s in streams:
            if s.get("width") and s.get("height"):
                try:
                    width = int(s["width"])
                    height = int(s["height"])
                except Exception:
                    pass
                if s.get("r_frame_rate"):
                    parts = str(s["r_frame_rate"]).split("/")
                    try:
                        if len(parts) == 2 and float(parts[1]) > 0:
                            fps = float(parts[0]) / float(parts[1])
                        elif len(parts) == 1:
                            fps = float(parts[0])
                    except Exception:
                        pass
                break

        return {
            "duration": duration,
            "width": width,
            "height": height,
            "fps": fps,
        }
    except Exception as e:
        logger.warning(f"[Pipeline] Không thể probe metadata video '{video_path}': {e}")
        return {
            "duration": 0.0,
            "width": 1920,
            "height": 1080,
            "fps": 30.0,
        }


def _update_pipeline_status(op_id: str, stage: str, message: str, percent: int) -> None:
    """Cập nhật tiến độ theo thời gian thực."""
    if not op_id:
        return
    ACTIVE_PIPELINES[op_id] = {
        "opId": op_id,
        "stage": stage,
        "message": message,
        "percent": percent,
        "updatedAt": time.time(),
    }


# ---------------------------------------------------------------------------
# Main Pipeline Endpoint: /api/transcript/pipeline
# ---------------------------------------------------------------------------
@router.post("/pipeline")
@router.post("/run-pipeline")
async def api_run_dubbing_pipeline(req_payload: Union[PipelineRequest, Dict[str, Any]]):
    """
    Endpoint thực thi quy trình lồng tiếng hoàn chỉnh tự động (End-to-End Dubbing Pipeline):
      Stage 0: Xác thực file nguồn, tạo đường dẫn đầu ra và probe thông số video
      Stage 1: Transcribe Video (ASR)
      Stage 2: Translate Segments (LLM Translation)
      Stage 3: Generate TTS Batch (VieNeu-TTS Turbo trên GPU)
      Stage 4: Compute Timing Plan (Đồng bộ nhịp điệu & co giãn timeline)
      Stage 5: Export Video (Render video có phụ đề và âm thanh lồng tiếng)
    """
    if hasattr(req_payload, "model_dump"):
        req = req_payload.model_dump()
    elif hasattr(req_payload, "dict"):
        req = req_payload.dict()
    else:
        req = dict(req_payload)

    # -----------------------------------------------------------------------
    # STAGE 0: KHỞI TẠO & XÁC THỰC THÔNG SỐ
    # -----------------------------------------------------------------------
    video_path = req.get("videoPath") or req.get("video_path") or req.get("sourceVideo")
    if not video_path:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Thiếu tham số bắt buộc 'videoPath' (đường dẫn video nguồn).",
        )

    norm_video_path = os.path.abspath(video_path)
    if not os.path.exists(norm_video_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tệp video nguồn không tồn tại trên đĩa: {norm_video_path}",
        )

    op_id = req.get("opId") or f"pipeline_{uuid.uuid4().hex[:12]}"
    settings = load_transcript_settings()
    ffmpeg_bin = req.get("ffmpegBinPath") or settings.get("ffmpegPath") or "ffmpeg"

    # Xác định đường dẫn file xuất
    output_file_path = req.get("outputFilePath") or req.get("output_file_path") or req.get("output_path")
    if not output_file_path:
        v_stem = Path(norm_video_path).stem
        v_dir = Path(norm_video_path).parent
        output_file_path = str(v_dir / f"{v_stem}_dubbed.mp4")

    output_file_path = os.path.abspath(output_file_path)

    # Kiểm tra trùng tên file nguồn và đích
    if canon_path(norm_video_path) == canon_path(output_file_path):
        v_stem = Path(norm_video_path).stem
        v_dir = Path(norm_video_path).parent
        output_file_path = str(v_dir / f"{v_stem}_dubbed_{uuid.uuid4().hex[:6]}.mp4")

    # Tạo thư mục đích nếu chưa có
    os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

    # Thư mục chứa audio TTS tạm
    tts_dir = req.get("ttsDir") or os.path.join(tempfile.gettempdir(), f"dubbing_tts_{op_id}")
    os.makedirs(tts_dir, exist_ok=True)

    # Probe thông tin video
    meta = probe_video_metadata(norm_video_path, ffmpeg_bin)
    media_duration = float(meta.get("duration", 0.0) or 0.0)
    logger.info(
        f"[Pipeline {op_id}] Bắt đầu pipeline lồng tiếng cho video '{norm_video_path}', "
        f"thời lượng={media_duration:.2f}s, output='{output_file_path}'"
    )

    _update_pipeline_status(op_id, "init", "Khởi tạo tác vụ lồng tiếng...", 5)

    segments: List[Dict[str, Any]] = []

    try:
        # -------------------------------------------------------------------
        # STAGE 1: TRANSCRIBE VIDEO (ASR)
        # -------------------------------------------------------------------
        initial_segments = req.get("initialSegments") or []
        if initial_segments and isinstance(initial_segments, list):
            logger.info(f"[Pipeline {op_id}] Sử dụng {len(initial_segments)} segments được cung cấp sẵn.")
            for idx, s in enumerate(initial_segments):
                segments.append({
                    "id": str(s.get("id") or (idx + 1)),
                    "startTime": float(s.get("startTime", 0.0)),
                    "endTime": float(s.get("endTime", 0.0)),
                    "text": str(s.get("text", "")).strip(),
                    "translation": str(s.get("translation", "")).strip(),
                })
        else:
            transcribe_engine = (req.get("transcribeEngine") or settings.get("transcribeEngine") or "capcut").lower().strip()
            source_lang = req.get("sourceLang") or settings.get("translateSourceLang") or "auto"
            target_lang = req.get("targetLang") or settings.get("translateTargetLang") or "vi"
            video_segments = req.get("videoSegments") or []

            _update_pipeline_status(op_id, "transcribe", f"Đang nhận diện giọng nói ({transcribe_engine})...", 15)
            logger.info(f"[Pipeline {op_id}] [Stage 1: Transcribe] Bắt đầu phiên âm engine='{transcribe_engine}', sourceLang='{source_lang}'...")

            transcribe_data = {
                "videoPath": norm_video_path,
                "targetLang": target_lang,
                "sourceLang": source_lang,
                "transcribeEngine": transcribe_engine,
                "videoSegments": video_segments,
                "opId": op_id,
            }

            raw_transcribe = await run_node_helper(
                action="transcribe-video",
                data=transcribe_data,
                settings=settings,
            )

            if isinstance(raw_transcribe, list):
                for idx, item in enumerate(raw_transcribe):
                    if not isinstance(item, dict):
                        continue
                    segments.append({
                        "id": str(item.get("id") or (idx + 1)),
                        "startTime": float(item.get("startTime", 0.0)),
                        "endTime": float(item.get("endTime", 0.0)),
                        "text": str(item.get("text", "")).strip(),
                        "translation": str(item.get("translation", "")).strip(),
                    })
            else:
                logger.warning(f"[Pipeline {op_id}] Kết quả phiên âm bất thường: {type(raw_transcribe)}")

            if not segments:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="Không nhận diện được phân đoạn giọng nói nào trong video nguồn.",
                )

            logger.info(f"[Pipeline {op_id}] [Stage 1: Transcribe] Hoàn tất: {len(segments)} segments.")

        # -------------------------------------------------------------------
        # STAGE 2: TRANSLATE SEGMENTS (LLM)
        # -------------------------------------------------------------------
        target_lang = req.get("targetLang") or settings.get("translateTargetLang") or "vi"
        source_lang = req.get("sourceLang") or settings.get("translateSourceLang") or "auto"
        preset = req.get("preset") or settings.get("translatePromptPreset") or "default"
        provider = req.get("provider") or settings.get("translateProvider") or "custom"
        model = req.get("model") or (settings.get("customModel") if provider == "custom" else settings.get("deepseekModel")) or "gemini-lite"
        parallel_jobs = int(req.get("parallelJobs") or settings.get("translateParallelJobs") or 1)

        _update_pipeline_status(op_id, "translate", f"Đang dịch {len(segments)} câu sang '{target_lang}'...", 35)
        logger.info(f"[Pipeline {op_id}] [Stage 2: Translate] Bắt đầu dịch {len(segments)} câu (model='{model}', provider='{provider}')...")

        translate_data = {
            "segments": segments,
            "targetLang": target_lang,
            "source": source_lang,
            "sourceLang": source_lang,
            "preset": preset,
            "model": model,
            "provider": provider,
            "parallelJobs": parallel_jobs,
            "glossary": req.get("glossary") or [],
            "bible": req.get("bible"),
            "speakers": req.get("speakers") or [],
            "videoPath": norm_video_path,
            "opId": op_id,
        }
        if req.get("polish") is not None:
            translate_data["polish"] = req.get("polish")

        translate_res = await run_node_helper(
            action="translate-segments",
            data=translate_data,
            settings=settings,
        )

        # Gán bản dịch vào từng segment
        if isinstance(translate_res, dict):
            translations = translate_res.get("translations") or []
            ids = translate_res.get("ids") or []
            dubbing_map = translate_res.get("dubbing") or {}

            id_to_trans: Dict[str, str] = {}
            for idx, tid in enumerate(ids):
                if idx < len(translations):
                    id_to_trans[str(tid)] = str(translations[idx])

            for idx, seg in enumerate(segments):
                sid = str(seg["id"])
                trans = id_to_trans.get(sid) or (translations[idx] if idx < len(translations) else "") or seg.get("translation", "")
                seg["translation"] = trans
                seg["subtitleText"] = trans
                dubbing_text = dubbing_map.get(sid) if isinstance(dubbing_map, dict) else None
                seg["dubbingText"] = dubbing_text or trans
        elif isinstance(translate_res, list):
            for idx, item in enumerate(translate_res):
                if idx < len(segments) and isinstance(item, dict):
                    t = item.get("translation") or item.get("text") or ""
                    segments[idx]["translation"] = t
                    segments[idx]["subtitleText"] = t
                    segments[idx]["dubbingText"] = item.get("dubbingText") or t

        logger.info(f"[Pipeline {op_id}] [Stage 2: Translate] Dịch thuật hoàn tất thành công.")

        # -------------------------------------------------------------------
        # STAGE 3: GENERATE TTS BATCH (VIENEU-TTS TURBO)
        # -------------------------------------------------------------------
        default_voice_setting = settings.get("defaultTtsVoice") or settings.get("ttsVoice") or "vieneu:Ngọc Huyền"
        raw_voice = req.get("voiceId") or req.get("voice") or default_voice_setting
        voice_id = normalize_voice_id(raw_voice, "Ngọc Huyền")
        tts_speed = float(req.get("ttsSpeed") or settings.get("defaultTtsSpeed") or 1.0)

        _update_pipeline_status(op_id, "tts", f"Đang tổng hợp giọng nói ({voice_id})...", 55)
        logger.info(f"[Pipeline {op_id}] [Stage 3: TTS] Sinh giọng nói batch cho {len(segments)} câu bằng giọng '{voice_id}'...")

        tts_items: List[Dict[str, Any]] = []
        for idx, seg in enumerate(segments):
            sid = str(seg.get("id") or (idx + 1))
            spoken_text = str(seg.get("dubbingText") or seg.get("translation") or seg.get("text") or "").strip()
            if not spoken_text:
                spoken_text = "."

            dest_wav = os.path.normpath(os.path.join(tts_dir, f"tts_{sid}.wav"))
            tts_items.append({
                "id": sid,
                "text": spoken_text,
                "voiceId": voice_id,
                "destPath": dest_wav,
                "speed": tts_speed,
                "startTime": float(seg.get("startTime", 0.0)),
                "endTime": float(seg.get("endTime", 0.0)),
            })

        tts_batch_res = await asyncio.to_thread(
            generate_tts_batch_sync,
            items=tts_items,
            op_id=op_id,
            language=target_lang,
        )

        tts_results = tts_batch_res.get("results") or []
        res_map = {str(r.get("id")): r for r in tts_results if isinstance(r, dict)}

        for seg in segments:
            sid = str(seg.get("id"))
            r = res_map.get(sid)
            if r and r.get("success"):
                seg["audioPath"] = r.get("outputPath")
                seg["audioDuration"] = float(r.get("durationSeconds") or 0.0)
            else:
                dest_wav = os.path.normpath(os.path.join(tts_dir, f"tts_{sid}.wav"))
                if os.path.exists(dest_wav) and os.path.getsize(dest_wav) > 44:
                    seg["audioPath"] = dest_wav
                    seg["audioDuration"] = max(0.5, float(seg.get("endTime", 0.0)) - float(seg.get("startTime", 0.0)))
                else:
                    logger.warning(f"[Pipeline {op_id}] Segment {sid} thiếu âm thanh TTS.")

        logger.info(f"[Pipeline {op_id}] [Stage 3: TTS] Đã sinh xong âm thanh cho {len(segments)} câu.")

        # -------------------------------------------------------------------
        # STAGE 4: COMPUTE TIMING PLAN
        # -------------------------------------------------------------------
        voice_rate = float(req.get("voiceRate") or req.get("globalVoiceRate") or 1.0)
        fit_mode = req.get("fitMode") or "natural_flow"
        video_segments = req.get("videoSegments") or []

        _update_pipeline_status(op_id, "timing_plan", "Đang tính toán kịch bản khớp thời gian...", 75)
        logger.info(f"[Pipeline {op_id}] [Stage 4: Timing Plan] Tính toán timing plan (fitMode='{fit_mode}', rate={voice_rate})...")

        timing_data = {
            "segments": segments,
            "totalDuration": media_duration if media_duration > 0 else None,
            "mediaDuration": media_duration if media_duration > 0 else None,
            "globalVoiceRate": voice_rate,
            "videoSegments": video_segments,
            "policy": req.get("policy"),
            "suggestRate": req.get("suggestRate"),
            "voiceId": voice_id,
        }

        timing_plan = await run_node_helper(
            action="compute-timing-plan",
            data=timing_data,
            settings=settings,
        )

        feasible = timing_plan.get("feasible", True) if isinstance(timing_plan, dict) else True
        infeasible_ids = timing_plan.get("infeasibleUnitIds", []) if isinstance(timing_plan, dict) else []
        logger.info(
            f"[Pipeline {op_id}] [Stage 4: Timing Plan] Hoàn tất. Feasible={feasible}, "
            f"infeasibleCount={len(infeasible_ids)}, units={len(timing_plan.get('units') or []) if isinstance(timing_plan, dict) else 0}"
        )

        # -------------------------------------------------------------------
        # STAGE 5: EXPORT VIDEO (FFMPEG)
        # -------------------------------------------------------------------
        _update_pipeline_status(op_id, "export", f"Đang xuất video hoàn chỉnh ({output_file_path})...", 85)
        logger.info(f"[Pipeline {op_id}] [Stage 5: Export] Bắt đầu xuất video FFmpeg...")

        fonts_dir = req.get("fontsDir") or (str(FRONTEND_DIR / "fonts") if (FRONTEND_DIR / "fonts").exists() else None)
        mock_export_policy = {
            "max_project_duration_sec": None,
            "max_output_duration_sec": None,
            "watermark_profile": None,
        }

        bg_audio = req.get("backgroundAudioPath")
        if bg_audio and not os.path.exists(bg_audio):
            logger.warning(f"[Pipeline {op_id}] backgroundAudioPath '{bg_audio}' không tồn tại, bỏ qua.")
            bg_audio = None

        export_data: Dict[str, Any] = {
            "opId": op_id,
            "sourceVideo": norm_video_path,
            "outputFilePath": output_file_path,
            "segments": segments,
            "videoSegments": video_segments,
            "overlays": req.get("overlays") or [],
            "speed": float(req.get("speed") or 1.0),
            "fitMode": fit_mode,
            "voiceRate": voice_rate,
            "crf": int(req.get("crf") or 18),
            "preset": req.get("exportPreset") or req.get("preset") or "medium",
            "resolutionH": req.get("resolutionH"),
            "fps": req.get("fps") or meta.get("fps"),
            "bitrateKbps": req.get("bitrateKbps"),
            "codec": req.get("codec") or "h264",
            "container": req.get("container") or "mp4",
            "videoVolume": float(req.get("videoVolume", 0.2)),
            "ttsVolume": float(req.get("ttsVolume", 2.5)),
            "backgroundAudioPath": bg_audio,
            "burnSubtitles": req.get("burnSubtitles", True),
            "burnOverlays": req.get("burnOverlays", True),
            "allowInfeasible": req.get("allowInfeasible", True),
            "ffmpegBinPath": ffmpeg_bin,
            "fontsDir": fonts_dir,
            "composition": req.get("composition"),
            "background": req.get("background"),
            "exportPolicy": mock_export_policy,
        }

        export_res = await run_node_helper(
            action="export-video",
            data=export_data,
            settings=settings,
        )

        final_output = (export_res.get("outputFilePath") if isinstance(export_res, dict) else None) or output_file_path
        out_size = os.path.getsize(final_output) if os.path.exists(final_output) else 0

        _update_pipeline_status(op_id, "done", "Quy trình lồng tiếng hoàn tất thành công!", 100)
        logger.info(
            f"[Pipeline {op_id}] Hoàn tất xuất sắc! File video đầu ra: '{final_output}' "
            f"(kích thước: {out_size} bytes, segments={len(segments)})"
        )

        return {
            "success": True,
            "opId": op_id,
            "sourceVideo": norm_video_path,
            "outputFilePath": final_output,
            "sizeBytes": out_size,
            "message": "Dubbing pipeline completed successfully",
            "videoDuration": media_duration,
            "segmentsCount": len(segments),
            "timingPlan": timing_plan,
            "segments": segments,
            "cancelled": False,
        }

    except NodeHelperCancelledError:
        logger.info(f"[Pipeline {op_id}] Tác vụ đã bị người dùng hủy.")
        _remove_partial_output(output_file_path)
        cancel_tts_op(op_id)
        _update_pipeline_status(op_id, "cancelled", "Tác vụ đã bị hủy", 0)
        return {
            "success": False,
            "cancelled": True,
            "opId": op_id,
            "message": "Pipeline was cancelled by user.",
            "outputFilePath": output_file_path,
        }

    except NodeHelperError as e:
        logger.error(f"[Pipeline {op_id}] NodeHelperError tại pipeline: {e.code} - {e.message}")
        _remove_partial_output(output_file_path)
        cancel_tts_op(op_id)
        _update_pipeline_status(op_id, "error", f"Lỗi: {e.message}", 0)
        status_code = _NODE_EXPORT_ERROR_STATUS.get(e.code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        error_body = _export_error_body(e.code, e.message, getattr(e, "details", None))
        raise HTTPException(status_code=status_code, detail=error_body)

    except HTTPException:
        _remove_partial_output(output_file_path)
        cancel_tts_op(op_id)
        raise

    except Exception as e:
        logger.error(f"[Pipeline {op_id}] Lỗi không xác định trong pipeline: {e}", exc_info=True)
        _remove_partial_output(output_file_path)
        cancel_tts_op(op_id)
        _update_pipeline_status(op_id, "error", f"Lỗi không xác định: {str(e)}", 0)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=_export_error_body("PIPELINE_FAILED", f"Lỗi thực thi pipeline: {str(e)}"),
        )


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/cancel-pipeline
# ---------------------------------------------------------------------------
@router.post("/cancel-pipeline")
async def api_cancel_pipeline(body: Union[CancelPipelineRequest, Dict[str, Any]]):
    """
    Hủy toàn bộ tác vụ pipeline đang chạy (bao gồm cả tiến trình Node và luồng TTS).
    """
    if hasattr(body, "model_dump"):
        data = body.model_dump()
    elif hasattr(body, "dict"):
        data = body.dict()
    else:
        data = dict(body)

    op_id = data.get("opId") or data.get("op_id") or ""
    node_cancelled = False
    if op_id:
        node_cancelled = cancel_node_helper(op_id)
        cancel_tts_op(op_id)
        _update_pipeline_status(op_id, "cancelled", "Yêu cầu hủy đã được tiếp nhận.", 0)
        logger.info(f"[Pipeline] Đã hủy tác vụ pipeline opId='{op_id}'")

    return {
        "status": "cancelled",
        "opId": op_id,
        "nodeCancelled": node_cancelled,
    }


# ---------------------------------------------------------------------------
# Endpoint: /api/transcript/pipeline-status/{op_id}
# ---------------------------------------------------------------------------
@router.get("/pipeline-status/{op_id}")
async def api_pipeline_status(op_id: str):
    """
    Kiểm tra trạng thái và tiến độ xử lý hiện tại của một pipeline job.
    """
    state = ACTIVE_PIPELINES.get(op_id)
    if not state:
        return {
            "opId": op_id,
            "status": "unknown",
            "message": "Không tìm thấy thông tin tác vụ.",
        }
    return state
