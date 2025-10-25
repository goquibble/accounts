from sqlmodel import Session, select

from app.core.security import get_password_hash
from app.models import User
from app.schemas import UserCreate


# --------------- USER ---------------
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


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user
