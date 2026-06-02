from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db
from models import Product

app = FastAPI(
    title="Virelli API",
    description="Backend for the Virelli e-commerce platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/products", tags=["Main Page"])
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@app.get("/products/{product_id}", tags=["Product Detail"])
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Product not found"
        )
    return product

@app.get("/wishlist", tags=["Wishlist"])
def get_wishlist():
    return [
        {
            "id": 1, 
            "name": "Premium Product Example", 
            "price": 99,
        }
    ]

@app.post("/wishlist/{product_id}", tags=["Wishlist"])
def add_to_wishlist(product_id: int):
    return {"status": "success", "message": f"Product {product_id} added to wishlist"}

@app.delete("/wishlist/{product_id}", tags=["Wishlist"])
def remove_from_wishlist(product_id: int):
    return {"status": "success", "message": f"Product {product_id} removed from wishlist"}

@app.post("/checkout", tags=["Checkout"])
def process_checkout(order_data: dict):
    purchased_items = order_data.get("items", [])
    return {
        "status": "success",
        "message": "Order successfully placed",
        "order_details": {
            "order_id": 4321,
            "total_items": len(purchased_items),
            "order_status": "Processing"
        }
    }