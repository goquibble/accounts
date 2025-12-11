from datetime import datetime, timezone

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.security import get_password_hash
from app.models import User
from app.schemas import UserCreate, UserUpdate


# --------------- USER ---------------
async def create_user(*, session: AsyncSession, user_create: UserCreate) -> User:
    user = User(
        email=user_create.email,
        hashed_password=get_password_hash(user_create.password),
        username=user_create.email.split("@")[0],
    )

    session.add(user)
    await session.commit()
    await session.refresh(user)

    return user


async def update_user(
    *, session: AsyncSession, db_user: User, user_update: UserUpdate
) -> User:
    user_data = user_update.model_dump(exclude_unset=True)
    db_user.sqlmodel_update(user_data)

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)

    return db_user


async def update_user_password(
    *, session: AsyncSession, db_user: User, new_password: str
) -> User:
    db_user.hashed_password = get_password_hash(new_password)
    db_user.password_last_changed = datetime.now(timezone.utc)

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)

    return db_user


async def get_user_by_email(*, session: AsyncSession, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    user = (await session.exec(statement)).first()
    return user
