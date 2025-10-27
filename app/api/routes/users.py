from typing import Annotated
import uuid
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.api.deps import CurrentUser, SessionDep
from app.crud import update_user
from app.models import User
from app.schemas import UserRead, UserUpdate
from app.utils import transform_image

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
def read_user_me(current_user: CurrentUser) -> User:
    return current_user


@router.patch("/me", response_model=UserRead)
def update_users_me(
    current_user: CurrentUser,
    session: SessionDep,
    username: Annotated[str | None, Form()] = None,
    name: Annotated[str | None, Form()] = None,
    avatar: Annotated[UploadFile | None, File()] = None,
) -> User:
    db_user = current_user
    user_update = UserUpdate(username=username, name=name)

    if avatar:
        transformed = transform_image(avatar.file)
        filename = user_update.username or current_user.username
        transformed.name = f"avatars/{filename}.webp"
        # let s3storage do the work
        setattr(db_user, "avatar_url", transformed)

    user = update_user(session=session, db_user=db_user, user_update=user_update)
    return user


@router.get("/{user_id}", response_model=UserRead)
def read_user_by_id(user_id: uuid.UUID, session: SessionDep) -> User:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found.")

    return user
