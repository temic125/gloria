from ...settings import settings
from openai import AsyncOpenAI

async def get_openai_gateway():
    async_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    try:
        yield async_client

    finally:
        await async_client.close()