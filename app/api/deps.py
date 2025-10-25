from collections.abc import Generator
from typing import Annotated, Any
from fastapi import Depends, HTTPException, status
from sqlmodel import Session

from app.core.db import engine
from app.core.security import TokenType, oauth2_schema, verify_token
from app.models import User


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
TokenDep = Annotated[str, Depends(oauth2_schema)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    token_data = verify_token(token, TokenType.ACCESS)
    if not token_data:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not authenticated.")

    user = session.get(User, token_data.user_id)
    if not user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "User not found.")
    elif not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user.")

    return user


# easy to use b/w route functions
CurrentUser = Annotated[User, Depends(get_current_user)]
