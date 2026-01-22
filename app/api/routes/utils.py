from datetime import datetime
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import settings

router = APIRouter(prefix="/utils", tags=["utils"])


class PageRequestMsg(BaseModel):
    path: str
    user_agent: str


@router.post("/request-page")
async def request_page(msg: PageRequestMsg) -> Any:
    if not settings.DISCORD_WEBHOOK_URL:
        return {"message": "Discord webhook not configured"}

    embed = {
        "title": "404-chan: Page Not Found",
        "description": f"A user has requested a missing page:\n**{msg.path}**",
        "color": 0xFF4D4D,
        "fields": [
            {
                "name": "Path",
                "value": msg.path,
                "inline": True,
            },
            {
                "name": "Time",
                "value": datetime.now().isoformat(),
                "inline": True,
            },
            {
                "name": "User Agent",
                "value": msg.user_agent,
            },
        ],
    }

    payload = {"embeds": [embed]}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                settings.DISCORD_WEBHOOK_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()
        except httpx.RequestError as exc:
            print(f"An error occurred while requesting {exc.request.url!r}.")
            raise HTTPException(status_code=500, detail="Failed to send notification")
        except httpx.HTTPStatusError as exc:
            print(
                f"Error response {exc.response.status_code} while requesting {exc.request.url!r}."
            )
            raise HTTPException(status_code=500, detail="Failed to send notification")

    return {"message": "Request sent successfully"}


class AccountDeleteRequestMsg(BaseModel):
    username: str
    email: str
    user_id: str


@router.post("/account-delete-request")
async def account_delete_request(msg: AccountDeleteRequestMsg) -> Any:
    # Hardcoded dummy Discord webhook URL for now
    DISCORD_WEBHOOK_URL = (
        "https://discord.com/api/webhooks/DUMMY_WEBHOOK_ID/DUMMY_TOKEN"
    )

    if not DISCORD_WEBHOOK_URL:
        return {"message": "Discord webhook not configured"}

    embed = {
        "title": "⚠️ Account Deletion Request",
        "description": "A user has requested account deletion",
        "color": 0xFF0000,  # Red color for danger
        "fields": [
            {
                "name": "Username",
                "value": msg.username,
                "inline": True,
            },
            {
                "name": "Email",
                "value": msg.email,
                "inline": True,
            },
            {
                "name": "User ID",
                "value": msg.user_id,
                "inline": True,
            },
            {
                "name": "Time",
                "value": datetime.now().isoformat(),
                "inline": True,
            },
        ],
    }

    payload = {"embeds": [embed]}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                DISCORD_WEBHOOK_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()
        except httpx.RequestError as exc:
            print(f"An error occurred while requesting {exc.request.url!r}.")
            raise HTTPException(status_code=500, detail="Failed to send notification")
        except httpx.HTTPStatusError as exc:
            print(
                f"Error response {exc.response.status_code} while requesting {exc.request.url!r}."
            )
            raise HTTPException(status_code=500, detail="Failed to send notification")

    return {"message": "Request sent successfully"}
