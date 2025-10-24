from sqlmodel import Session

from app.core.security import get_password_hash
from app.models import User
from app.schemas import UserCreate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    user_obj = User.model_validate(
        user_create, update={"password": get_password_hash(user_create.password)}
    )

    session.add(user_obj)
    session.commit()
    session.refresh(user_obj)

    return user_obj
