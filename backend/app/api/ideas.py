from fastapi import APIRouter, Depends, HTTPException
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.idea_service import IdeaService
from app.repositories.idea_repository import IdeaRepository
from app.schemas.idea import IdeaCreate, IdeaOut
from app.db.models import Idea
from uuid import UUID

router = APIRouter()

def get_service(db: Session = Depends(get_db)):
    return IdeaService(IdeaRepository(db))
@router.get("/", response_model=list)
def list_ideas(db: Session = Depends(get_db)):
    return db.query(Idea).all()

@router.post("/", response_model=IdeaOut)
def create_idea(idea: IdeaCreate, service: IdeaService = Depends(get_service)):
    return service.create_idea(idea)

@router.get("/", response_model=list[IdeaOut])
def list_ideas(service: IdeaService = Depends(get_service)):
    return service.list_ideas()

@router.get("/{idea_id}", response_model=IdeaOut)
def get_idea(idea_id: UUID, service: IdeaService = Depends(get_service)):
    idea = service.get_idea(idea_id)
@router.get("/{id}")
def get_idea(id: UUID, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    return idea

@router.patch("/{idea_id}/vote", response_model=IdeaOut)
def vote_idea(idea_id: UUID, service: IdeaService = Depends(get_service)):
    idea = service.vote_idea(idea_id)
@router.post("/")
def create_idea(idea: dict, db: Session = Depends(get_db)):
    new_idea = Idea(**idea)
    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)
    return new_idea

@router.patch("/{id}/vote")
def vote_idea(id: UUID, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")
    idea.votes_count += 1
    db.commit()
    db.refresh(idea)
    return idea
