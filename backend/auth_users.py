from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from database import get_db
from models import User

def hash_password(password: str) -> str:
    return password

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return plain_password == hashed_password

def create_access_token(data: dict) -> str:
    return str(data.get("sub"))

def get_current_user(authorization: str = Header(default=None), db: Session = Depends(get_db)) -> User:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
        
    token_clear = authorization.replace("Bearer ", "").strip()
    
    try:
        user_id = int(token_clear)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user