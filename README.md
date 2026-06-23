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

## BACKEND (FastApi/SQLite/SQLAlchemy)

## 1. Core Architecture & Development Support
During the initial phase of development, Artificial Intelligence was utilized as a theoretical and practical support tool to define and structure the API mechanics and user authentication flows.

* **Token-Based Authentication Concepts:** Assisted in understanding the theoretical lifecycle and operation of JSON Web Tokens (JWT), client-side persistence strategies (`localStorage`), and secure transmission over HTTP headers (`Authorization: Bearer <token>`).
* **FastAPI Backend Implementation:** Supported the structural code generation and route planning for the FastAPI Python framework, leveraging SQLAlchemy ORM patterns and Pydantic schemas for strict data validation.
* **Full-Stack Integration:** Guided the continuous mapping of data layers, effectively bridging dynamic client-side rendering files in JavaScript (`js/components.js`, `js/render.js`) with specific asynchronous endpoints exposed by the API.

---

## 2. Infrastructure & Database Troubleshooting
Focused on debugging critical data persistence failures caused by the project's containerized infrastructure.

### 2.1. SQL Data Persistence Failure (Docker Volumes)
* **Issue Identified:** Data submitted through frontend forms was not being permanently stored in the SQLite database tables after the Docker container lifecycle ended.
* **Diagnosis:** The `DATABASE_URL` path was pointing to a volatile, temporary directory inside the isolated Docker container filesystem, completely unmapped from the host computer.
* **Solution Applied:** 1. Reconfigured the environment variable to point to `/app/virelli.db`, forcing direct mapping to the shared persistent volume directory located within `/backend`.
  2. Restarted and rebuilt the containerized environment (`docker compose down` and `up -d`).
  3. Manually purged the browser's client-side cache (`localStorage`) to discard conflicting obsolete states.

### 2.2. Bcrypt Library Hashing Failure
* **Issue Identified:** A misleading error message was triggered inside the Swagger UI documentation sandbox, claiming that user passwords exceeded the strict 72-byte limit.
* **Diagnosis:** The core underlying `bcrypt` hashing algorithm strictly requires binary input data (`bytes`). However, the FastAPI router layer was passing raw textual data (`strings`) directly to it.
* **Solution Applied:** Refactored the Python cryptography helper functions by applying `.encode('utf-8')` to incoming password strings prior to submitting them to the `bcrypt.hashpw()` method, and used `.decode('utf-8')` to safely store the resulting secure hash as database-compatible string blocks inside SQLite.

---

## 3. Frontend Integration & UI/UX Bug Fixing
Resolved dynamic browser rendering errors caused by variable type crashes and asymmetric DOM manipulations.

### 3.1. Checkout Order List Crash
* **Issue Identified:** The shopping bag item rows within the final checkout display view completely disappeared or failed to render during runtime.
* **Diagnosis:** A critical JavaScript execution crash occurred because the client-side code tried to perform text manipulation routines on a field where the API backend returned a numeric object (`float` value like `45.00` instead of a static formatted string like `"45.00€"`).
* **Solution Applied:** Adjusted the data types inside the local template loops to ensure JavaScript treats the currency values as true floating-point numbers, delegating visual symbols and currency formatting rules exclusively to isolated UI helper methods.

### 3.2. Wishlist Synchronization and Dynamic Removal
* **Issue Identified:** The sliding contextual favorites drawer displayed generic `Product #1` placeholders instead of actual catalog names, and action buttons suffered from inaccurate overlapping CSS layout layers.
* **Diagnosis:** The `GET /wishlist/me` endpoint was returning unmapped, raw table structures lacking proper entity relationships. Furthermore, the UI lacked an automated *Event Delegation* strategy to intercept asynchronous actions safely.
* **Solution Applied:**
  1. Optimized the backend routing Python query by introducing an explicit `.join()` method on the `Product` table to immediately append the `product_name` attribute to the payload.
  2. Fixed stacking layout priorities by adjusting CSS `z-index` properties on the sliding sidebar components.
  3. Implemented an asynchronous workflow where triggering "Add to Bag" fires a non-blocking `POST` request to clear the item from the DB wishlist, appends the metadata to the active shopping cart layout (`window.addToCart`), and triggers a fluid visual fade-out transition row animation without requiring a full page refresh.

---

## 4. Transition from Hardcoded Data to Dynamic Backoffice
* **Objective:** Remove static data layers pre-populated directly into the client-side source code and transition the layout into a fully authenticated, dynamic catalog dashboard.
* **AI Methodology Applied:**
  * Replaced outdated local fallback mechanisms (storing mock product structures inside local browser arrays) with native JavaScript asynchronous `fetch` requests targeted at the server's `POST /products/` API endpoint.
  * Implemented string-cleaning routines inside the backoffice admin interface panels, ensuring that human-input values containing currency markers (e.g., "€ 299.00") are sanitized into valid numbers (`floats`) before being validated against the FastAPI Pydantic parsing schemas.

---

## User Guide

See [`USER_GUIDE.md`](USER_GUIDE.md) for a plain-language description of how to use the application.
