from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from openai import AsyncOpenAI, OpenAIError
from ...app.models.stories import Tag
from ...app.schemes.stories_scheme import TagList


async def pick_up_appropriate_tags(prompt: str, db: AsyncSession, ai: AsyncOpenAI) -> list[dict]:
    result = await db.execute(select(Tag))
    tags = result.scalars().all()

    if not tags:
        raise HTTPException(status_code=504, detail="No tags are added in db")

    available_tags = ", ".join(f"{tag.id}:{tag.name}" for tag in tags)

    try:
        completion = await ai.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Ты помогаешь подбирать теги для запроса подростка на платформе Gloria. "
                        "Тебе дан список доступных тегов в формате id:name. "
                        "Выбери из этого списка только те теги, которые точно соответствуют смыслу запроса пользователя. "
                        "Не придумывай новые теги и не изменяй id и name существующих. "
                        "Если ни один тег не подходит, верни пустой список."
                        f"\n\nДоступные теги: {available_tags}"
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                },
            ],
            response_format=TagList,
            max_completion_tokens=500
        )
        parsed_object = completion.choices[0].message.parsed

        return [tag.model_dump() for tag in parsed_object.tags]
    except OpenAIError as e:
        raise HTTPException(status_code=502, detail=str(e))
