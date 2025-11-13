from pydantic import BaseModel
from uuid import UUID

class VoteCreate(BaseModel):
    idea_id: UUID

class VoteOut(BaseModel):
    id: UUID
    idea_id: UUID

    class Config:
        orm_mode = True