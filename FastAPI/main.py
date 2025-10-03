from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from core.database import SessionLocal, engine
from models.User import User
from fastapi.middleware.cors import CORSMiddleware 
from datetime import datetime

class UserCreate(BaseModel):
    firstName: str
    lastName: str
    cpf: str
    phone: str
    email: EmailStr 
    password: str
    cep: str
    street: str
    number: str
    complement: str | None = None 
    neighborhood: str
    city: str
    state: str

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()

db_dependency = Depends(get_db)



@app.get("/api/message")
def get_message():
    return {"message": "Olá do Backend FastAPI!"}

@app.post("/api/register")
async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registado")

    # 2. Criar o novo objeto de utilizador para a base de dados
    #    (Numa app real, aqui você faria o HASH da senha antes de guardar!)
    new_user = models.User(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        cpf=user_data.cpf,
        phone=user_data.phone,
        email=user_data.email,
        hashed_password=f"hashed_{user_data.password}", # Apenas um exemplo!
        cep=user_data.cep,
        street=user_data.street,
        number=user_data.number,
        complement=user_data.complement,
        neighborhood=user_data.neighborhood,
        city=user_data.city,
        state=user_data.state
    )

    # 3. Adicionar à sessão e guardar na base de dados
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    print(f"Utilizador {new_user.email} guardado na base de dados com o ID: {new_user.id}")

    return {"message": f"Utilizador {user_data.firstName} registado com sucesso!"}
