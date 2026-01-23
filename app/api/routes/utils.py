from datetime import datetime
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.api.deps import CurrentUser, SessionDep
from app.core.config import settings

router = APIRouter(prefix="/utils", tags=["utils"])


class PageRequestMsg(BaseModel):
    path: str
    user_agent: str


@router.post("/request-page")
async def request_page(msg: PageRequestMsg) -> Any:
    if not settings.DISCORD_PAGE_REQUEST_WEBHOOK_URL:
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
                settings.DISCORD_PAGE_REQUEST_WEBHOOK_URL,
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
async def account_delete_request(
    msg: AccountDeleteRequestMsg,
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    current_user.is_deletion_requested = True
    session.add(current_user)
    await session.commit()

    if not settings.DISCORD_ACCOUNT_DELETE_REQUEST_WEBHOOK_URL:
        return {"message": "Discord webhook not configured"}

    embed = {
        "title": "Sayonara-chan: Farewell Request",
        "description": "A user has requested account deletion",
        "color": 0xFF0000,
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
        ],
    }

    payload = {"embeds": [embed]}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                settings.DISCORD_ACCOUNT_DELETE_REQUEST_WEBHOOK_URL,
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
