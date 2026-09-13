# -*- coding: utf-8 -*-
"""
Video & Audio Processing Service for Dubbing Pipeline
Chuyên trách:
1. Probe chi tiết media (video/audio codecs, resolution, fps, sample rate, channels, v.v.).
2. Tự động phát hiện GPU (NVIDIA NVENC, Apple VideoToolbox, Intel QSV, AMD AMF) để tối ưu render, fallback CPU (libx264).
3. Kiểm tra tính đồng nhất của danh sách video và render chuẩn hóa (re-encode) những video dị biệt về cùng định dạng chuẩn.
4. Ghép video nối tiếp siêu tốc bằng Stream Copy (FFmpeg concat demuxer).
5. Trích xuất và ghép audio chuẩn (resample 48kHz stereo) của các tập để tránh lệch nhịp và giật tiếng (crackling/glitches).
6. Ghép audio TTS và xử lý âm thanh gốc của video (giảm volume gốc xuống 0.1 và định kỳ mỗi 0.9s thì mute 0.1s).
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import shutil
import subprocess
import tempfile
import time
from collections import Counter
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Tuple, Union

from service.media_service import get_ffmpeg_path, get_ffprobe_path

logger = logging.getLogger("service_handle_video")

# Cache thông tin encoder GPU khả dụng
_DETECTED_GPU_ENCODER: Optional[str] = None
_GPU_CHECK_DONE = False


# ---------------------------------------------------------------------------
# 1. GPU & Encoder Detection
# ---------------------------------------------------------------------------

def detect_best_video_encoder(ffmpeg_bin: Optional[str] = None) -> Tuple[str, List[str]]:
    """
    Tự động phát hiện encoder video tốt nhất trên hệ thống:
    - Thử nghiệm theo thứ tự ưu tiên: NVIDIA (h264_nvenc) -> Intel (h264_qsv) -> AMD (h264_amf) -> CPU (libx264).
    - Trả về tuple: (encoder_name, default_encoder_flags).
    """
    global _DETECTED_GPU_ENCODER, _GPU_CHECK_DONE
    if _GPU_CHECK_DONE and _DETECTED_GPU_ENCODER is not None:
        if _DETECTED_GPU_ENCODER == "h264_nvenc":
            return "h264_nvenc", ["-preset", "p4", "-tune", "hq"]
        elif _DETECTED_GPU_ENCODER == "h264_qsv":
            return "h264_qsv", ["-preset", "medium"]
        elif _DETECTED_GPU_ENCODER == "h264_amf":
            return "h264_amf", ["-quality", "speed"]
        else:
            return "libx264", ["-preset", "fast", "-crf", "20"]

    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    
    # Danh sách các encoder GPU theo thứ tự ưu tiên
    candidates = [
        ("h264_nvenc", ["-preset", "p4", "-tune", "hq"]),
        ("h264_qsv", ["-preset", "medium"]),
        ("h264_amf", ["-quality", "speed"]),
    ]

    for enc, flags in candidates:
        try:
            # Thử encode test 1 frame giả lập với encoder đó xem hardware có hỗ trợ thực tế không
            cmd = [
                ffmpeg,
                "-y",
                "-f", "lavfi",
                "-i", "testsrc=size=128x128:rate=1:duration=0.1",
                "-c:v", enc,
                *flags,
                "-f", "null",
                "-",
            ]
            res = subprocess.run(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=5,
            )
            if res.returncode == 0:
                logger.info(f"[GPU Detection] Phát hiện GPU encoder khả dụng: {enc}")
                _DETECTED_GPU_ENCODER = enc
                _GPU_CHECK_DONE = True
                return enc, flags
        except Exception as e:
            logger.debug(f"[GPU Detection] Thử encoder {enc} thất bại: {e}")

    logger.info("[GPU Detection] Không có GPU hardware encoder phù hợp hoặc thử nghiệm không thành công, sử dụng CPU (libx264).")
    _DETECTED_GPU_ENCODER = "libx264"
    _GPU_CHECK_DONE = True
    return "libx264", ["-preset", "fast", "-crf", "20"]


# ---------------------------------------------------------------------------
# 2. Media Probe & Detailed Inspection
# ---------------------------------------------------------------------------

def probe_video_detail(file_path: str, ffmpeg_bin: Optional[str] = None) -> Dict[str, Any]:
    """
    Sử dụng ffprobe để lấy toàn bộ thông tin kỹ thuật của video:
    - Format, duration, bitrate.
    - Video stream: codec_name, profile, pixel_format, width, height, fps, time_base.
    - Audio stream: codec_name, sample_rate, channels, channel_layout, time_base.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Không tìm thấy file: {file_path}")

    ffprobe = get_ffprobe_path(ffmpeg_bin)
    cmd = [
        ffprobe,
        "-v", "error",
        "-show_format",
        "-show_streams",
        "-of", "json",
        file_path,
    ]

    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        data = json.loads(res.stdout)
    except Exception as exc:
        logger.error(f"Lỗi khi probe file {file_path}: {exc}")
        raise RuntimeError(f"Lỗi khi phân tích định dạng media '{file_path}': {exc}")

    format_info = data.get("format", {})
    streams = data.get("streams", [])

    duration = float(format_info.get("duration", 0.0) or 0.0)
    
    v_stream = next((s for s in streams if s.get("codec_type") == "video"), None)
    a_stream = next((s for s in streams if s.get("codec_type") == "audio"), None)

    width = 0
    height = 0
    fps = 30.0
    v_codec = ""
    pix_fmt = ""
    
    if v_stream:
        width = int(v_stream.get("width", 0) or 0)
        height = int(v_stream.get("height", 0) or 0)
        v_codec = str(v_stream.get("codec_name", "")).lower()
        pix_fmt = str(v_stream.get("pix_fmt", "")).lower()
        
        # Frame rate
        r_fps = v_stream.get("r_frame_rate", "30/1")
        if "/" in str(r_fps):
            parts = str(r_fps).split("/")
            try:
                if len(parts) == 2 and float(parts[1]) > 0:
                    fps = float(parts[0]) / float(parts[1])
            except Exception:
                pass
        else:
            try:
                fps = float(r_fps)
            except Exception:
                pass

    a_codec = ""
    sample_rate = 44100
    channels = 2
    if a_stream:
        a_codec = str(a_stream.get("codec_name", "")).lower()
        sample_rate = int(a_stream.get("sample_rate", 44100) or 44100)
        channels = int(a_stream.get("channels", 2) or 2)

    return {
        "filePath": file_path,
        "duration": duration,
        "hasVideo": v_stream is not None,
        "hasAudio": a_stream is not None,
        "width": width,
        "height": height,
        "fps": round(fps, 3),
        "videoCodec": v_codec,
        "pixFmt": pix_fmt,
        "audioCodec": a_codec,
        "sampleRate": sample_rate,
        "channels": channels,
    }


# ---------------------------------------------------------------------------
# 3. Format Consistency Verification & Re-encoding
# ---------------------------------------------------------------------------

def normalize_video_format(
    input_video: str,
    output_video: str,
    target_spec: Dict[str, Any],
    ffmpeg_bin: Optional[str] = None,
) -> str:
    """
    Render lại video dị biệt (re-encode) về đúng chuẩn mục tiêu (width, height, fps, pix_fmt, sample_rate, channels).
    Tự động áp dụng GPU encoder nếu có.
    """
    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    enc, flags = detect_best_video_encoder(ffmpeg_bin)

    target_w = target_spec.get("width", 1080)
    target_h = target_spec.get("height", 1920)
    target_fps = target_spec.get("fps", 30.0)
    target_sample_rate = target_spec.get("sampleRate", 48000)

    # Scale filter pad để giữ đúng tỷ lệ khung hình chuẩn
    vf = f"scale={target_w}:{target_h}:force_original_aspect_ratio=decrease,pad={target_w}:{target_h}:(ow-iw)/2:(oh-ih)/2,fps={target_fps},format=yuv420p"

    cmd = [
        ffmpeg,
        "-y",
        "-i", input_video,
        "-vf", vf,
        "-c:v", enc,
        *flags,
        "-c:a", "aac",
        "-ar", str(target_sample_rate),
        "-ac", "2",
        "-b:a", "192k",
        "-movflags", "+faststart",
        output_video,
    ]

    logger.info(f"[Normalize Video] Đang render chuẩn hóa file dị biệt: {input_video} -> {output_video} (Encoder: {enc})")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        logger.error(f"[Normalize Video] Lỗi render chuẩn hóa video: {res.stderr}")
        # Nếu GPU lỗi, fallback sang CPU libx264
        if enc != "libx264":
            logger.warning("[Normalize Video] Fallback sang CPU libx264...")
            fallback_cmd = [
                ffmpeg,
                "-y",
                "-i", input_video,
                "-vf", vf,
                "-c:v", "libx264",
                "-preset", "fast",
                "-crf", "20",
                "-c:a", "aac",
                "-ar", str(target_sample_rate),
                "-ac", "2",
                "-b:a", "192k",
                "-movflags", "+faststart",
                output_video,
            ]
            res_cpu = subprocess.run(fallback_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if res_cpu.returncode != 0:
                raise RuntimeError(f"Lỗi chuẩn hóa video với CPU: {res_cpu.stderr}")
        else:
            raise RuntimeError(f"Lỗi chuẩn hóa video: {res.stderr}")

    return output_video


def ensure_homogeneous_videos(
    video_paths: List[str],
    temp_dir: str,
    ffmpeg_bin: Optional[str] = None,
    log_callback: Optional[Callable[[str], None]] = None,
) -> List[str]:
    """
    Kiểm tra danh sách video:
    - Nếu tất cả video cùng định dạng -> giữ nguyên để stream copy.
    - Nếu có video dị biệt (khác resolution, fps, codec, hoặc audio sample rate) -> xác định chuẩn đa số (majority)
      và re-encode các video dị biệt để đồng bộ toàn bộ danh sách.
    """
    if not video_paths:
        return []

    if len(video_paths) == 1:
        return list(video_paths)

    if log_callback:
        log_callback(f"[Kiểm tra định dạng] Đang quét metadata {len(video_paths)} video...")

    specs = [probe_video_detail(p, ffmpeg_bin) for p in video_paths]

    # Nhận diện chuẩn đa số (dominant standard)
    resolutions = Counter((s["width"], s["height"]) for s in specs)
    fps_counts = Counter(s["fps"] for s in specs)
    v_codec_counts = Counter(s["videoCodec"] for s in specs)
    a_codec_counts = Counter(s["audioCodec"] for s in specs)

    dom_res = resolutions.most_common(1)[0][0]
    dom_fps = fps_counts.most_common(1)[0][0]
    dom_vcodec = v_codec_counts.most_common(1)[0][0]
    dom_acodec = a_codec_counts.most_common(1)[0][0]

    majority_spec = {
        "width": dom_res[0],
        "height": dom_res[1],
        "fps": dom_fps,
        "videoCodec": dom_vcodec,
        "audioCodec": dom_acodec,
        "sampleRate": 48000,
    }

    logger.info(
        f"[Check Formats] Chuẩn đa số: {dom_res[0]}x{dom_res[1]} @ {dom_fps}fps, "
        f"video_codec={dom_vcodec}, audio_codec={dom_acodec}"
    )

    result_paths: List[str] = []
    reencoded_count = 0

    for idx, (p, spec) in enumerate(zip(video_paths, specs)):
        is_diff = False
        if (spec["width"], spec["height"]) != dom_res:
            is_diff = True
        elif abs(spec["fps"] - dom_fps) > 0.5:
            is_diff = True
        elif spec["videoCodec"] != dom_vcodec or not spec["hasAudio"]:
            is_diff = True

        if is_diff:
            reencoded_count += 1
            if log_callback:
                log_callback(
                    f"[Đồng bộ format] Tập {idx + 1} có định dạng khác ({spec['width']}x{spec['height']} @ {spec['fps']}fps), "
                    f"đang render lại..."
                )
            out_name = f"normalized_ep_{idx + 1}_{Path(p).stem}.mp4"
            out_path = os.path.join(temp_dir, out_name)
            normalize_video_format(p, out_path, majority_spec, ffmpeg_bin)
            result_paths.append(out_path)
        else:
            result_paths.append(p)

    if reencoded_count > 0:
        logger.info(f"[Check Formats] Đã render lại {reencoded_count}/{len(video_paths)} video dị biệt để đồng bộ.")
        if log_callback:
            log_callback(f"[Đồng bộ format] Hoàn thành đồng bộ {reencoded_count} video dị biệt.")
    else:
        logger.info("[Check Formats] Tất cả video đều đồng nhất định dạng, sẵn sàng stream copy ghép nối tiếp.")
        if log_callback:
            log_callback("[Đồng bộ format] Toàn bộ video đã đồng nhất định dạng.")

    return result_paths


# ---------------------------------------------------------------------------
# 4. Stream Copy Video Concatenation (Nối video siêu tốc)
# ---------------------------------------------------------------------------

def concat_videos_stream_copy(
    video_paths: List[str],
    output_path: str,
    ffmpeg_bin: Optional[str] = None,
) -> str:
    """
    Ghép nối tiếp nhiều video bằng FFmpeg concat demuxer với mode STREAM COPY (-c copy).
    Thời gian ghép chỉ mất vài giây cho hàng chục tập phim.
    """
    if not video_paths:
        raise ValueError("Danh sách video ghép không được để trống")

    if len(video_paths) == 1:
        shutil.copy2(video_paths[0], output_path)
        return output_path

    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    # Tạo tệp list.txt cho concat demuxer
    concat_list_file = os.path.join(os.path.dirname(output_path), f"concat_{time.time_ns()}.txt")
    with open(concat_list_file, "w", encoding="utf-8") as f:
        for vp in video_paths:
            # Escape single quote trong đường dẫn theo chuẩn FFmpeg concat demuxer
            safe_p = os.path.abspath(vp).replace("'", "'\\''")
            f.write(f"file '{safe_p}'\n")

    cmd = [
        ffmpeg,
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_list_file,
        "-c", "copy",
        "-movflags", "+faststart",
        output_path,
    ]

    try:
        logger.info(f"[Concat Stream Copy] Đang ghép {len(video_paths)} video vào '{output_path}'...")
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res.returncode != 0:
            logger.error(f"[Concat Stream Copy] Thất bại: {res.stderr}")
            raise RuntimeError(f"FFmpeg concat stream copy thất bại: {res.stderr}")
    finally:
        if os.path.exists(concat_list_file):
            try:
                os.remove(concat_list_file)
            except Exception:
                pass

    return output_path


# ---------------------------------------------------------------------------
# 5. Extract & Concat Standard Audio (Tránh giật tiếng / vấp tiếng)
# ---------------------------------------------------------------------------

def extract_and_concat_clean_audio(
    video_paths: List[str],
    output_audio_path: str,
    target_sample_rate: int = 48000,
    ffmpeg_bin: Optional[str] = None,
) -> str:
    """
    Ghép audio của các tập lại với chuẩn thống nhất (48kHz stereo AAC/WAV, aresample với async=1000)
    để tránh bị giật tiếng, vấp tiếng (jitter/crackling/pops) do lệch sample rate hoặc timestamp gap giữa các tập.
    """
    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    os.makedirs(os.path.dirname(os.path.abspath(output_audio_path)), exist_ok=True)

    # Sử dụng concat audio filter
    inputs: List[str] = []
    filter_parts: List[str] = []
    for i, vp in enumerate(video_paths):
        inputs.extend(["-i", vp])
        # Chuẩn hóa từng stream audio trước khi concat: resample và format stereo
        filter_parts.append(f"[{i}:a]aresample={target_sample_rate}:async=1000,aformat=sample_fmts=fltp:channel_layouts=stereo[a{i}];")

    concat_inputs = "".join(f"[a{i}]" for i in range(len(video_paths)))
    filter_complex = "".join(filter_parts) + f"{concat_inputs}concat=n={len(video_paths)}:v=0:a=1[aout]"

    cmd = [
        ffmpeg,
        "-y",
        *inputs,
        "-filter_complex", filter_complex,
        "-map", "[aout]",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", str(target_sample_rate),
        output_audio_path,
    ]

    logger.info(f"[Concat Audio] Đang trích xuất & nối audio chuẩn cho {len(video_paths)} tập...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        logger.error(f"[Concat Audio] Thất bại: {res.stderr}")
        raise RuntimeError(f"Trích xuất & nối audio thất bại: {res.stderr}")

    return output_audio_path


# ---------------------------------------------------------------------------
# 6. Audio Ducking & Periodic Muting Filter
# ---------------------------------------------------------------------------

def create_tts_audio_track(
    segments: List[Dict[str, Any]],
    total_duration: float,
    output_tts_wav: str,
    sample_rate: int = 48000,
    ffmpeg_bin: Optional[str] = None,
) -> str:
    """
    Tạo 1 track audio WAV hoàn chỉnh chứa toàn bộ các câu thoại TTS theo đúng thời điểm (plannedStart / startTime).
    Sử dụng FFmpeg adelay và amix để đặt từng câu đúng vị trí trên timeline.
    """
    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    os.makedirs(os.path.dirname(os.path.abspath(output_tts_wav)), exist_ok=True)

    valid_items = []
    for s in segments:
        a_path = s.get("audioPath")
        if a_path and os.path.exists(a_path) and os.path.getsize(a_path) > 44:
            start_t = float(s.get("plannedStart", s.get("startTime", 0.0)) or 0.0)
            end_t = float(s.get("plannedEnd", s.get("endTime", 0.0)) or 0.0)
            orig_dur = float(s.get("audioDuration") or 0.0)
            
            # Tính toán tempo (tốc độ đọc) để audio TTS khớp hoàn toàn với slot thời gian planned
            tempo = 1.0
            slot_dur = end_t - start_t
            if slot_dur > 0.1 and orig_dur > 0.1:
                # Nếu audio dài hơn slot thời gian cho phép, tăng tốc audio
                ratio = orig_dur / slot_dur
                if ratio > 1.05:
                    tempo = ratio
            
            # Lấy tempo từ timing plan unit nếu có
            if s.get("audioTempo"):
                try:
                    tempo = float(s.get("audioTempo"))
                except (ValueError, TypeError):
                    pass

            valid_items.append((a_path, max(0.0, start_t), max(0.5, tempo)))

    dur = max(1.0, total_duration)

    if not valid_items:
        # Tạo silent audio nếu không có TTS nào
        cmd = [
            ffmpeg,
            "-y",
            "-f", "lavfi",
            "-i", f"anullsrc=channel_layout=stereo:sample_rate={sample_rate}",
            "-t", str(dur),
            "-c:a", "pcm_s16le",
            output_tts_wav,
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        return output_tts_wav

    # Chia nhỏ valid_items thành từng chunk (mỗi chunk 50 file audio) để không bị tràn 8191 ký tự Win32 CreateProcess
    CHUNK_SIZE = 50
    chunk_wav_files = []
    temp_dir = os.path.dirname(os.path.abspath(output_tts_wav))

    try:
        for chunk_idx, i in enumerate(range(0, len(valid_items), CHUNK_SIZE)):
            chunk_items = valid_items[i : i + CHUNK_SIZE]
            chunk_output_wav = os.path.join(temp_dir, f"_temp_tts_chunk_{chunk_idx}.wav")
            chunk_script_path = os.path.join(temp_dir, f"_temp_tts_script_{chunk_idx}.txt")

            cmd = [
                ffmpeg,
                "-y",
            ]

            filter_chains = []
            mix_inputs = []

            for idx, (wav_path, start_t, tempo) in enumerate(chunk_items):
                cmd.extend(["-i", wav_path])
                delay_ms = int(round(start_t * 1000))
                
                # Cấu hình filter atempo chuẩn node_helper.js
                if abs(tempo - 1.0) >= 0.02:
                    if tempo > 2.0:
                        tempo_filter = f"atempo=2.0,atempo={tempo/2.0:.3f},"
                    elif tempo < 0.5:
                        tempo_filter = f"atempo=0.5,atempo={tempo/0.5:.3f},"
                    else:
                        tempo_filter = f"atempo={tempo:.3f},"
                else:
                    tempo_filter = ""

                # Áp dụng atempo, aresample, adelay, volume=1.5 giống node_helper.js
                filter_chains.append(
                    f"[{idx}:a]{tempo_filter}aresample={sample_rate},adelay={delay_ms}|{delay_ms},volume=1.50[tts{idx}]"
                )
                mix_inputs.append(f"[tts{idx}]")

            # Mô phỏng amix chuẩn node_helper.js: amix=inputs=N:duration=longest:dropout_transition=0:normalize=0[aout]
            num_inputs = len(mix_inputs)
            if num_inputs == 1:
                mix_filter = f"{mix_inputs[0]}anull[aout]"
            else:
                mix_filter = "".join(mix_inputs) + f"amix=inputs={num_inputs}:duration=longest:dropout_transition=0:normalize=0[aout]"

            full_filter = ";\n".join(filter_chains) + ";\n" + mix_filter

            with open(chunk_script_path, "w", encoding="utf-8") as f:
                f.write(full_filter)

            cmd.extend([
                "-t", str(dur),
                "-filter_complex_script", chunk_script_path,
                "-map", "[aout]",
                "-c:a", "pcm_s16le",
                chunk_output_wav,
            ])

            res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if os.path.exists(chunk_script_path):
                try:
                    os.unlink(chunk_script_path)
                except Exception:
                    pass

            if res.returncode != 0:
                logger.error(f"[Create TTS Audio Track] Lỗi tạo chunk {chunk_idx}: {res.stderr}")
                raise RuntimeError(f"Lỗi tạo chunk TTS audio: {res.stderr}")

            chunk_wav_files.append(chunk_output_wav)

        if len(chunk_wav_files) == 1:
            if os.path.exists(output_tts_wav):
                os.unlink(output_tts_wav)
            os.rename(chunk_wav_files[0], output_tts_wav)
        else:
            # Mix các chunks lại với nhau chuẩn node_helper.js
            cmd_mix = [
                ffmpeg,
                "-y",
            ]
            mix_inputs = []
            for idx, cw in enumerate(chunk_wav_files):
                cmd_mix.extend(["-i", cw])
                mix_inputs.append(f"[{idx}:a]")

            mix_filter = "".join(mix_inputs) + f"amix=inputs={len(chunk_wav_files)}:duration=longest:dropout_transition=0:normalize=0[aout]"
            cmd_mix.extend([
                "-t", str(dur),
                "-filter_complex", mix_filter,
                "-map", "[aout]",
                "-c:a", "pcm_s16le",
                output_tts_wav,
            ])
            res_final = subprocess.run(cmd_mix, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if res_final.returncode != 0:
                raise RuntimeError(f"Lỗi ghép các chunks TTS: {res_final.stderr}")
    finally:
        for cw in chunk_wav_files:
            if os.path.exists(cw):
                try:
                    os.unlink(cw)
                except Exception:
                    pass

    return output_tts_wav


def mux_video_with_ducked_background_and_tts(
    video_file: str,
    original_audio_file: str,
    tts_audio_file: str,
    output_video_file: str,
    ffmpeg_bin: Optional[str] = None,
) -> str:
    """
    Ghép video stream copy với audio đã mix:
    - Video stream: Copy trực tiếp từ video stream copy (-c:v copy).
    - Background audio gốc: Giảm volume xuống 0.1 và định kỳ cứ 0.9s thì mute 0.1s:
      filter: volume=eval=frame:volume=if(gte(mod(t\\,1.0)\\,0.9)\\,0\\,0.1)
    - TTS audio: Giữ nguyên âm lượng và mix cùng background audio gốc.
    """
    ffmpeg = get_ffmpeg_path(ffmpeg_bin)
    os.makedirs(os.path.dirname(os.path.abspath(output_video_file)), exist_ok=True)

    # Filter biểu thức: volume=eval=frame:volume=if(gte(mod(t\,1.0)\,0.9)\,0\,0.1)
    bg_filter = "volume=eval=frame:volume=if(gte(mod(t\\,1.0)\\,0.9)\\,0\\,0.1)"
    filter_complex = f"[1:a]{bg_filter}[bg];[bg][2:a]amix=inputs=2:duration=first:dropout_transition=2:normalize=0[aout]"

    cmd = [
        ffmpeg,
        "-y",
        "-i", video_file,
        "-i", original_audio_file,
        "-i", tts_audio_file,
        "-filter_complex", filter_complex,
        "-map", "0:v:0",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "48000",
        "-movflags", "+faststart",
        output_video_file,
    ]

    logger.info(
        f"[Mux Final Video] Đang mix audio (Background vol=0.1 & periodic 0.1s mute, TTS) và ghép video stream copy -> '{output_video_file}'"
    )
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        logger.error(f"[Mux Final Video] Lỗi mux video & audio: {res.stderr}")
        raise RuntimeError(f"Lỗi khi ghép audio và video stream copy: {res.stderr}")

# ---------------------------------------------------------------------------
# 7. Complete Dubbing Pipeline Execution from Audio / Stream Copy Video
# ---------------------------------------------------------------------------

async def execute_dubbing_pipeline_for_stream_copy(
    stream_copy_video_path: str,
    original_audio_path: str,
    output_dubbed_video_path: str,
    op_id: str,
    transcribe_engine: str = "capcut",
    source_lang: str = "auto",
    target_lang: str = "vi",
    preset: str = "default",
    provider: str = "custom",
    model: Optional[str] = None,
    voice_id: str = "Ngọc Huyền",
    tts_speed: float = 1.0,
    voice_rate: float = 1.0,
    fit_mode: str = "natural_flow",
    temp_dir: Optional[str] = None,
    log_callback: Optional[Callable[[str], None]] = None,
    progress_callback: Optional[Callable[[str, int, str], None]] = None,
) -> Dict[str, Any]:
    """
    Thực hiện quy trình lồng tiếng hoàn chỉnh cho video đã stream copy:
    1. Transcribe video (dùng original_audio_path hoặc stream_copy_video_path).
    2. Translate segments (dịch thuật AI qua Node helper).
    3. Generate TTS batch (sinh giọng đọc VieNeu-TTS v3 Turbo).
    4. Compute timing plan (khớp thời lượng, timing plan).
    5. Ghép audio TTS thành 1 track timeline hoàn chỉnh.
    6. Xử lý âm thanh gốc (volume=0.1, chu kỳ 0.9s mute 0.1s) & mix cùng TTS track rồi ghép vào video stream copy.
    """
    from core.node_bridge import run_node_helper
    from core.ws_manager import ws_manager
    from service.setting import load_transcript_settings
    from backend.service.vieneu_tts import generate_tts_batch_sync, normalize_voice_id

    settings = load_transcript_settings()
    ffmpeg_bin = settings.get("ffmpegPath") or "ffmpeg"

    work_dir = temp_dir or tempfile.mkdtemp(prefix=f"pipeline_hg_{op_id}_")
    os.makedirs(work_dir, exist_ok=True)
    tts_dir = os.path.join(work_dir, "tts")
    os.makedirs(tts_dir, exist_ok=True)

    # Đo thông số video
    v_info = probe_video_detail(stream_copy_video_path, ffmpeg_bin)
    media_duration = v_info.get("duration", 0.0)

    if progress_callback:
        progress_callback("transcribe", 10, f"Đang nhận diện giọng nói ({transcribe_engine})...")
    if log_callback:
        log_callback(f"[Dubbing Pipeline] Bước 1/5: Bắt đầu phiên âm âm thanh gốc ({media_duration:.1f}s)...")

    # 1. Transcribe
    # Sử dụng original_audio_path (file audio chuẩn đã nối m4a/wav) làm videoPath cho action transcribe-video
    # để FFmpeg giải mã audio trực tiếp nhanh, ổn định và tránh lỗi corrupt container từ stream-copy video.
    transcribe_input_path = original_audio_path if (original_audio_path and os.path.exists(original_audio_path)) else stream_copy_video_path

    transcribe_data = {
        "videoPath": transcribe_input_path,
        "audioPath": transcribe_input_path,
        "targetLang": target_lang,
        "sourceLang": source_lang,
        "transcribeEngine": transcribe_engine,
        "videoSegments": [],
        "opId": op_id,
    }

    raw_transcribe = await run_node_helper(
        action="transcribe-video",
        data=transcribe_data,
        settings=settings,
    )

    segments: List[Dict[str, Any]] = []
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

    if not segments:
        raise RuntimeError("Không nhận diện được lời thoại nào trong video.")

    if log_callback:
        log_callback(f"[Dubbing Pipeline] Nhận diện xong {len(segments)} phân đoạn lời thoại.")

    # 2. Translate Segments
    if progress_callback:
        progress_callback("translate", 35, f"Đang dịch {len(segments)} câu sang '{target_lang}'...")
    if log_callback:
        log_callback(f"[Dubbing Pipeline] Bước 2/5: Đang dịch {len(segments)} câu bằng AI model...")

    def _on_node_event(evt: dict):
        if not isinstance(evt, dict):
            return
        e_type = evt.get("type") or evt.get("event")
        if e_type == "translate_progress" or evt.get("action") == "translate":
            done_cnt = evt.get("done") or evt.get("completed") or 0
            tot_cnt = evt.get("total") or len(segments)
            if tot_cnt > 0 and done_cnt > 0:
                sub_pct = min(100, int((done_cnt / tot_cnt) * 100))
                if progress_callback:
                    progress_callback("translate", 35 + int(sub_pct * 0.20), f"Đang dịch AI: {done_cnt}/{tot_cnt} câu ({sub_pct}%)")

    actual_model = model or (settings.get("customModel") if provider == "custom" else settings.get("deepseekModel")) or "gemini-lite"
    translate_data = {
        "segments": segments,
        "targetLang": target_lang,
        "source": source_lang,
        "sourceLang": source_lang,
        "preset": preset,
        "model": actual_model,
        "provider": provider,
        "parallelJobs": 2,
        "glossary": [],
        "bible": None,
        "speakers": [],
        "videoPath": stream_copy_video_path,
        "opId": op_id,
    }

    translate_res = await run_node_helper(
        action="translate-segments",
        data=translate_data,
        settings=settings,
        on_event=_on_node_event,
    )

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
            seg["dubbingText"] = (dubbing_map.get(sid) if isinstance(dubbing_map, dict) else None) or trans
    elif isinstance(translate_res, list):
        for idx, item in enumerate(translate_res):
            if idx < len(segments) and isinstance(item, dict):
                t = item.get("translation") or item.get("text") or ""
                segments[idx]["translation"] = t
                segments[idx]["subtitleText"] = t
                segments[idx]["dubbingText"] = item.get("dubbingText") or t

    if log_callback:
        log_callback(f"[Dubbing Pipeline] Đã hoàn thành dịch thuật {len(segments)} câu.")

    # 3. Generate TTS Batch
    norm_voice = normalize_voice_id(voice_id, "Ngọc Huyền")
    if progress_callback:
        progress_callback("tts", 55, f"Đang tổng hợp giọng đọc ({norm_voice})...")
    if log_callback:
        log_callback(f"[Dubbing Pipeline] Bước 3/5: Tổng hợp giọng đọc TTS '{norm_voice}'...")

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
            "voiceId": norm_voice,
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

    # 4. Compute Timing Plan
    if progress_callback:
        progress_callback("timing_plan", 75, "Đang tính toán đồng bộ nhịp điệu (Timing Plan)...")
    if log_callback:
        log_callback("[Dubbing Pipeline] Bước 4/5: Đồng bộ nhịp câu nói và timeline...")

    timing_data = {
        "segments": segments,
        "totalDuration": media_duration if media_duration > 0 else None,
        "mediaDuration": media_duration if media_duration > 0 else None,
        "globalVoiceRate": voice_rate,
        "videoSegments": [],
        "policy": None,
        "voiceId": norm_voice,
    }

    try:
        timing_plan = await run_node_helper(
            action="compute-timing-plan",
            data=timing_data,
            settings=settings,
        )
        if isinstance(timing_plan, dict) and "units" in timing_plan:
            units_map = {str(u.get("id")): u for u in timing_plan.get("units", []) if isinstance(u, dict)}
            for seg in segments:
                u = units_map.get(str(seg.get("id")))
                if u:
                    seg["plannedStart"] = u.get("plannedStart", seg.get("startTime"))
                    seg["plannedEnd"] = u.get("plannedEnd", seg.get("endTime"))
                    seg["audioTempo"] = u.get("audioTempo", u.get("speed", 1.0))
    except Exception as exc:
        logger.warning(f"[Dubbing Pipeline] Cảnh báo compute timing plan: {exc}")
        for seg in segments:
            seg["plannedStart"] = seg.get("startTime")
            seg["plannedEnd"] = seg.get("endTime")

    # 5. Ghép track TTS và Mux vào Video
    if progress_callback:
        progress_callback("export", 90, "Đang xử lý âm thanh nền và ghép video lồng tiếng...")
    if log_callback:
        log_callback(
            "[Dubbing Pipeline] Bước 5/5: Tạo track TTS, giảm âm lượng gốc 0.1 và mute 0.1s mỗi 0.9s rồi ghép vào video..."
        )

    tts_track_wav = os.path.join(work_dir, "full_tts_track.wav")
    create_tts_audio_track(
        segments=segments,
        total_duration=media_duration,
        output_tts_wav=tts_track_wav,
        sample_rate=48000,
        ffmpeg_bin=ffmpeg_bin,
    )

    mux_video_with_ducked_background_and_tts(
        video_file=stream_copy_video_path,
        original_audio_file=original_audio_path,
        tts_audio_file=tts_track_wav,
        output_video_file=output_dubbed_video_path,
        ffmpeg_bin=ffmpeg_bin,
    )

    if progress_callback:
        progress_callback("completed", 100, "Hoàn tất lồng tiếng video thành công!")
    if log_callback:
        log_callback(f"[Dubbing Pipeline] Hoàn tất xuất sắc video lồng tiếng: '{output_dubbed_video_path}'")

    return {
        "success": True,
        "outputFilePath": output_dubbed_video_path,
        "segmentsCount": len(segments),
        "duration": media_duration,
        "segments": segments,
    }

