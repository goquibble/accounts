from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import User
from app.schemas import UserCreateAdmin

engine = create_engine(str(settings.DATABASE_URI))


def init_db(session: Session):
    if not session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first():
        admin_in = UserCreateAdmin(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,  # just making sure
        )

        # create admin user on db
        _ = crud.create_user(session=session, user_create=admin_in)
