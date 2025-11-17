"""create ideas table

Revision ID: 19458490fb7f
Revises:
Create Date: 2025-11-13 20:20:39.421034

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "19458490fb7f"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Criar tabela ideas com ID integer
    op.create_table(
        "ideas",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("author", sa.String(), nullable=False),
        sa.Column("votes_count", sa.Integer(), server_default="0", nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    # Criar tabela votes com ID integer
    op.create_table(
        "votes",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("idea_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["idea_id"], ["ideas.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "idea_id", name="unique_vote_per_idea"
        ),  # Opcional: evita votos duplicados
    )


def downgrade():
    op.drop_table("votes")
    op.drop_table("ideas")
