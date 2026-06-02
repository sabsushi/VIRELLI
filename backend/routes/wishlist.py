from fastapi import APIRouter

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.get("/")
def get_wishlist():
    return [{"id": 1, "name": "Premium Product Example", "price": 99}]

@router.post("/{product_id}")
def add_to_wishlist(product_id: int):
    return {"status": "success", "message": f"Product {product_id} added to wishlist"}

@router.delete("/{product_id}")
def remove_from_wishlist(product_id: int):
    return {"status": "success", "message": f"Product {product_id} removed from wishlist"}