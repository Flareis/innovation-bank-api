from sqlalchemy.orm import Session
from app.db.models import Idea

class IdeaRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Idea).all()

    def get_by_id(self, idea_id):
        return self.db.query(Idea).filter(Idea.id == idea_id).first()

    def create(self, idea: Idea):
        self.db.add(idea)
        self.db.commit()
        self.db.refresh(idea)
        return idea

    def increment_votes(self, idea_id):
        idea = self.get_by_id(idea_id)
        if idea:
            idea.votes_count += 1
            self.db.commit()
            self.db.refresh(idea)
        return idea
