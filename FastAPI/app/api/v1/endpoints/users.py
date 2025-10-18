from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, services, models
from app.core.database import get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register", response_model=schemas.UserRegister)
def register_user(user_data: schemas.UserRegister, db: Session = Depends(get_db)):
    """
    Endpoint para registrar um novo usuário.
    """
    return services.user_service.create_user(db=db, user_data=user_data)
