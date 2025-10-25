from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import SessionDep
from app.auth import authenticate_user
from app.core.config import Environment, settings
from app.core.security import TokenType, create_token
from app.schemas import Token

router = APIRouter(tags=["login"])


@router.get("/login")
def login(
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    response: Response,
) -> Token:
    user = authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Incorrect email or password.")
    elif not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user.")

    access_token = create_token(str(user.id), TokenType.ACCESS)
    refresh_token = create_token(str(user.id), TokenType.REFRESH)

    max_age = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    secure = settings.ENVIRONMENT == Environment.PRODUCTION
    # set refresh token as cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=secure,
        samesite="lax",
        max_age=max_age,
    )

    return Token(access_token=access_token)
