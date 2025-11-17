from app.repositories.idea_repository import IdeaRepository
from app.schemas.idea import IdeaCreate
from app.db.models import Idea
from app.core.logging import logger


class IdeaService:
    def __init__(self, repo: IdeaRepository):
        self.repo = repo

    def create_idea(self, idea_data: IdeaCreate):
        logger.info(f"Creating idea: {idea_data.title}")
        idea = Idea(**idea_data.dict())
        return self.repo.create(idea)

    def list_ideas(self):
        logger.info("Listing all ideas")
        return self.repo.get_all()

    def get_idea(self, idea_id):
        logger.info(f"Getting idea by id: {idea_id}")
        return self.repo.get_by_id(idea_id)

    def vote_idea(self, idea_id):
        logger.info(f"Voting for idea: {idea_id}")
        return self.repo.increment_votes(idea_id)

    def delete_idea(self, idea_id):
        logger.info(f"Deleting idea: {idea_id}")
        return self.repo.delete(idea_id)
