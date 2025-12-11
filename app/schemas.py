import uuid
from datetime import datetime
from typing import Annotated

from pydantic import EmailStr, Field
from sqlmodel import SQLModel


# --------------- USER ---------------
class UserCreate(SQLModel):
    email: Annotated[EmailStr, Field(max_length=255, examples=["johndoe@gmail.com"])]
    password: Annotated[str, Field(min_length=8, max_length=128)]


class UserCreateAdmin(UserCreate):
    is_superuser: bool = True


class UserRead(SQLModel):
    id: uuid.UUID
    email: EmailStr
    username: str
    name: str | None
    avatar_url: str | None
    created_at: datetime
    password_last_changed: datetime


class UserUpdate(SQLModel):
    avatar_url: str | None = None
    username: Annotated[
        str | None,
        Field(
            default=None,
            min_length=3,
            max_length=32,
            pattern=r"^[a-zA-Z0-9_]+$",
            examples=["johndoe"],
        ),
    ]
    name: Annotated[
        str | None,
        Field(
            default=None,
            min_length=1,
            max_length=64,
            pattern=r"^[a-zA-ZÀ-ÿ'’\- ]+$",
            examples=["John Doe"],
        ),
    ]


class UserPasswordUpdate(SQLModel):
    old_password: Annotated[str, Field(min_length=8, max_length=128)]
    new_password: Annotated[str, Field(min_length=8, max_length=128)]


# --------------- TOKEN ---------------
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(SQLModel):
    user_id: str


class TokenPayload(SQLModel):
    sub: str | None = None
