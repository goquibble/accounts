from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import get_async_session
from app.core.security import TokenType, oauth2_schema, verify_token
from app.models import User


SessionDep = Annotated[AsyncSession, Depends(get_async_session)]
TokenDep = Annotated[str, Depends(oauth2_schema)]


async def get_current_user(session: SessionDep, token: TokenDep) -> User:
    token_data = verify_token(token, TokenType.ACCESS)
    if not token_data:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not authenticated.")

    user = await session.get(User, token_data.user_id)
    if not user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "User not found.")
    elif not user.is_active:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Inactive user.")
    print(type(user.avatar_url))
    return user


# easy to use b/w route functions
CurrentUser = Annotated[User, Depends(get_current_user)]
