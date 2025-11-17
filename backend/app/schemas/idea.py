from pydantic import BaseModel
from uuid import UUID

class IdeaCreate(BaseModel):
    title: str
    description: str
    author: str

class IdeaOut(BaseModel):
    id: int
    title: str
    description: str
    author: str
    votes_count: int

    class Config:
        orm_mode = True
