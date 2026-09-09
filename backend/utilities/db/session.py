from .base import Base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from ...settings import settings

engine = create_async_engine(settings.DATABASE_URL)

session_local = async_sessionmaker(bind=engine)

async def get_db():
    db = session_local()

    try:
        yield db
    finally:
        await db.close()