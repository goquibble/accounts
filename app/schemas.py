from datetime import datetime
from typing import Annotated
import uuid
from pydantic import EmailStr, Field
from sqlmodel import SQLModel


# --------------- USER ---------------
class UserCreate(SQLModel):
    email: Annotated[EmailStr, Field(max_length=255)]
    password: Annotated[str, Field(min_length=8, max_length=128)]


class UserCreateAdmin(UserCreate):
    is_superuser: bool = True


class UserRead(SQLModel):
    id: uuid.UUID
    email: EmailStr
    username: str
    name: str | None
    avatar: str | None
    created_at: datetime


class UserUpdate(SQLModel):
    username: Annotated[str | None, Field(min_length=3, max_length=32, default=None)]
    name: Annotated[str | None, Field(max_length=32, default=None)]


# --------------- TOKEN ---------------
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(SQLModel):
    user_id: str


class TokenPayload(SQLModel):
    sub: str | None = None
