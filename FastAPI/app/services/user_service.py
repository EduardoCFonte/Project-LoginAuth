from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from .. import models, schemas 
from ..core.security import get_password_hash

def create_user(db: Session, user_data: schemas.user_register) -> models.User:
    """
    Cria um novo usuário no banco de dados.
    """
    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-mail já registrado")
    db_user_cpf = db.query(models.User).filter(models.User.cpf == user_data.cpf).first()
    if db_user_cpf:
        raise HTTPException(status_code=400, detail="CPF já registrado")

    password_after_hash = get_password_hash(user_data.password)

    new_user = models.User(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        cpf=user_data.cpf,
        phone=user_data.phone,
        email=user_data.email,
        password=password_after_hash, 
        cep=user_data.cep,
        street=user_data.street,
        number=user_data.number,
        complement=user_data.complement,
        neighborhood=user_data.neighborhood,
        city=user_data.city,
        state=user_data.state
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def get_user_by_email(db: Session, email: str) -> models.User | None:
    """Busca um utilizador pelo seu endereço de email."""
    return db.query(models.User).filter(models.User.email == email).first()