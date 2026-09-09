from pydantic import BaseModel, Field

class StoryPromptRequest(BaseModel):
    prompt: str = Field(..., min_length=5, description="Промпт для получения похожей истории")
    
