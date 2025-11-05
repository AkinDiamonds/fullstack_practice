from fastapi import FastAPI
from . import models
from .database import engine
from .routes import user

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.include_router(user.router)
