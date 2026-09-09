import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

current_dir = Path(__file__).resolve().parent

class Settings(BaseSettings):
    DATABASE_URL: str
    OPENAI_API_KEY: str
    CORS: str

    model_config=SettingsConfigDict(
        env_file=current_dir / ".env",
        env_file_encoding="utf-8"
    )

settings = Settings()