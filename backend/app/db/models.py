from sqlalchemy import Boolean, Column, String, Integer, DateTime, func
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

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())