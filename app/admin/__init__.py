from fastapi import FastAPI
from sqladmin import Admin
from sqlalchemy.ext.asyncio import AsyncEngine

from app.admin.views import UserAdmin
from app.admin.auth import login_google, AdminAuth
from app.core.config import settings


def setup_admin(app: FastAPI, engine: AsyncEngine):
    admin = Admin(
        app,
        engine,
        # logo_url="https://github.com/goquibble.png",
        # favicon_url="https://github.com/goquibble.png",
        title="Accounts Admin",
        authentication_backend=AdminAuth(
            secret_key=settings.SECRET_KEY.get_secret_value()
        ),
    )
    admin.add_view(UserAdmin)
    app.add_api_route(
        "/admin/auth/google", login_google, methods=["GET"], include_in_schema=False
    )
