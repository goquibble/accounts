from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import SessionDep
from app.auth import authenticate_user
from app.core.config import Environment, settings
from app.core.security import TokenType, create_token, verify_token
from app.crud import create_user, get_user_by_email
from app.models import User
from app.schemas import Token, UserCreate

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
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


@router.post("/register", response_model=User)
def register(session: SessionDep, user_create: UserCreate) -> User:
    if get_user_by_email(session=session, email=user_create.email):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "User with email already exists."
        )

    user = create_user(session=session, user_create=user_create)
    return user


@router.post("/refresh/access-token", response_model=Token)
def refresh_access_token(request: Request) -> Token:
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Refresh token missing.")

    token_data = verify_token(refresh_token, TokenType.REFRESH)
    if not token_data:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid refresh token.")

    new_access_token = create_token(token_data.user_id, TokenType.ACCESS)
    return Token(access_token=new_access_token)
