import sys
import asyncio
import logging

# Windows-specific event loop policy
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import async_engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def init() -> None:
    logger.info("Creating initial data...")
    async with AsyncSession(async_engine) as session:
        await init_db(session)

    logger.info("Initial data created.")


if __name__ == "__main__":
    asyncio.run(init())
