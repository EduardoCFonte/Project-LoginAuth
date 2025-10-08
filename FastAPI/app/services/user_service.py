from sqlalchemy.orm import Session
from fastapi import HTTPException
# Importa os "mapas" e as "plantas baixas"
from .. import models, schemas 
# No futuro, importaremos a função de hash de senha daqui
# from ..core.security import get_password_hash 

def create_user(db: Session, user_data: schemas.UserCreate) -> models.User:
    """
    Cria um novo usuário no banco de dados.
    """
    # 1. Verifica se o e-mail já existe no banco de dados
    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-mail já registrado")

    # 2. Cria o objeto do modelo User
    #    (NOTA: Em um app real, NUNCA guarde a senha em texto plano!)
    #    hashed_password = get_password_hash(user_data.password)
    new_user = models.User(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        cpf=user_data.cpf,
        phone=user_data.phone,
        email=user_data.email,
        # Substitua a linha abaixo pela de cima quando tiver o hash
        hashed_password=f"nao_usar_em_producao_{user_data.password}", 
        cep=user_data.cep,
        street=user_data.street,
        number=user_data.number,
        complement=user_data.complement,
        neighborhood=user_data.neighborhood,
        city=user_data.city,
        state=user_data.state
    )

    # 3. Adiciona, "commita" (salva) e atualiza o objeto no banco
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 4. Retorna o objeto do usuário recém-criado
    return new_user