import asyncio
import json
import logging
from typing import Any, Dict, List, Optional
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger("ws_manager")

class ConnectionManager:
    """Manages WebSocket connections and broadcasts logs and progress events to clients."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self._loop: Optional[asyncio.AbstractEventLoop] = None

    def set_loop(self, loop: asyncio.AbstractEventLoop) -> None:
        """Set or update the main asyncio event loop."""
        self._loop = loop

    def _get_loop(self) -> Optional[asyncio.AbstractEventLoop]:
        """Get the active event loop if available and running."""
        if self._loop and self._loop.is_running():
            return self._loop
        try:
            loop = asyncio.get_running_loop()
            self._loop = loop
            return loop
        except RuntimeError:
            return self._loop

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        try:
            self._loop = asyncio.get_running_loop()
        except RuntimeError:
            pass
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"WebSocket disconnected. Remaining connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            logger.error(f"Error sending websocket message: {e}")

    async def broadcast_json(self, data: dict):
        """Send JSON payload to all active WebSocket clients."""
        if not self.active_connections:
            return
        
        message = json.dumps(data, ensure_ascii=False)
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.warning(f"Failed to send to client, scheduling disconnect: {e}")
                disconnected.append(connection)
        
        for conn in disconnected:
            self.disconnect(conn)

    def broadcast_json_sync(self, data: dict):
        """Thread-safe synchronous broadcast for worker threads."""
        if not self.active_connections:
            return
        loop = self._get_loop()
        if loop and loop.is_running():
            try:
                current = asyncio.get_running_loop()
                if current is loop:
                    loop.create_task(self.broadcast_json(data))
                    return
            except RuntimeError:
                pass
            asyncio.run_coroutine_threadsafe(self.broadcast_json(data), loop)

    async def broadcast_log(self, op_id: str, message: str):
        """Send log event to WebSocket clients."""
        await self.broadcast_json({
            "type": "log",
            "opId": op_id,
            "message": message
        })

    def broadcast_log_sync(self, op_id: str, message: str):
        """Thread-safe sync log broadcast for worker threads."""
        self.broadcast_json_sync({
            "type": "log",
            "opId": op_id,
            "message": message
        })

    async def broadcast_stage(self, op_id: str, stage: str, op: str = "export"):
        """Send an export stage-label update (e.g. probe/graph/encode)."""
        await self.broadcast_json({
            "type": "progress",
            "op": op,
            "opId": op_id,
            "stage": stage
        })

    def broadcast_stage_sync(self, op_id: str, stage: str, op: str = "export"):
        """Thread-safe sync stage broadcast."""
        self.broadcast_json_sync({
            "type": "progress",
            "op": op,
            "opId": op_id,
            "stage": stage
        })

    async def broadcast_progress(
        self,
        op_id: str,
        pct: float,
        out_time: float = 0.0,
        fps: str = "",
        speed: str = "",
        encoder: str = "",
        stage: str = "",
    ):
        """Send an export progress metrics update (percent, fps, speed)."""
        rounded_pct = round(pct, 2)
        rounded_out_time = round(out_time, 3)

        payload_export_progress = {
            "type": "export_progress",
            "op": "export",
            "opId": op_id,
            "stage": str(stage or ""),
            "pct": rounded_pct,
            "percent": rounded_pct,
            "progress": rounded_pct,
            "outTime": rounded_out_time,
            "fps": str(fps or ""),
            "speed": str(speed or ""),
            "encoder": str(encoder or "")
        }
        await self.broadcast_json(payload_export_progress)

        payload_progress = dict(payload_export_progress)
        payload_progress["type"] = "progress"
        await self.broadcast_json(payload_progress)

    def broadcast_progress_sync(
        self,
        op_id: str,
        pct: float,
        out_time: float = 0.0,
        fps: str = "",
        speed: str = "",
        encoder: str = "",
        stage: str = "",
    ):
        """Thread-safe sync export progress update."""
        rounded_pct = round(pct, 2)
        rounded_out_time = round(out_time, 3)

        payload_export_progress = {
            "type": "export_progress",
            "op": "export",
            "opId": op_id,
            "stage": str(stage or ""),
            "pct": rounded_pct,
            "percent": rounded_pct,
            "progress": rounded_pct,
            "outTime": rounded_out_time,
            "fps": str(fps or ""),
            "speed": str(speed or ""),
            "encoder": str(encoder or "")
        }
        self.broadcast_json_sync(payload_export_progress)

        payload_progress = dict(payload_export_progress)
        payload_progress["type"] = "progress"
        self.broadcast_json_sync(payload_progress)

    async def broadcast_op_progress(
        self,
        op: str,
        op_id: str,
        pct: Optional[float] = None,
        done: Optional[int] = None,
        total: Optional[int] = None,
        stage: Optional[str] = None,
        message: Optional[str] = None,
        ids: Optional[List[Any]] = None,
        results: Optional[List[Any]] = None,
        **extra: Any
    ):
        """Generic operation progress broadcast (for translate, transcribe, tts-batch, etc.)."""
        payload: Dict[str, Any] = {
            "type": "progress",
            "op": op,
            "opId": op_id,
        }
        if pct is not None:
            payload["pct"] = round(float(pct), 2)
            payload["percent"] = round(float(pct), 2)
        if done is not None:
            payload["done"] = int(done)
        if total is not None:
            payload["total"] = int(total)
        if stage is not None:
            payload["stage"] = str(stage)
        if message is not None:
            payload["message"] = str(message)
        if ids is not None:
            payload["ids"] = ids
        if results is not None:
            payload["results"] = results
        payload.update(extra)

        await self.broadcast_json(payload)

    def broadcast_op_progress_sync(
        self,
        op: str,
        op_id: str,
        pct: Optional[float] = None,
        done: Optional[int] = None,
        total: Optional[int] = None,
        stage: Optional[str] = None,
        message: Optional[str] = None,
        ids: Optional[List[Any]] = None,
        results: Optional[List[Any]] = None,
        **extra: Any
    ):
        """Thread-safe sync generic operation progress broadcast."""
        payload: Dict[str, Any] = {
            "type": "progress",
            "op": op,
            "opId": op_id,
        }
        if pct is not None:
            payload["pct"] = round(float(pct), 2)
            payload["percent"] = round(float(pct), 2)
        if done is not None:
            payload["done"] = int(done)
        if total is not None:
            payload["total"] = int(total)
        if stage is not None:
            payload["stage"] = str(stage)
        if message is not None:
            payload["message"] = str(message)
        if ids is not None:
            payload["ids"] = ids
        if results is not None:
            payload["results"] = results
        payload.update(extra)

        self.broadcast_json_sync(payload)

    async def broadcast_error(self, op_id: str, message: str):
        """Send error notification to WebSocket clients."""
        await self.broadcast_json({
            "type": "error",
            "opId": op_id,
            "message": message
        })

    def broadcast_error_sync(self, op_id: str, message: str):
        """Thread-safe sync error notification."""
        self.broadcast_json_sync({
            "type": "error",
            "opId": op_id,
            "message": message
        })

    async def broadcast_finished(self, op_id: str, output_file_path: str = ""):
        """Send export finished notification to WebSocket clients."""
        await self.broadcast_json({
            "type": "export_finished",
            "opId": op_id,
            "outputFilePath": output_file_path
        })

    def broadcast_finished_sync(self, op_id: str, output_file_path: str = ""):
        """Thread-safe sync finished notification."""
        self.broadcast_json_sync({
            "type": "export_finished",
            "opId": op_id,
            "outputFilePath": output_file_path
        })

ws_manager = ConnectionManager()
