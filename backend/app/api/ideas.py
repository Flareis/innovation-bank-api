from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.idea import IdeaCreate, IdeaOut
from app.db.models import Idea
from uuid import UUID

router = APIRouter()


@router.get("/", response_model=list[IdeaOut])
def list_ideas(db: Session = Depends(get_db)):
    return db.query(Idea).all()


@router.post("/", response_model=IdeaOut)
def create_idea(idea: IdeaCreate, db: Session = Depends(get_db)):
    new_idea = Idea(**idea.dict())
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)
    return new_idea


@router.get("/{id}", response_model=IdeaOut)
def get_idea(id: UUID, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    return idea


@router.patch("/{id}/vote", response_model=IdeaOut)
def vote_idea(id: UUID, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    idea.votes_count += 1
    db.commit()
    db.refresh(idea)
    return idea

@router.delete("/{id}", response_model=IdeaOut)
def delete_idea(id: UUID, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    db.delete(idea)
    db.commit()
    return idea