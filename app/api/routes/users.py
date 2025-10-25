from fastapi import APIRouter

from app.api.deps import CurrentUser
from app.schemas import UserRead

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
def read_users_me(current_user: CurrentUser):
    return current_user
