import logging
from typing import Dict, Any
from fastapi import APIRouter

logger = logging.getLogger("router_account")

router = APIRouter(prefix="/api/account", tags=["account"])

# Mock pro account info so frontend enables all export features fully
MOCK_ACCOUNT = {
    "plan": "pro",
    "plan_name": "Gói Pro Premium",
    "expires_at": None,  # Lifetime
    "machine_id": "LOCAL-DEV-MACHINE",
    "machine_short": "LOCAL-DEV",
    "export_allowed": True,
    "export_policy": {
        "tier": "pro",
        "can_export": True,
        "reason_code": "OK",
        "max_output_duration_sec": 999999,
        "max_project_duration_sec": 999999,
        "watermark_profile": None,
        "subtitle_export_allowed": True
    },
    "plans": [
        {
            "id": "pro",
            "name": "Gói Pro",
            "price": 299000,
            "original_price": 499000
        }
    ]
}


@router.get("")
async def get_account_info():
    """Returns user account status and export policy."""
    return MOCK_ACCOUNT


@router.post("/activate")
async def activate_key(body: Dict[str, Any]):
    """Activates license key."""
    key = body.get("key", "").strip()
    logger.info(f"License key activation attempt: {key}")
    return {"success": True, "message": "Kích hoạt thành công", "plan": "pro"}


@router.post("/deactivate")
async def deactivate_key():
    """Deactivates license key."""
    logger.info("License key deactivated.")
    return {"success": True, "message": "Đã bỏ key"}


@router.post("/open-store")
async def open_store(body: Dict[str, Any]):
    """Opens store URL for upgrades."""
    return {
        "opened": False,
        "url": ""
    }
