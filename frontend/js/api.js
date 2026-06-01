const USE_BACKEND_API = false; 
const BACKEND_URL = "http://localhost:8000"; 

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Basic Slim Fit T-Shirt",
    price: "€ 199.00",
    description: "An exceptional everyday luxury piece tailored from premium long-staple modular cotton yarn."
  },
  {
    id: 2,
    name: "Basic Heavy Weight T-Shirt",
    price: "€ 249.00",
    description: "Heavy luxury knit boxy streetwear item designed to retain form indefinitely."
  },
  {
    id: 3,
    name: "Full Sleeve Zipper",
    price: "€ 389.00",
    description: "Minimalist industrial slider tailored beautifully for clean structural layering."
  }
];

async function apiGetAllProducts() {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products`);
      return await response.json();
    } catch (e) { 
      console.error("Backend offline, using fallback records", e);
      return MOCK_PRODUCTS; 
    }
  }
  return MOCK_PRODUCTS;
}

async function apiGetProductById(id) {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products/${id}`);
      return await response.json();
    } catch (e) { 
      return MOCK_PRODUCTS.find(p => p.id === parseInt(id)); 
    }
  }
  return MOCK_PRODUCTS.find(p => p.id === parseInt(id));
}