import uuid
from fastapi import APIRouter, HTTPException, status

from app.api.deps import CurrentUser, SessionDep
from app.models import User
from app.schemas import UserRead

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
def read_user_me(current_user: CurrentUser) -> User:
    return current_user


@router.get("/{user_id}", response_model=UserRead)
def read_user_by_id(user_id: uuid.UUID, session: SessionDep) -> User:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found.")

    return user
