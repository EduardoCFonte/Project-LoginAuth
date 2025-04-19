from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime

class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)
    name = Column(String)
    surname = Column(String)
    birthday = Column(DateTime)
    CPF = Column(Integer)
    
