from pydantic import EmailStr, Field
from sqlmodel import SQLModel


# --------------- USER ---------------
class UserCreate(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8)


class UserCreateAdmin(UserCreate):
    is_superuser: bool = True


# --------------- TOKEN ---------------
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(SQLModel):
    user_id: str
