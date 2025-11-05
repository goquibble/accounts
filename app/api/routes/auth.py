from typing import Annotated
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import SessionDep
from app.auth import authenticate_user
from app.core.config import settings
from app.core.security import TokenType, create_token, verify_token
from app.crud import create_user, get_user_by_email
from app.models import User
from app.schemas import Token, UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    response: Response,
) -> Token:
    user = await authenticate_user(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Incorrect email or password.")
    elif not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user.")

    access_token = create_token(str(user.id), TokenType.ACCESS)
    refresh_token = create_token(str(user.id), TokenType.REFRESH)

    max_age = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    secure = not settings.DEBUG
    # set refresh token as cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=secure,
        samesite="lax",
        max_age=max_age,
        domain=settings.COOKIE_DOMAIN,
    )

    return Token(access_token=access_token)


@router.post("/logout")
async def logout(
    response: Response,
    refresh_token: Annotated[str | None, Cookie()] = None,
) -> dict[str, str]:
    if not refresh_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Refresh token missing.")

    if not verify_token(refresh_token, TokenType.REFRESH):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid refresh token.")

    response.delete_cookie("refresh_token")
    return {"message": "Logged out!"}


@router.post("/register", response_model=UserRead)
async def register(session: SessionDep, user_create: UserCreate) -> User:
    if await get_user_by_email(session=session, email=user_create.email):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "User with email already exists."
        )

    user = await create_user(session=session, user_create=user_create)
    return user


@router.post("/refresh-token", response_model=Token)
def refresh_token(refresh_token: Annotated[str | None, Cookie()] = None) -> Token:
    if not refresh_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Refresh token missing.")

    token_data = verify_token(refresh_token, TokenType.REFRESH)
    if not token_data:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid refresh token.")

    new_access_token = create_token(token_data.user_id, TokenType.ACCESS)
    return Token(access_token=new_access_token)


@router.get("/check-email/{email}")
async def check_email(session: SessionDep, email: str) -> bool:
    user = await get_user_by_email(session=session, email=email)

    if user and not user.is_active:
        return False
    return True
