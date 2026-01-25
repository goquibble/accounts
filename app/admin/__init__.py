from fastapi import FastAPI
from sqladmin import Admin
from sqlalchemy.ext.asyncio import AsyncEngine

from app.admin.auth import authentication_backend
from app.admin.views import UserAdmin


def setup_admin(app: FastAPI, engine: AsyncEngine):
    admin = Admin(
        app,
        engine,
        # logo_url="https://github.com/goquibble.png",
        # favicon_url="https://github.com/goquibble.png",
        title="Accounts Admin",
        authentication_backend=authentication_backend,
    )
    admin.add_view(UserAdmin)
