from fastapi import APIRouter
import time

router = APIRouter(prefix="/checkout", tags=["Checkout"])

@router.post("/")
def process_checkout(order_data: dict):

    purchased_items = order_data.get("items", [])
    customer_info = order_data.get("customer", {})

    total_price = 0.0
    for item in purchased_items:
        try:
            price_clean = float(''.join(c for c in item.get("price", "0") if c.isdigit() or c == '.'))
            qty = item.get("qty", 1)
            total_price += price_clean * qty
        except ValueError:
            pass

    order_id = f"VRL-{int(time.time())}"

    return {
        "status": "success",
        "message": "Order successfully placed",
        "order_details": {
            "order_id": order_id,
            "total_items": len(purchased_items),
            "total_price": round(total_price, 2),
            "customer_name": f"{customer_info.get('firstName', '')} {customer_info.get('lastName', '')}",
            "customer_email": customer_info.get("email", ""),
            "items": purchased_items 
        }
    }