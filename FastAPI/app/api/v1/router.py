from fastapi import APIRouter
from .endpoints import users
from .endpoints import login
from .endpoints import receiver

router = APIRouter()

router.include_router(users.router, tags=["Users"])
router.include_router(login.router, tags=["Login"])
router.include_router(receiver.router, tags=["Receiver"])