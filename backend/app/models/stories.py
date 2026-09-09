from ...utilities.db.base import Base
from sqlalchemy import Column, String, UUID, CheckConstraint, Table, ForeignKey
from sqlalchemy.orm import relationship
from uuid import uuid4

story_tags = Table(
    "story_tags",
    Base.metadata,
    Column("story_id", UUID, ForeignKey("stories.id"), primary_key=True),
    Column("tag_id", UUID, ForeignKey("tags.id"), primary_key=True)
)

class Story(Base):
    __tablename__ = "stories"

    id = Column(UUID, default=uuid4, primary_key=True, unique=True)

    title = Column(String, nullable=False)
    excerpt = Column(String, nullable=False)
    summary = Column(String,
                     CheckConstraint('length(summary) >= 500', name='summary_min_length'),
                     nullable=False)
    tags = relationship("Tag", secondary=story_tags, backref="stories")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(UUID, default=uuid4, primary_key=True, unique=True)

    name = Column(String, nullable=False)
    

