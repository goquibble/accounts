from datetime import UTC, datetime, timedelta
from enum import Enum
from typing import Any

import jwt
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from pydantic import SecretStr

from app.core.config import settings
from app.schemas import TokenData

password_hash = PasswordHash.recommended()
oauth2_schema = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")
# shared values
SECRET_KEY: SecretStr = settings.SECRET_KEY
ALGORITHM: str = settings.ALGORITHM


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


def create_token(subject: str, token_type: TokenType) -> str:
    now = datetime.now(UTC).replace(tzinfo=None)
    expires = now + (
        timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        if token_type == TokenType.ACCESS
        else timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )

    to_encode = {"sub": subject, "exp": expires, "token_type": token_type}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY.get_secret_value(), ALGORITHM)
    return encoded_jwt


def verify_token(token: str, expected_token_type: TokenType) -> TokenData | None:
    try:
        payload: dict[str, Any] = jwt.decode(
            token, SECRET_KEY.get_secret_value(), algorithms=[ALGORITHM]
        )
        user_id = payload.get("sub")
        token_type = payload.get("token_type")

        if user_id is None or token_type != expected_token_type:
            return None

        return TokenData(user_id=user_id)
    except jwt.PyJWTError:
        return None
