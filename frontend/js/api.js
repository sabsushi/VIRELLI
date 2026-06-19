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

async function apiGetAllProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/products/`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Could not load products from backend.", e);
    return [];
  }
}

async function apiGetProductById(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (e) {
    console.error("Could not load product " + id + " from backend.", e);
    return null;
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