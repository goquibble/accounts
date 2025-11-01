from typing import Annotated
import uuid
from async_storages import StorageImage
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.api.deps import CurrentUser, SessionDep
from app.core.storages import storage
from app.crud import update_user
from app.models import User
from app.schemas import UserRead, UserUpdate
from app.utils import transform_image

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
async def read_user_me(current_user: CurrentUser) -> User:
    if avatar_type := current_user.avatar_url:
        assert isinstance(avatar_type, StorageImage)
        current_user.avatar_url = await avatar_type.get_path()

    return current_user


@router.patch("/me", response_model=UserRead)
async def update_users_me(
    current_user: CurrentUser,
    session: SessionDep,
    username: Annotated[str | None, Form()] = None,
    name: Annotated[str | None, Form()] = None,
    avatar: Annotated[UploadFile | None, File()] = None,
    delete_avatar: Annotated[bool, File()] = False,
) -> User:
    db_user = current_user
    user_update_data: dict[str, str | None] = {}

    if username and username.strip() != "":
        user_update_data["username"] = username
    if name is not None:
        user_update_data["name"] = name or None

    if delete_avatar:
        if db_user.avatar_url:
            await storage.delete(db_user.avatar_url)
            user_update_data["avatar_url"] = None
    elif avatar:
        transformed = await transform_image(avatar.file)
        filename = user_update_data.get("username") or db_user.username
        # upload to s3 and store url
        user_update_data["avatar_url"] = await storage.upload(
            transformed, f"avatars/{filename}.webp"
        )

    user_update = UserUpdate(**user_update_data)
    user = await update_user(session=session, db_user=db_user, user_update=user_update)

    if avatar_type := user.avatar_url:
        assert isinstance(avatar_type, StorageImage)
        user.avatar_url = await avatar_type.get_path()

    return user


@router.get("/{user_id}", response_model=UserRead)
async def read_user_by_id(user_id: uuid.UUID, session: SessionDep) -> User:
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found.")

    return user
