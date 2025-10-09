from ..core.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String, index=True)
    lastName = Column(String)
    cpf = Column(String, unique=True, index=True)
    phone = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String) 
    cep = Column(String)
    street = Column(String)
    number = Column(String)
    complement = Column(String, nullable=True)
    neighborhood = Column(String)
    city = Column(String)
    state = Column(String(2)) 
    