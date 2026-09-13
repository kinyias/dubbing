"""
Service tích hợp VieNeu-TTS (v3 Turbo) cho tổng hợp giọng nói tiếng Việt.
Quản lý nạp model VieNeu (singleton), tối ưu hóa suy luận hàng loạt (infer_batch) trên GPU,
tính toán thời lượng, kích thước, và kiểm tra tính hợp lệ của file âm thanh.
"""

from __future__ import annotations

import logging
import os
import subprocess
import tempfile
import threading
import time
from typing import Any, Dict, List, Optional, Set, Tuple

import numpy as np

from service.setting import get_setting, load_transcript_settings

logger = logging.getLogger("service_vieneu")

# Bộ nhớ đệm singleton cho mô hình Vieneu
_vieneu_instance = None
_vieneu_lock = threading.Lock()
_cancelled_ops: Set[str] = set()
_cancelled_ops_lock = threading.Lock()

# Tần số lấy mẫu mặc định của VieNeu v3 Turbo (48 kHz)
SAMPLE_RATE = 48000

# Danh sách 23 giọng preset tích hợp sẵn trong VieNeu v3 Turbo
KNOWN_PRESET_VOICES = [
    "Minh Đức", "Phạm Tuyên", "Thái Sơn", "Xuân Vĩnh", "Thanh Bình",
    "Trúc Ly", "Ngọc Linh", "Đoan Trang", "Mai Anh", "Thục Đoan",
    "Minh Triết", "Thùy Dung", "Quang Sơn", "Ngọc Trân", "Mỹ Duyên",
    "Quỳnh Anh", "Đức Trí", "Kim Thanh", "Ngọc Huyền", "Adam",
    "Mạnh Dũng", "Minh Quân", "Anh Khôi"
]


def get_vieneu_engine():
    """
    Khởi tạo hoặc lấy đối tượng Vieneu duy nhất (singleton).
    Đọc cấu hình từ settings.json (localTts.vieneu).
    """
    global _vieneu_instance
    if _vieneu_instance is not None:
        return _vieneu_instance

    with _vieneu_lock:
        if _vieneu_instance is not None:
            return _vieneu_instance

        try:
            from vieneu import Vieneu

            settings = load_transcript_settings()
            local_tts = settings.get("localTts", {})
            vieneu_cfg = local_tts.get("vieneu", {}) if isinstance(local_tts, dict) else {}

            max_batch_size = int(vieneu_cfg.get("maxBatchSize", 8) or 8)
            threads = int(vieneu_cfg.get("threads", 0) or 0)
            gpu_slot = str(vieneu_cfg.get("gpuSlot", "on")).lower()

            logger.info(
                f"[VieNeu] Đang nạp mô hình VieNeu-TTS (v3 Turbo)... "
                f"maxBatchSize={max_batch_size}, threads={threads}, gpuSlot={gpu_slot}"
            )

            kwargs: Dict[str, Any] = {
                "max_batch_size": max_batch_size,
            }
            if threads > 0:
                kwargs["threads"] = threads

            if gpu_slot == "off":
                kwargs["backend"] = "onnx"

            _vieneu_instance = Vieneu(**kwargs)
            logger.info("[VieNeu] Mô hình VieNeu-TTS đã sẵn sàng phục vụ.")
            return _vieneu_instance
        except Exception as e:
            logger.error(f"[VieNeu] Lỗi khi khởi tạo mô hình VieNeu-TTS: {e}", exc_info=True)
            raise


def list_preset_voices() -> List[Tuple[str, str]]:
    """Trả về danh sách các giọng preset có sẵn (trả về ngay lập tức nếu engine chưa nạp)."""
    global _vieneu_instance
    if _vieneu_instance is not None:
        try:
            return _vieneu_instance.list_preset_voices()
        except Exception:
            pass
    return [(v, v) for v in KNOWN_PRESET_VOICES]


def normalize_voice_id(voice_id: Optional[str], default_voice: str = "Ngọc Huyền") -> str:
    """
    Chuẩn hóa voiceId: bóc tách tiền tố 'vieneu:' hoặc 'vieneu_' và khớp với preset voices.
    Ví dụ: 'vieneu:Ngọc Huyền' -> 'Ngọc Huyền'
    """
    if not voice_id:
        voice_id = default_voice

    clean_id = voice_id.strip()
    if clean_id.lower().startswith("vieneu:"):
        clean_id = clean_id[7:].strip()
    elif clean_id.lower().startswith("vieneu_"):
        clean_id = clean_id[7:].strip()

    # So khớp không phân biệt hoa thường với danh sách giọng có sẵn
    for v in KNOWN_PRESET_VOICES:
        if clean_id.lower() == v.lower():
            return v

    return clean_id or default_voice


def cancel_tts_op(op_id: str) -> None:
    """Đánh dấu hủy thao tác batch TTS theo opId."""
    if not op_id:
        return
    with _cancelled_ops_lock:
        _cancelled_ops.add(op_id)
        # Giới hạn kích thước cache tránh phình to
        if len(_cancelled_ops) > 200:
            _cancelled_ops.clear()
            _cancelled_ops.add(op_id)
    logger.info(f"[VieNeu] Đã gửi yêu cầu hủy cho opId: {op_id}")


def is_tts_cancelled(op_id: Optional[str]) -> bool:
    """Kiểm tra opId có nằm trong danh sách hủy hay không."""
    if not op_id:
        return False
    with _cancelled_ops_lock:
        return op_id in _cancelled_ops


def cleanup_tts_op(op_id: Optional[str]) -> None:
    """Xóa opId khỏi danh sách sau khi hoàn tất."""
    if not op_id:
        return
    with _cancelled_ops_lock:
        _cancelled_ops.discard(op_id)


def _adjust_audio_speed(input_path: str, speed: float, ffmpeg_path: str = "ffmpeg") -> bool:
    """
    Điều chỉnh tốc độ file âm thanh bằng ffmpeg nếu speed != 1.0.
    """
    if abs(speed - 1.0) < 0.01 or speed <= 0:
        return True

    temp_fd, temp_output = tempfile.mkstemp(suffix=".wav")
    os.close(temp_fd)

    try:
        filter_str = f"atempo={speed:.3f}"
        if speed > 2.0:
            filter_str = f"atempo=2.0,atempo={speed/2.0:.3f}"
        elif speed < 0.5:
            filter_str = f"atempo=0.5,atempo={speed/0.5:.3f}"

        cmd = [
            ffmpeg_path,
            "-y",
            "-i", input_path,
            "-filter:a", filter_str,
            "-vn",
            temp_output,
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        if os.path.exists(temp_output) and os.path.getsize(temp_output) > 44:
            import shutil
            shutil.move(temp_output, input_path)
            return True
    except Exception as e:
        logger.warning(f"[VieNeu] Không thể điều chỉnh tốc độ qua ffmpeg ({e}), giữ nguyên file gốc.")
    finally:
        if os.path.exists(temp_output):
            try:
                os.unlink(temp_output)
            except Exception:
                pass

    return False


def generate_tts_batch_sync(
    items: List[Dict[str, Any]],
    op_id: Optional[str] = None,
    language: Optional[str] = "vi",
) -> Dict[str, Any]:
    """
    Xử lý đồng bộ một batch items giọng nói bằng VieNeu-TTS.
    Hàm này được thiết kế để chạy trong thread pool riêng để không chặn async loop của FastAPI.
    """
    settings = load_transcript_settings()
    local_tts = settings.get("localTts", {})
    vieneu_cfg = local_tts.get("vieneu", {}) if isinstance(local_tts, dict) else {}
    max_batch_size = int(vieneu_cfg.get("maxBatchSize", 8) or 8)
    default_voice_setting = settings.get("defaultTtsVoice") or settings.get("ttsVoice") or "vieneu:Ngọc Huyền"
    default_voice = normalize_voice_id(default_voice_setting, "Ngọc Huyền")
    ffmpeg_path = settings.get("ffmpegPath") or "ffmpeg"

    engine = get_vieneu_engine()

    results: List[Optional[Dict[str, Any]]] = [None] * len(items)
    failed_count = 0
    cancelled = False
    cancelled_count = 0

    # Phân loại items theo voice để tối ưu batch inference
    groups: Dict[str, List[Tuple[int, Dict[str, Any]]]] = {}
    for idx, item in enumerate(items):
        raw_voice = item.get("voiceId") or item.get("voice") or default_voice
        voice = normalize_voice_id(raw_voice, default_voice)
        if voice not in groups:
            groups[voice] = []
        groups[voice].append((idx, item))

    try:
        for voice, grouped_items in groups.items():
            if cancelled:
                break

            # Chia nhỏ theo max_batch_size (mặc định 8)
            for i in range(0, len(grouped_items), max_batch_size):
                if op_id and is_tts_cancelled(op_id):
                    logger.info(f"[VieNeu] Phát hiện tín hiệu hủy cho opId: {op_id}")
                    cancelled = True
                    break

                chunk = grouped_items[i : i + max_batch_size]
                chunk_indices = [c[0] for c in chunk]
                chunk_items = [c[1] for c in chunk]

                # Chuẩn bị texts
                texts = []
                for it in chunk_items:
                    t = str(it.get("text") or "").strip()
                    # Tránh chuỗi rỗng gây lỗi model
                    if not t:
                        t = "."
                    texts.append(t)

                # Thực hiện batch inference trên GPU
                audios: List[Optional[np.ndarray]] = []
                batch_error = None

                try:
                    t0 = time.time()
                    audios = engine.infer_batch(texts, voice=voice, batch_size=max_batch_size)
                    elapsed = time.time() - t0
                    logger.info(
                        f"[VieNeu] Batch {len(texts)} câu (voice: '{voice}') hoàn thành trong {elapsed:.2f}s"
                    )
                except Exception as e:
                    logger.warning(
                        f"[VieNeu] infer_batch gặp lỗi: {e}. Đang chuyển sang infer từng câu..."
                    )
                    batch_error = str(e)
                    audios = []
                    for t in texts:
                        try:
                            a = engine.infer(t, voice=voice)
                            audios.append(a)
                        except Exception as e_ind:
                            logger.error(f"[VieNeu] Lỗi infer đơn lẻ cho text '{t[:30]}...': {e_ind}")
                            audios.append(None)

                # Xử lý kết quả lưu file cho từng item trong chunk
                for idx_in_chunk, (orig_idx, it) in enumerate(zip(chunk_indices, chunk_items)):
                    item_id = str(it.get("id") or f"item_{orig_idx}")
                    dest_path = it.get("destPath") or it.get("outputPath")
                    if not dest_path:
                        dest_path = os.path.join(tempfile.gettempdir(), f"tts_{item_id}.wav")

                    norm_path = os.path.normpath(dest_path)
                    os.makedirs(os.path.dirname(os.path.abspath(norm_path)), exist_ok=True)

                    audio_arr = audios[idx_in_chunk] if idx_in_chunk < len(audios) else None

                    if audio_arr is None or (isinstance(audio_arr, np.ndarray) and len(audio_arr) == 0):
                        failed_count += 1
                        results[orig_idx] = {
                            "success": False,
                            "outputPath": norm_path,
                            "engine": "vieneu",
                            "durationSeconds": 0.0,
                            "durationFit": False,
                            "validAudio": False,
                            "id": item_id,
                            "sizeBytes": 0,
                            "error": batch_error or "Generation failed",
                        }
                        continue

                    try:
                        # Lưu file WAV
                        engine.save(audio_arr, norm_path)

                        # Điều chỉnh tốc độ nếu khác 1.0
                        item_speed = float(it.get("speed") or 1.0)
                        if abs(item_speed - 1.0) >= 0.02:
                            _adjust_audio_speed(norm_path, item_speed, ffmpeg_path)

                        # Tính toán metadata
                        size_bytes = os.path.getsize(norm_path) if os.path.exists(norm_path) else 0
                        duration_sec = float(len(audio_arr) / SAMPLE_RATE)
                        if abs(item_speed - 1.0) >= 0.02 and item_speed > 0:
                            duration_sec = duration_sec / item_speed

                        # durationFit: kiểm tra nếu có targetDuration
                        target_dur = it.get("targetDuration")
                        duration_fit = False
                        if target_dur is not None and float(target_dur) > 0:
                            duration_fit = bool(duration_sec <= float(target_dur) * 1.05)

                        valid_audio = bool(os.path.exists(norm_path) and size_bytes > 44)

                        results[orig_idx] = {
                            "success": True,
                            "outputPath": norm_path,
                            "engine": "vieneu",
                            "durationSeconds": duration_sec,
                            "durationFit": duration_fit,
                            "validAudio": valid_audio,
                            "id": item_id,
                            "sizeBytes": size_bytes,
                        }
                    except Exception as save_err:
                        logger.error(f"[VieNeu] Lỗi khi lưu audio {norm_path}: {save_err}")
                        failed_count += 1
                        results[orig_idx] = {
                            "success": False,
                            "outputPath": norm_path,
                            "engine": "vieneu",
                            "durationSeconds": 0.0,
                            "durationFit": False,
                            "validAudio": False,
                            "id": item_id,
                            "sizeBytes": 0,
                            "error": str(save_err),
                        }
    finally:
        if op_id:
            cleanup_tts_op(op_id)

    # Đếm các items chưa được xử lý do bị hủy
    final_results: List[Dict[str, Any]] = []
    for idx, r in enumerate(results):
        if r is not None:
            final_results.append(r)
        else:
            cancelled_count += 1
            it = items[idx]
            final_results.append({
                "success": False,
                "outputPath": it.get("destPath") or it.get("outputPath") or "",
                "engine": "vieneu",
                "durationSeconds": 0.0,
                "durationFit": False,
                "validAudio": False,
                "id": str(it.get("id") or f"item_{idx}"),
                "sizeBytes": 0,
                "error": "Cancelled",
            })

    if cancelled:
        logger.info(
            f"[VieNeu] Hoàn tất batch với trạng thái CANCELLED: "
            f"processed={len(final_results) - cancelled_count}, cancelled={cancelled_count}"
        )

    return {
        "success": True if (not cancelled and failed_count == 0) else False if failed_count > 0 else True,
        "results": final_results,
        "failed": failed_count,
        "cancelled": cancelled,
        "cancelledCount": cancelled_count,
    }
