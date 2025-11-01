from collections.abc import AsyncGenerator
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import settings
from app.crud import create_user
from app.models import User
from app.schemas import UserCreateAdmin

async_engine = create_async_engine(str(settings.DATABASE_URI), echo=False, future=True)
async_session = async_sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as db:
        yield db


async def init_db(session: AsyncSession):
    statement = select(User).where(User.email == settings.FIRST_SUPERUSER)
    user = (await session.exec(statement)).first()
    if not user:
        admin_create = UserCreateAdmin(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,  # just making sure
        )

        # create admin user on db
        await create_user(session=session, user_create=admin_create)
