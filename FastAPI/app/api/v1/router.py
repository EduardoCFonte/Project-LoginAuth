# Em: /app/api/v1/router.py

from fastapi import APIRouter
from .endpoints import users, auth

# Cria um roteador principal para a v1
router = APIRouter()

# Inclui o roteador de usuários
router.include_router(users.router, tags=["Users"])

# Inclui o roteador de autenticação
router.include_router(auth.router, tags=["Authentication"])