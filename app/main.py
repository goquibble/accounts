from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from mangum import Mangum

from app.admin import setup_admin
from app.api.main import api_router
from app.core.config import settings
from app.core.db import async_engine
from app.middleware.client_cache_middleware import ClientCacheMiddleware


def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else "default"
    return f"{tag}-{route.name}"


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
    swagger_ui_parameters={"displayOperationId": True},
)
# join all routers
app.include_router(api_router, prefix=settings.API_V1_STR)

# set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,  # ty:ignore[invalid-argument-type]
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# other middlewares
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY.get_secret_value())  # ty:ignore[invalid-argument-type]
app.add_middleware(ClientCacheMiddleware, max_age=settings.CLIENT_CACHE_MAX_AGE)  # ty:ignore[invalid-argument-type]

# add admin if debug mode
if settings.DEBUG:
    setup_admin(app, async_engine)

# for aws lambda
handler = Mangum(app)
