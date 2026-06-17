from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
import models  # registers all models with Base before create_all
from routes import products, wishlist, checkout, auth, users

# Create all database tables on startup if they don't exist
Base.metadata.create_all(bind=engine)

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

app.include_router(products.router)
app.include_router(wishlist.router)
app.include_router(checkout.router)
app.include_router(auth.router)
app.include_router(users.router)