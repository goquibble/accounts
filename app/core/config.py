from enum import Enum
import secrets
from typing import Annotated, Any
from pydantic import (
    AnyUrl,
    BeforeValidator,
    EmailStr,
    PostgresDsn,
    SecretStr,
    computed_field,
)
from pydantic_settings import BaseSettings


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
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Environment = Environment.LOCAL

    SECRET_KEY: SecretStr = SecretStr(secrets.token_urlsafe(32))
    ALGORITHM: str = "HS256"
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7  # 7 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 15 mins

    COOKIE_DOMAIN: str = "localhost"
    FRONTEND_HOST: str = "http://localhost:3000"
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
    # for prod (cloud services provides direct url)
    DATABASE_URL: PostgresDsn | None = None
    # (optional: for prod)
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "goquibble"
    POSTGRES_PASSWORD: str = "supersecretpassword"
    POSTGRES_DB: str = "accounts"

    @computed_field
    @property
    def DATABASE_URI(self) -> PostgresDsn:
        if self.DATABASE_URL:
            return self.DATABASE_URL

        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            host=self.POSTGRES_HOST,
            port=self.POSTGRES_PORT,
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            path=self.POSTGRES_DB,
        )

    FIRST_SUPERUSER: EmailStr = "admin@admin.com"
    FIRST_SUPERUSER_PASSWORD: str = "adminpass"


# global config
settings = Settings()
