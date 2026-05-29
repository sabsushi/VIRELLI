const BASE_URL = "http://localhost:8000";

async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Failed to load products");
    return await res.json();
  } catch (err) {
    console.error(err);
    document.getElementById("product-grid").innerHTML = "<p>Could not load products.</p>";
    return [];
  }
}

async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}