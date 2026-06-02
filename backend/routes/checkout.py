from fastapi import APIRouter

router = APIRouter(prefix="/checkout", tags=["Checkout"])

@router.post("/")
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