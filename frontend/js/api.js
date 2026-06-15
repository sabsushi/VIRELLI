// =======================================================
// CENTRAL ISOLATED OVERRIDE CONTROL TOGGLE SWITCH
// =======================================================
const USE_BACKEND_API = true; 
const BACKEND_URL = "http://localhost:8000"; 

async function apiGetAllProducts() {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products/`);
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

async function apiCreateProduct(productData) {
  if (USE_BACKEND_API) {
    try {
      const response = await fetch(`${BACKEND_URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });
      
      const data = await response.json();
      return { success: response.ok, data: data };
    } catch (e) {
      console.error("Backend unavailable during creation.", e);
      return { success: false, data: { detail: "Backend server offline." } };
    }
  }

  try {
    let dynamicCatalog = JSON.parse(localStorage.getItem("VIRELLI_EXTENDED_INVENTORY")) || [];
    const nextId = 4 + dynamicCatalog.length;
    
    const newProduct = { id: nextId, ...productData };
    dynamicCatalog.push(newProduct);
    localStorage.setItem("VIRELLI_EXTENDED_INVENTORY", JSON.stringify(dynamicCatalog));
    
    return { success: true, data: newProduct };
  } catch (e) {
    return { success: false, data: { detail: "Local storage save failed." } };
  }
}