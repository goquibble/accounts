# pyright: reportIncompatibleVariableOverride=none
import uuid
from datetime import datetime, timezone
from typing import Any

from async_storages import StorageImage
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from app.core.sqlalchemy_types import ImageType

__all__ = ["SQLModel"]


class BaseModel(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config: dict[str, Any] = {
        "arbitrary_types_allowed": True,
    }


class User(BaseModel, table=True):
    __tablename__: str = "users"

    email: EmailStr = Field(unique=True, max_length=255)
    hashed_password: str
    password_last_changed: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    username: str = Field(unique=True, index=True, max_length=32)
    name: str | None = Field(default=None, max_length=64)
    avatar_url: StorageImage | None = Field(default=None, sa_type=ImageType())
    is_active: bool = True
    is_superuser: bool = False
