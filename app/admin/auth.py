from typing import Union

from authlib.integrations.starlette_client import OAuth
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse, Response

from app.core.config import settings
from app.core.db import async_session
from app.crud import get_user_by_email


oauth = OAuth()
oauth.register(
    "google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
        "prompt": "select_account",
    },
)

google = oauth.create_client("google")


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> Union[bool, RedirectResponse]:
        user = request.session.get("user")
        if not user:
            redirect_uri = str(request.url_for("login_google"))
            return await google.authorize_redirect(request, redirect_uri)
        return True


async def login_google(request: Request) -> Response:
    token = await google.authorize_access_token(request)
    if user_info := token.get("userinfo"):
        if email := user_info.get("email"):
            async with async_session() as session:
                user = await get_user_by_email(session=session, email=email)
                if user and getattr(user, "is_superuser", False):
                    request.session["user"] = user_info
                    return RedirectResponse(request.url_for("admin:index"))

    # Clean the session if unauthorized
    request.session.clear()
    return RedirectResponse(str(request.base_url))
