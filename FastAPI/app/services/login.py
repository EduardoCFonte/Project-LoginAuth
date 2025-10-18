from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from ..core.password_security import verify_password
from .. import models

def authenticate_user(db: Session, form_data: OAuth2PasswordRequestForm) -> models.User | None:
    """
    Verifica o email e a senha e retorna o objeto do utilizador se for válido.
    Recebe o form_data diretamente da rota.
    """

    login_user = db.query(models.User).filter(models.User.email == form_data.username).first()
    print(login_user)

    if not login_user:
        return None

    if not verify_password(form_data.password, login_user.password):
        return None
 
    return login_user