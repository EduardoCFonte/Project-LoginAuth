from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware 
from datetime import datetime

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(CORSMiddleware, allow_origins=origins)

class User(BaseModel):
    email: str
    password : str
    name : str
    surname : str
    birthday : datetime
    CPF : str

class UserPlus(User):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()

db_dependency = Depends(get_db)

models.Base.metadata.create_all(bind=engine)

@app.post("/login", response_model = UserPlus)
async def login_user(user_data: UserPlus, db: Session = Depends(get_db)):
    db_User = models.User(
    email=user_data.email,
    password=user_data.password,  # Lembre-se de hashear a senha
    name=user_data.name,
    surname=user_data.surname,
    birthday=user_data.birthday,
    CPF=user_data.CPF
)

    db.add(db_User)
    db.commit()
    db.refresh(db_User)
    return db_User