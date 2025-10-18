from fastapi import APIRouter
from .endpoints import users
from .endpoints import login

router = APIRouter()

router.include_router(users.router, tags=["Users"])
router.include_router(login.router, tags=["Login"])