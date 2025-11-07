from database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Record

router = APIRouter(prefix="/record", tags=["Record"] )

@router.get("/")
def get_record(db: Session = Depends(get_db)):
    return db.query(Record).all()