import uuid
from datetime import datetime, timezone
from pydantic import EmailStr
from sqlmodel import Field, SQLModel

__all__ = ["SQLModel"]


# base model to use within other models
class BaseModel(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class User(BaseModel, table=True):
    email: EmailStr = Field(unique=True, max_length=255)
    hashed_password: str
    username: str = Field(unique=True, index=True)
    avatar: str | None
    name: str | None = None
    about: str | None = None
    is_active: bool = True
    is_superuser: bool = False
