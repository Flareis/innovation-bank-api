from pydantic import BaseModel


class VoteCreate(BaseModel):
    idea_id: int


class VoteOut(BaseModel):
    id: int
    idea_id: int

    class Config:
        orm_mode = True
