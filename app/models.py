# pyright: reportIncompatibleVariableOverride=none
import uuid
from datetime import datetime, timezone
from async_storages.integrations.sqlalchemy import ImageType
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from app.core.storages import storage

__all__ = ["SQLModel"]


class BaseModel(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class User(BaseModel, table=True):
    __tablename__: str = "users"

    email: EmailStr = Field(unique=True, max_length=255)
    hashed_password: str
    username: str = Field(unique=True, index=True, max_length=32)
    name: str | None = Field(default=None, max_length=64)
    avatar_url: str | None = Field(default=None, sa_type=ImageType(storage=storage))
    is_active: bool = True
    is_superuser: bool = False
