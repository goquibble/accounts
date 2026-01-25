from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from app.core.config import settings
from app.core.db import async_session
from app.core.security import verify_password
from app.crud import get_user_by_email


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        email, password = str(form["username"]), str(form["password"])

        async with async_session() as session:
            user = await get_user_by_email(session=session, email=email)
            if user and verify_password(password, user.hashed_password):
                if user.is_superuser:
                    request.session.update({"token": str(user.id)})
                    return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool | RedirectResponse:
        token = request.session.get("token")

        if not token:
            return RedirectResponse(request.url_for("admin:login"), status_code=302)

        return True


authentication_backend = AdminAuth(secret_key=settings.SECRET_KEY.get_secret_value())
