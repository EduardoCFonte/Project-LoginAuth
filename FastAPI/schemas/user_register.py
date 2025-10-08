from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    firstName: str
    lastName: str
    cpf: str
    phone: str
    email: EmailStr 
    password: str
    cep: str
    street: str
    number: str
    complement: str | None = None 
    neighborhood: str
    city: str
    state: str