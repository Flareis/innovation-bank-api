from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import User
from app.core.security import verify_password, get_password_hash
from app.db.user import UserCreate, UserLogin, UserOut

router = APIRouter()


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar se usuário já existe
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Criar novo usuário com senha hasheada
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        is_active=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=UserOut)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    print("Login attempt for:", user_login.email)
    print("Password provided:", user_login.password)
    # Buscar usuário por email
    user = db.query(User).filter(User.email == user_login.email).first()

    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    # Verificar senha
    if not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    return user
