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
│   ├── forgot-password.html # Password reset page
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

> **First run:** The database is created automatically on startup.

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
│ image_url    │       │ id (PK)          │       │ address         │
│ category     │       └──────────────────┘       └─────────────────┘
│ sizes        │
└──────┬───────┘
       │
       │          ┌──────────────┐       ┌─────────────────┐
       │          │    Order     │       │   OrderItem     │
       │          ├──────────────┤       ├─────────────────┤
       │          │ id (PK)      │◄──────│ order_id (FK)   │
       │          │ user_id (FK) │       │ product_id      │
       │          │ order_ref    │       │ name            │
       │          │ total        │       │ price           │
       │          │ customer_name│       │ qty             │
       │          │ customer_email│      │ size            │
       │          │ created_at   │       │ id (PK)         │
       │          └──────────────┘       └─────────────────┘
       └──────────────────────────────────────────┘
```

---

## Features

- **Catalog** — browse all products, filter by size, category, price range and collection group
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

---

### FRONTEND (HTML / CSS / JavaScript)

AI assistance was used across all layers of the frontend. The specifics are broken down below by area.

#### HTML Pages

All eight HTML pages were scaffolded or significantly shaped with AI assistance:

- `index.html` — homepage structure and featured carousel host element
- `catalog.html` — product grid layout, filter sidebar with category and price checkboxes, active filter tags bar, and mobile filter drawer overlay
- `product.html` — product detail layout including image column, info column, size selector, and add-to-cart button
- `checkout.html` — three-step multi-page checkout flow (Information, Shipping, Payment) with a final invoice/confirmation step
- `auth.html` — combined sign-in and sign-up form with tab switching
- `forgot-password.html` — password reset page
- `user.html` — account profile card and password change section
- `admin.html` — admin inventory dashboard with add-product form and live product table with edit/delete controls
- `about.html` — brand story and contact section

AI was used to generate the initial markup structure for all of these pages and to iterate on layout and accessibility attributes (aria labels, roles).

#### JavaScript

**`api.js`**
- `escapeHTML()` utility to prevent stored XSS when rendering user-controlled product names and descriptions via `innerHTML`
- All async fetch wrappers: `apiGetProductById`, `apiGetAllProducts`, and the corresponding POST/PUT/DELETE admin endpoints

**`cart.js`**
- `parsePrice()` — robust price parser handling numbers, Euro-formatted strings (`€ 29.99`), European decimal notation (`1.299,00`), and US notation (`1,299.00`) (Bug #5)
- `formatPrice()` — consistent Euro display formatter
- `getSelectedSize()` — derives the selected size from the DOM rather than hardcoding `"L"` (Bug #8)
- `clearUserData()` — clears cart and favourites from localStorage on logout, fixing a session bleed issue (Bugs #1 and #2)
- Full cart sidebar rendering with quantity controls, item removal, subtotal, shipping, and total calculation
- Favourites (wishlist) toggle logic with heart animation and toast notification

**`auth-engine.js`**
- Client-side SHA-256 implementation to avoid storing the admin password in plaintext in source code (Bug #9)
- JWT token storage and retrieval from localStorage
- Auth state detection used across all pages to show/hide login-dependent UI

**`components.js`**
- Full reusable navigation component (`getNavHTML`) with active-page highlighting, live search input with dropdown, cart badge, favourites badge, and account link
- Mobile hamburger button and slide-in navigation drawer with search, wishlist, and account links
- Favourites drawer (modal overlay) with dynamic item list
- Toast notification system
- All nav wiring: hamburger toggle, mobile search, search dropdown live filtering, auth-aware account link redirect

**`render.js`**
- Skeleton loading placeholders for the home carousel and product detail page while the backend responds (Bug #15)
- Home featured carousel with animated slide transitions (slide-in/slide-out), previous/next controls, and auto-advance
- Product grid rendering for the catalog page
- Product detail page rendering (image, name, category, price, description, size selector, add-to-cart, favourites toggle)
- Search parameter reading from the URL query string for cross-page search navigation

**`user.js`**
- Profile data fetching and display
- Password change form with current password verification and confirmation field matching

#### CSS

**`global.css`** (619 lines)
- CSS custom properties (design tokens: colours, spacing, typography)
- Global reset and base element styles
- Full navigation styles including desktop layout, search dropdown, icon buttons, and badges
- Mobile-responsive navigation overrides using `@media` queries
- Mobile hamburger animation and slide-in drawer styles
- Favourites drawer (modal) and overlay
- Toast notification animations

**`components.css`** (437 lines)
- Product card component styles including hover effects and favourite button positioning
- Skeleton loading animation (`vir-skeleton`, `skeleton-thumb`, `skeleton-line`)
- Filter sidebar styles for desktop and mobile (drawer overlay, open/close states)
- Active filter tag pill styles
- Checkout multi-step layout, step navigation buttons, form grid, and invoice/confirmation section
- Admin dashboard grid and form styles
- Profile and account page card layouts
- Button variants and shared form input styles

#### Responsive Design

The full responsive overhaul was done with AI assistance. Every page was reviewed for mobile breakpoints. Key work included:

- Collapsing the desktop nav into a hamburger menu with a slide-in drawer on mobile
- Converting multi-column layouts (catalog grid, product detail, checkout, admin) to single-column stacks on small screens
- Adjusting font sizes using `clamp()` for fluid scaling
- Moving the filter sidebar to a mobile drawer with an overlay and toggle button
- Making the checkout form grid collapse from two columns to one on narrow viewports

#### Bug Fixes

Several specific bugs were identified and fixed with AI support during development:

- **Bug #1, #2:** Cart and favourites not cleared on logout (session bleed between users)
- **Bug #5:** Price parsing failing on non-numeric strings and European number formats
- **Bug #8:** Selected size hardcoded to `"L"` instead of reading from the DOM
- **Bug #9:** Admin password stored in plaintext in source; replaced with a SHA-256 digest
- **Bug #15:** No loading state on product data; blank screen flash before backend responds; fixed with skeleton placeholders

#### Presentation Slides

The project presentation slides were also produced with AI assistance. AI was used to suggest the slide structure and section order, draft speaker notes and talking points, and refine written content for clarity and conciseness.

---

### BACKEND (FastAPI / SQLite / SQLAlchemy)

#### 1. Core Architecture & Development Support
During the initial phase of development, Artificial Intelligence was utilised as a theoretical and practical support tool to define and structure the API mechanics and user authentication flows.

- **Cryptographic Authentication (JWT):** Assisted in replacing the legacy static token system with an industry-standard OAuth2 architecture using JSON Web Tokens (JWT).
- **FastAPI Backend Implementation:** Supported the structural code generation and route planning for the FastAPI Python framework, leveraging SQLAlchemy ORM patterns and Pydantic schemas for strict data validation.
- **Full-Stack Integration:** Guided the continuous mapping of data layers, effectively bridging dynamic client-side rendering files in JavaScript (`js/components.js`, `js/render.js`) with specific asynchronous endpoints exposed by the API.

---

#### 2. Infrastructure & Database Troubleshooting
Focused on debugging critical data persistence failures caused by the project's containerised infrastructure.

**2.1. SQL Data Persistence Failure (Docker Volumes)**
- **Issue Identified:** Data submitted through frontend forms was not being permanently stored in the SQLite database tables after the Docker container lifecycle ended.
- **Diagnosis:** The `DATABASE_URL` path was pointing to a volatile, temporary directory inside the isolated Docker container filesystem, completely unmapped from the host computer.
- **Solution Applied:** Reconfigured the environment variable to point to `/app/virelli.db`, forcing direct mapping to the shared persistent volume directory located within `/backend`. Restarted and rebuilt the containerised environment (`docker compose down` and `up -d`). Manually purged the browser's client-side cache (`localStorage`) to discard conflicting obsolete states.

**2.2. Bcrypt Library Hashing Failure**
- **Issue Identified:** A misleading error message was triggered inside the Swagger UI documentation sandbox, claiming that user passwords exceeded the strict 72-byte limit.
- **Diagnosis:** The core underlying `bcrypt` hashing algorithm strictly requires binary input data (`bytes`). However, the FastAPI router layer was passing raw textual data (`strings`) directly to it.
- **Solution Applied:** Refactored the Python cryptography helper functions by applying `.encode('utf-8')` to incoming password strings prior to submitting them to the `bcrypt.hashpw()` method, and used `.decode('utf-8')` to safely store the resulting secure hash as database-compatible string blocks inside SQLite.

---

#### 3. Frontend Integration & UI/UX Bug Fixing
Resolved dynamic browser rendering errors caused by variable type crashes and asymmetric DOM manipulations.

**3.1. Checkout Order List Crash**
- **Issue Identified:** The shopping bag item rows within the final checkout display view completely disappeared or failed to render during runtime.
- **Diagnosis:** A critical JavaScript execution crash occurred because the client-side code tried to perform text manipulation routines on a field where the API backend returned a numeric object (`float` value like `45.00` instead of a static formatted string like `"45.00€"`).
- **Solution Applied:** Adjusted the data types inside the local template loops to ensure JavaScript treats the currency values as true floating-point numbers, delegating visual symbols and currency formatting rules exclusively to isolated UI helper methods.

**3.2. Wishlist Synchronisation and Dynamic Removal**
- **Issue Identified:** The sliding contextual favourites drawer displayed generic `Product #1` placeholders instead of actual catalog names, and action buttons suffered from inaccurate overlapping CSS layout layers.
- **Diagnosis:** The `GET /wishlist/me` endpoint was returning unmapped, raw table structures lacking proper entity relationships. Furthermore, the UI lacked an automated Event Delegation strategy to intercept asynchronous actions safely.
- **Solution Applied:** Optimised the backend routing Python query by introducing an explicit `.join()` method on the `Product` table to immediately append the `product_name` attribute to the payload. Fixed stacking layout priorities by adjusting CSS `z-index` properties on the sliding sidebar components. Implemented an asynchronous workflow where triggering "Add to Bag" fires a non-blocking `POST` request to clear the item from the DB wishlist, appends the metadata to the active shopping cart layout (`window.addToCart`), and triggers a fluid visual fade-out transition row animation without requiring a full page refresh.

---

#### 4. Transition from Hardcoded Data to Dynamic Backoffice
- **Objective:** Remove static data layers pre-populated directly into the client-side source code and transition the layout into a fully authenticated, dynamic catalog dashboard.
- **AI Methodology Applied:** Replaced outdated local fallback mechanisms (storing mock product structures inside local browser arrays) with native JavaScript asynchronous `fetch` requests targeted at the server's `POST /products/` API endpoint. Implemented string-cleaning routines inside the backoffice admin interface panels, ensuring that human-input values containing currency markers (e.g., `€ 299.00`) are sanitised into valid numbers (`floats`) before being validated against the FastAPI Pydantic parsing schemas.

 ### 5. Backend Architecture & Database Object-Relational Mapping (ORM)
**Objective** — Establish a decoupled, scalable, and highly organized backend structure to handle data persistence, business logic, and cross-origin client requests.

**Approach** — The backend architecture was systematically segregated into distinct functional layers using FastAPI, separating database models, validation contracts, and API routes to enforce a strict separation of concerns:
* **`models.py` (SQLAlchemy Layer):** Defines the physical database schema and relational structures (e.g., users, products, orders, and wishlist items) mapped directly to the SQLite database. It establishes data types, primary keys, and foreign key constraints.
* **`schemas.py` (Pydantic Layer):** Functions as the data validation and serialization matrix. It intercepts incoming HTTP request payloads, performing strict type coercion and sanitization before the data reaches the database layer, returning explicit `422 Unprocessable Entity` errors if contracts are violated.
* **`routes/` (Controller Layer):** Houses the modularized API endpoints (e.g., `/auth`, `/products`, `/wishlist`, `/checkout`). These Python routes serve as the execution layer, processing asynchronous client demands.

**Client-Server Connectivity via Fetch API:**
The synchronization between the vanilla JavaScript frontend and the Python backend is executed entirely through asynchronous HTTP requests utilizing the native browser `fetch()` API. The frontend dispatches structured JSON payloads alongside appropriate authorization headers containing the user session token. The FastAPI routing mechanisms capture these headers, extract the client identifiers, execute the queried database operations, and stream a JSON response back to the client UI to dynamically mutate the DOM without forcing complete page reloads.

---

### 6. Containerized Image Pipeline & Docker Bind Mounts
**Objective** — Enable seamless media upload pipelines from the administrative dashboard to the isolated backend environment while ensuring real-time asset availability on the web server frontend.

**Approach** — Because the application executes within completely isolated Docker containers (FastAPI for the backend and Nginx for the frontend), direct container-to-container file sharing is restricted by default. To circumvent this without relying on complex external cloud storage providers, a dual **Deterministic Bind Mount (Docker Volumes)** strategy was implemented within the `docker-compose.yml` orchestrator:

1. **Backend Target Volume (`/app/images`):** The Python backend declares a local directory variable via `os.makedirs("/app/images")` to receive and process raw binary data streams from administrative product uploads. In the Docker Compose layer, this internal path is bound directly to the host machine's directory at `./frontend/images/products`.
2. **Frontend Mirroring:** Concurrently, the Nginx container mounts the host's entire `./frontend` folder into its web-root directory (`/usr/share/nginx/html`).

**Execution Lifecycle:**
When an administrator uploads a new product image, the FastAPI container writes the file bytes to its local `/app/images` path. The Docker volume instantly reflects this change on the host's physical storage layer. Since Nginx mirrors that exact directory branch, the new media file immediately becomes accessible to the web server, allowing the frontend client to seamlessly resolve and display product images via static asset URLs.
---

## User Guide

See [`USER_GUIDE.md`](USER_GUIDE.md) for a plain-language description of how to use the application.