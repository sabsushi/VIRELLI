// =======================================================
// VIRELLI API CLIENT
// The backend is the single source of truth for products.
// =======================================================
const BACKEND_URL = "http://localhost:8000";

// Escape admin/user-controlled text before inserting it via innerHTML.
// Prevents stored XSS through product names, descriptions, etc.
window.escapeHTML = function escapeHTML(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Demo products shown when backend is offline
const DEMO_PRODUCTS = [
  { id: 1, name: 'Leather Jacket', description: 'Premium biker leather jacket with asymmetric zip and signature Virelli embroidery.', price: 299.00, category: 'outerwear', sizes: 'S,M,L,XL', image_url: 'images/products/leather-jacket.jpg' },
  { id: 2, name: 'Navy Shirt',     description: 'Classic navy button-down shirt in Portuguese cotton. Relaxed fit.', price: 89.00,  category: 'shirts',    sizes: 'XS,S,M,L,XL,2XL', image_url: 'images/products/navy-shirt.jpg' },
  { id: 3, name: 'Olive Half-Zip', description: 'Minimal olive half-zip pullover. Technical fabric, athletic cut.', price: 129.00, category: 'tops',      sizes: 'S,M,L,XL', image_url: 'images/products/olive-halfzip.jpg' },
  { id: 4, name: 'Olive Overshirt',description: 'Relaxed-fit overshirt in olive cotton twill. Two chest pockets.', price: 149.00, category: 'shirts',    sizes: 'S,M,L,XL,2XL', image_url: 'images/products/olive-overshirt.jpg' },
  { id: 5, name: 'White Longsleeve', description: 'Essential white long-sleeve tee in heavyweight cotton.', price: 69.00,  category: 'tops',      sizes: 'XS,S,M,L,XL', image_url: 'images/products/white-longsleeve.jpg' },
];

async function apiGetAllProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/products/`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('Backend offline — showing demo products.', e.message);
    return DEMO_PRODUCTS;
  }
}

async function apiGetProductById(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (e) {
    console.warn('Backend offline — using demo product fallback.', e.message);
    return DEMO_PRODUCTS.find(function(p) { return p.id === Number(id); }) || null;
  }
}

async function apiCreateProduct(productData) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    return { success: response.ok, data: data };
  } catch (e) {
    console.error("Backend unavailable during creation.", e);
    return { success: false, data: { detail: "Backend server offline." } };
  }
}

async function apiUpdateProduct(id, productData) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    return { success: response.ok, data: data };
  } catch (e) {
    console.error("Backend unavailable during update.", e);
    return { success: false, data: { detail: "Backend server offline." } };
  }
}

async function apiDeleteProduct(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: "DELETE"
    });
    return { success: response.ok || response.status === 204 };
  } catch (e) {
    console.error("Backend unavailable during deletion.", e);
    return { success: false };
  }
}