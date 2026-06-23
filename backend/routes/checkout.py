from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import time
from datetime import datetime
from models import Order, OrderItem

router = APIRouter(prefix="/checkout", tags=["Checkout"])

@router.post("/")
def process_checkout(order_data: dict, db: Session = Depends(get_db)):
    purchased_items = order_data.get("items", [])
    customer_info   = order_data.get("customer", {})

    total = 0.0
    for item in purchased_items:
        try:
            price = float(''.join(c for c in str(item.get("price", "0")) if c.isdigit() or c == '.'))
            total += price * item.get("qty", 1)
        except ValueError:
            pass

    order_ref = f"VRL-{int(time.time())}"

    order = Order(
        order_ref=order_ref,
        total=round(total, 2),
        customer_name=f"{customer_info.get('firstName','')} {customer_info.get('lastName','')}".strip(),
        customer_email=customer_info.get("email", ""),
        created_at=datetime.utcnow().isoformat()
    )
    db.add(order)   
    db.flush() 

    for item in purchased_items:
        db.add(OrderItem(
            order_id=order.id,
            product_id=item.get("id"),
            name=item.get("name"),
            price=float(''.join(c for c in str(item.get("price","0")) if c.isdigit() or c=='.')),
            qty=item.get("qty", 1),
            size=item.get("size")
        ))

    db.commit()

    return {
    "status": "success",
    "order_details": {
        "order_id": order_ref,
        "total_price": order.total,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "items": [
            {
                "id": item.product_id,
                "name": item.name,
                "price": item.price,
                "qty": item.qty,
                "size": item.size
            }
            for item in db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        ]
    }
}