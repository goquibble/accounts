from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from sqladmin import Admin, ModelView
from markupsafe import Markup

from app.core.db import async_engine
from app.core.config import settings
from app.models import User

from app.api.main import api_router
from app.middleware.client_cache_middleware import ClientCacheMiddleware


def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else "default"
    return f"{tag}-{route.name}"


class UserAdmin(ModelView, model=User):
    form_excluded_columns = [User.avatar_url]
    column_list = [
        User.id,
        User.email,
        User.username,
        User.avatar_url,
        User.is_active,
        User.is_superuser,
        User.is_deletion_requested,
    ]

    column_formatters = {
        "avatar_url": lambda m, a: Markup(
            f'<img src="{"https" if not settings.DEBUG else "http"}://{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_S3_BUCKET_NAME}/{m.avatar_url.name}" width="50" />'
        )
        if m.avatar_url
        else ""
    }

    column_formatters_detail = {
        "avatar_url": lambda m, a: Markup(
            f'<img src="{"https" if not settings.DEBUG else "http"}://{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_S3_BUCKET_NAME}/{m.avatar_url.name}" width="100" />'
        )
        if m.avatar_url
        else ""
    }


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
    swagger_ui_parameters={"displayOperationId": True},
)
# join all routers
app.include_router(api_router, prefix=settings.API_V1_STR)
# add middlewares
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY.get_secret_value())  # ty:ignore[invalid-argument-type]
app.add_middleware(ClientCacheMiddleware, max_age=settings.CLIENT_CACHE_MAX_AGE)  # ty:ignore[invalid-argument-type]
# set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,  # ty:ignore[invalid-argument-type]
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


admin = Admin(app, async_engine)
admin.add_view(UserAdmin)
