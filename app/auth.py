from sqlmodel import Session

from app.core.security import verify_password
from app.crud import get_user_by_email
from app.models import User


def authenticate_user(*, session: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(session=session, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
