from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from .settings import settings
from .utilities.db.session import get_db
from .utilities.db.session import engine
from .utilities.db.base import Base
from .app.models import stories  # noqa: F401 — регистрирует таблицы в Base.metadata
from .app.routers.stories_router import router as stories_router

app = FastAPI(
    title="Gloria web-app backend",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS.split(","),
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

app.include_router(stories_router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/health")
async def check_health(db: AsyncSession = Depends(get_db)):
    db_status = await db.execute(text("SELECT 1"))
    if not db_status:
        raise HTTPException(status_code=404, detail="DB is not alive")
    return "DB is alive"
