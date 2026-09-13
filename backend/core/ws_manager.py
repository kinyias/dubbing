import json
import logging
from typing import Dict, List
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger("ws_manager")

class ConnectionManager:
    """Manages WebSocket connections and broadcasts logs and progress events to clients."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
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

    async def broadcast_log(self, op_id: str, message: str):
        """Send log event to WebSocket clients."""
        await self.broadcast_json({
            "type": "log",
            "opId": op_id,
            "message": message
        })

    async def broadcast_stage(self, op_id: str, stage: str):
        """Send an export stage-label update (e.g. probe/graph/encode).

        The frontend export-progress handler treats a message carrying a
        non-empty ``stage`` as a *label only* update and ignores pct/fps/speed
        on it, so stage transitions and metric updates must be sent separately.
        """
        await self.broadcast_json({
            "type": "progress",
            "op": "export",
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
        encoder: str = ""
    ):
        """Send an export progress metrics update (percent, fps, speed)."""
        rounded_pct = round(pct, 2)
        rounded_out_time = round(out_time, 3)

        payload_export_progress = {
            "type": "export_progress",
            "op": "export",
            "opId": op_id,
            "stage": "",
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

    async def broadcast_error(self, op_id: str, message: str):
        """Send error notification to WebSocket clients."""
        await self.broadcast_json({
            "type": "error",
            "opId": op_id,
            "message": message
        })

    async def broadcast_finished(self, op_id: str, output_file_path: str):
        """Send export finished notification to WebSocket clients."""
        await self.broadcast_json({
            "type": "export_finished",
            "opId": op_id,
            "outputFilePath": output_file_path
        })

ws_manager = ConnectionManager()
