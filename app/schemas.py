from pydantic import EmailStr, Field
from sqlmodel import SQLModel


class UserCreate(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8)


class UserCreateAdmin(UserCreate):
    is_superuser: bool = True
