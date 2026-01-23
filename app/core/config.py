import secrets
from enum import Enum
from functools import lru_cache
from typing import Annotated, Any, ClassVar

from pydantic import (
    AnyUrl,
    BeforeValidator,
    EmailStr,
    PostgresDsn,
    SecretStr,
    computed_field,
)
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",") if i.strip()]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Environment(str, Enum):
    LOCAL = "local"
    PRODUCTION = "production"


class Settings(BaseSettings):
    model_config: ClassVar[SettingsConfigDict] = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Environment = Environment.LOCAL

    @computed_field
    @property
    def DEBUG(self) -> bool:
        return self.ENVIRONMENT != Environment.PRODUCTION

    SECRET_KEY: SecretStr = SecretStr(secrets.token_urlsafe(32))
    ALGORITHM: str = "HS256"
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7  # 7 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15  # 15 mins

    CLIENT_CACHE_MAX_AGE: int = 60  # 60s

    COOKIE_DOMAIN: str = "localhost"
    FRONTEND_HOST: str = "http://localhost:5173"
    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    PROJECT_NAME: str = "Accounts — GoQuibble"
    FIRST_SUPERUSER: EmailStr = "admin@admin.com"
    FIRST_SUPERUSER_PASSWORD: str = "adminpass"

    DATABASE_URI: PostgresDsn

    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_S3_BUCKET_NAME: str
    AWS_S3_ENDPOINT_URL: str

    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    DISCORD_PAGE_REQUEST_WEBHOOK_URL: str | None = None
    DISCORD_ACCOUNT_DELETE_REQUEST_WEBHOOK_URL: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()  # ty:ignore[missing-argument]


# use cached result
settings = get_settings()
