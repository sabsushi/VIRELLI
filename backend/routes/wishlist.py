from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import WishlistItem, Product, User
from auth_users import get_current_user
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
from schemas import Wishlist    

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@router.post("/add")
def add_to_wishlist(data: Wishlist, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")


    exists = db.query(WishlistItem).filter(
        WishlistItem.user_id == current_user.id,
        WishlistItem.product_id == data.product_id,
        WishlistItem.size == data.size
    ).first()

    if exists:
        db.delete(exists)
        db.commit()
        return {"detail": "Removed from wishlist"}


    new_item = WishlistItem(
        user_id=current_user.id,
        product_id=data.product_id,
        size=data.size,
        added_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    )
    
    db.add(new_item)
    db.commit()
    return {"detail": "Added to wishlist"}

@router.get("/me")
def get_my_wishlist(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    results = (
        db.query(WishlistItem, Product.name)
        .join(Product, WishlistItem.product_id == Product.id)
        .filter(WishlistItem.user_id == current_user.id)
        .all()
    )
    
    wishlist_items = []
    for item, product_name in results:
        wishlist_items.append({
            "id": item.id,
            "product_id": item.product_id,
            "product_name": product_name,  
            "size": item.size,
            "added_at": item.added_at
        })
        
    return wishlist_items