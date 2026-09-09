from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from openai import AsyncOpenAI
from ...utilities.db.session import get_db
from ...utilities.gateway.openai import get_openai_gateway
from ...utilities.interpretation.tags import pick_up_appropriate_tags
from ..schemes.prompt_scheme import StoryPromptRequest
from ..schemes.stories_scheme import StoryScheme
from ..models.stories import Story, Tag

router = APIRouter(prefix="/stories")

@router.get("", response_model=list[StoryScheme])
async def list_stories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Story).options(selectinload(Story.tags))
    )
    return result.scalars().all()

@router.post("/find_similar", response_model=list[StoryScheme])
async def find_similar_stories(
    request_data: StoryPromptRequest,
    db: AsyncSession = Depends(get_db),
    ai: AsyncOpenAI = Depends(get_openai_gateway),
):
    appropriate_tags = await pick_up_appropriate_tags(request_data.prompt, db, ai)
    tag_ids = [tag["id"] for tag in appropriate_tags]

    if not tag_ids:
        return []

    result = await db.execute(
        select(Story)
        .join(Story.tags)
        .where(Tag.id.in_(tag_ids))
        .options(selectinload(Story.tags))
        .distinct()
        .limit(2)
    )

    return result.scalars().all()

@router.get("/{story_id}", response_model=StoryScheme)
async def get_story(story_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Story)
        .where(Story.id == story_id)
        .options(selectinload(Story.tags))
    )
    story = result.scalar_one_or_none()

    if story is None:
        raise HTTPException(status_code=404, detail="Story not found")

    return story
