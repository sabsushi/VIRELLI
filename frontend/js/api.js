// =======================================================
// CENTRAL ISOLATED OVERRIDE CONTROL TOGGLE SWITCH
// =======================================================
const USE_BACKEND_API = true; 
const BACKEND_URL = "http://localhost:8000"; 

async function apiGetAllProducts() {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products`);
      return await response.json();
    } catch (e) { 
      console.error("Backend unavailable.", e);
    }
  }
  const extended = JSON.parse(localStorage.getItem('VIRELLI_EXTENDED_INVENTORY')) || [];
  return [...MOCK_PRODUCTS, ...extended];
}

async function apiGetProductById(id) {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products/${id}`);
      return await response.json();
    } catch (e) { {} }
  }
  const combined = await apiGetAllProducts();
  return combined.find(p => p.id === parseInt(id));
}