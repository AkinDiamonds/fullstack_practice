from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(200))

    tasks = relationship("Task", back_populates= "owner")

class Task(Base):
    __tablename__ ="tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    description = Column(String(300))
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates= "tasks")