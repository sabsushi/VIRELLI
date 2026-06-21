# VIRELLI — Minimal Luxury Streetwear

An e-commerce MVP built as the final project for the Web Programming module (Project I) at ETIC_Algarve, Academic Year 2025/26.

The project is based on the VIRELLI brand concept developed by **Sabrina** and **Tiago** during the Web Design module. It turns that static design into a fully functional web application backed by a database, containerised with Docker, and served via nginx.

---

## Stack Overview

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (no framework) |
| Backend | FastAPI (Python) — approved by tutor as Django alternative |
| Database | SQLite via SQLAlchemy ORM |
| Containerisation | Docker + Docker Compose |
| Frontend server | nginx (Alpine) |

---

## Project Structure

```
VIRELLI/
├── frontend/           # All HTML, CSS, JS and image assets
│   ├── index.html      # Homepage with featured carousel
│   ├── catalog.html    # Product listing with filters
│   ├── product.html    # Product detail page
│   ├── checkout.html   # Multi-step checkout (3 steps + invoice)
│   ├── auth.html       # Sign in / Sign up
│   ├── user.html       # Account profile & password change
│   ├── admin.html      # Admin inventory dashboard (CRUD)
│   ├── about.html      # Studio & contact page
│   ├── styles/         # global.css, components.css
│   ├── js/             # api.js, auth-engine.js, cart.js, components.js, render.js, user.js
│   └── images/         # Hero banner and product photos
├── backend/
│   ├── main.py         # FastAPI app entry point, CORS, table creation
│   ├── models.py       # SQLAlchemy models: Product, User, WishlistItem
│   ├── schemas.py      # Pydantic schemas for request/response validation
│   ├── database.py     # SQLite engine, session factory, get_db dependency
│   ├── auth_users.py   # Password hashing, token creation, auth dependency
│   ├── seed.py         # Seed script to populate initial product data
│   └── routes/
│       ├── products.py # Full CRUD: GET, POST, PUT, DELETE /products
│       ├── auth.py     # POST /auth/login, /auth/register
│       ├── users.py    # GET/PUT/DELETE /users/me
│       ├── wishlist.py # GET/POST/DELETE /wishlist
│       └── checkout.py # POST /checkout
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## Installation & Running

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- No other setup required

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd VIRELLI

# 2. Start the full stack
docker compose up --build

# 3. Open the app
# Frontend: http://localhost
# Backend API docs: http://localhost:8000/docs
```

> **First run:** The database is created automatically on startup. To seed initial products, run:
> ```bash
> docker exec virelli_backend python seed.py
> ```

### Stopping

```bash
docker compose down
```

---

## Environment Variables

No `.env` file is required for local development. The default `DATABASE_URL` is set in `docker-compose.yml`:

```
DATABASE_URL=sqlite:////app/virelli.db
```

If you want to override it, create a `.env` file at the project root:

```
DATABASE_URL=sqlite:////app/virelli.db
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@virelli.com | admin123 |
| User | Register via the Sign Up form | — |

---

## Data Model

```
┌──────────────┐       ┌──────────────────┐       ┌─────────────────┐
│    Product   │       │   WishlistItem   │       │      User       │
├──────────────┤       ├──────────────────┤       ├─────────────────┤
│ id (PK)      │◄──────│ product_id (FK)  │       │ id (PK)         │
│ name         │       │ user_id (FK)     │──────►│ username        │
│ description  │       │ size             │       │ email           │
│ price        │       │ added_at         │       │ hashed_password │
│ image_url    │       │ id (PK)          │       └─────────────────┘
│ category     │       └──────────────────┘
│ sizes        │
└──────────────┘
```

---

## Features

- **Catalogue** — browse all products, filter by size, category, price range and collection group
- **Product detail** — image, description, size selection, add to bag
- **Cart** — persistent across page navigation (localStorage), quantity controls
- **Wishlist / Favourites** — save items, move to cart from drawer
- **Checkout** — 3-step form (address → shipping → payment) with validation, order invoice on completion
- **Authentication** — register and sign in via the FastAPI backend; session stored in localStorage
- **User profile** — view account details, update email/address, change password via backend
- **Admin dashboard** — add, edit and delete products; requires admin login
- **Responsive** — mobile hamburger menu, slide-in filter drawer, stacked layouts on all breakpoints

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | /products/ | List all products |
| GET | /products/{id} | Get single product |
| POST | /products/ | Create product (admin) |
| PUT | /products/{id} | Update product (admin) |
| DELETE | /products/{id} | Delete product (admin) |
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns token |
| GET | /users/me | Get current user |
| PUT | /users/me | Update current user |
| DELETE | /users/me | Delete current user |
| POST | /checkout/ | Process order |

Full interactive docs available at `http://localhost:8000/docs` when the backend is running.

---

## Authors & Contributions

| Name | Primary Contributions |
|---|---|
| **Sabrina** | Visual design (Web Design module), frontend layout, CSS, auth flow, checkout flow |
| **Tiago** | Backend (FastAPI, SQLAlchemy, routes), Docker setup, admin dashboard, responsive implementation |

---

## AI Usage

This project was developed with assistance from the following AI tools:

| Tool | Purpose |
|---|---|
| **Claude (Anthropic)** | Responsive layout implementation (hamburger menu, mobile filter drawer, CSS breakpoints), bug fixes across frontend JS (cart, auth validation, password confirm, localStorage security), README authoring |
| **Gemini (Google)** | Initial `Dockerfile` and `docker-compose.yml` architecture, `uv` integration for faster Docker builds, `.gitignore` configuration, debugging Docker environment consistency |
| **GitHub Copilot** | Inline code suggestions during development of FastAPI routes and SQLAlchemy queries |

All AI-generated code was reviewed, tested and understood before being committed. Every team member can explain any part of the codebase.

---

## User Guide

See [`USER_GUIDE.md`](USER_GUIDE.md) for a plain-language description of how to use the application.
