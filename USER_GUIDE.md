# VIRELLI — User Guide

VIRELLI is an online streetwear store. This guide explains how to use it.

---

## Browsing Products

Open the app at `http://localhost`. The homepage shows a featured selection of products. Click **Go To Shop** or **Collections** in the navigation to see the full catalogue.

On the catalogue page you can:
- **Search** by typing in the search bar at the top of the product list
- **Filter by size** — click the size boxes (XS, S, M, L, XL, 2XL) and press **Apply Filters**
- **Filter by category** — tick Outerwear, Tops, Shirts, Bottoms or Accessories
- **Filter by price range** — tick one or more price bands
- **Browse by collection** — choose All Pieces, Summer 2026 or Minimalist Essentials
- **Remove a filter** — click the tag that appears above the product grid

On mobile, tap the **Filters** button to open the filter panel.

---

## Product Pages

Click any product image or name to open the detail page. From there you can:
- Select a size (greyed-out sizes are not available for that product)
- Click **Add to Shopping Bag** to add it to your cart
- Click the heart icon to save it to your Wishlist

---

## Cart & Checkout

The bag icon in the navigation shows how many items you have. Click it to go to checkout.

Checkout has three steps:
1. **Information** — enter your shipping address and contact details
2. **Shipping** — choose Standard (free) or Express (€12)
3. **Payment** — enter card details (demo only — no real charge is made)

After completing payment, an order invoice is shown on screen.

---

## Account

**Creating an account:** Click the person icon in the navigation, then choose **Sign Up**. Fill in your name, email and a password (minimum 6 characters). Both password fields must match.

**Signing in:** Use the **Sign In** tab with your email and password.

**Your profile:** After signing in, the person icon takes you to your account page where you can:
- Update your email address and default shipping address
- Change your password

**Signing out:** Click **Sign Out** on your profile page, or from the navigation on mobile.

---

## Wishlist

Click the heart icon on any product to add it to your Wishlist. The heart icon in the navigation opens the Wishlist drawer, where you can move items to your cart or remove them.

---

## Admin (Staff Only)

Log in with the admin credentials (`admin@virelli.com` / `admin123`). The admin dashboard lets you:
- **Add** new products to the catalogue (name, price, category, sizes, image URL, description)
- **Edit** existing products
- **Remove** products from the catalogue

---

## Troubleshooting

**Products not loading:** The backend must be running. Run `docker compose up` from the project folder and wait for both services to start, then refresh the page.

**"Backend server is offline" message:** Same as above — check that Docker is running and the containers are up.
