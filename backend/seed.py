from database import SessionLocal, engine
from models import Base, Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()

products = [
    Product(name="Oversized Tee", description="Clean minimal tee", price=29.99, category="tops"),
    Product(name="Cargo Trousers", description="Urban utility trousers", price=59.99, category="bottoms"),
    Product(name="Minimal Hoodie", description="Essential streetwear hoodie", price=49.99, category="tops"),
    Product(name="Straight Jeans", description="Classic straight cut", price=54.99, category="bottoms"),
    Product(name="Canvas Tote", description="Everyday carry bag", price=19.99, category="accessories"),
]

db.add_all(products)
db.commit()
db.close()
print("Database seeded.")