from pydantic import BaseModel, UUID4, Field, ConfigDict

class Tag(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    name: str = Field(min_length=3)

class StoryScheme(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID4
    title: str
    excerpt: str
    summary: str = Field(min_length=500)
    tags: list[Tag]

class TagChoice(BaseModel):
    """Схема для ответа OpenAI: id как обычная строка — 'format: uuid4' не входит
    в поддерживаемый OpenAI JSON Schema, поэтому UUID4 здесь использовать нельзя."""
    id: str
    name: str = Field(min_length=3)

class TagList(BaseModel):
    """Обёртка для OpenAI structured outputs — response_format требует одну pydantic-модель, не list[...]."""
    tags: list[TagChoice]

