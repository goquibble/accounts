from sqlmodel import Session

from app.core.security import get_password_hash
from app.models import User
from app.schemas import UserCreate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    user = User(
        email=user_create.email,
        hashed_password=get_password_hash(user_create.password),
        username=user_create.email.split("@")[0],
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user
