from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
import uuid
from .base import Base


class Idea(Base):
    __tablename__ = "ideas"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    author = Column(String, nullable=False)
    votes_count = Column(Integer, default=0)


class Vote(Base):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    idea_id = Column(
        Integer, ForeignKey("ideas.id", ondelete="CASCADE"), nullable=False
    )
    # Se quiser adicionar user_id no futuro, basta incluir aqui
