// =======================================================
// CENTRAL ISOLATED OVERRIDE CONTROL TOGGLE SWITCH
// =======================================================
const USE_BACKEND_API = true; 
const BACKEND_URL = "http://localhost:8000"; 

// =======================================================
// PRESET INVENTORY COLLECTION STRUCTURE SEEDS
// =======================================================
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: "Basic Slim Fit T-Shirt", 
    price: "€ 199.00", 
    collection: "essentials", 
    description: "An exceptional everyday luxury piece tailored from premium long-staple modular cotton yarn." 
  },
  { 
    id: 2, 
    name: "Basic Heavy Weight T-Shirt", 
    price: "€ 199.00", 
    collection: "essentials", 
    description: "Heavy luxury knit boxy streetwear item designed to retain form indefinitely." 
  },
  { 
    id: 3, 
    name: "Full Sleeve Zipper", 
    price: "€ 199.00", 
    collection: "summer", 
    description: "Minimalist industrial slider tailored beautifully for clean structural layering." 
  }
];

// =======================================================
// DATA FETCH LAYER INTERFACES
// =======================================================
async function apiGetAllProducts() {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products`);
      return await response.json();
    } catch (e) { 
      console.error("Backend server offline. Running fallback data loops safely.", e);
    }
  }
  return MOCK_PRODUCTS;
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