from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, services, models
from app.core.database import get_db


router = APIRouter()

@router.post("/register", response_model=schemas.UserRegister)
def register_user(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    """
    Endpoint para registrar um novo usuário.
    """
    # 1. Verifica se o usuário já existe (lógica pode ir para o service)
    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")

    # 2. Chama o serviço para criar o usuário
    #    (No futuro, toda a lógica acima iria para a função do service)
    new_user = services.user_service.create_user(db=db, user_data=user_data)
    
    return new_user