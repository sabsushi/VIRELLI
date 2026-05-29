async function renderCatalog() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "<p>Loading...</p>";
  const products = await getProducts();
  if (!products.length) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <a href="product.html?id=${p.id}">
        <img src="${p.image_url || ''}" alt="${p.name}">
      </a>
      <h3>${p.name}</h3>
      <p>€${p.price.toFixed(2)}</p>
      <button class="btn" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    </div>
  `).join("");
}

async function renderProduct() {
  const detail = document.getElementById("product-detail");
  if (!detail) return;
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) { detail.innerHTML = "<p>No product selected.</p>"; return; }
  const p = await getProduct(id);
  if (!p) { detail.innerHTML = "<p>Product not found.</p>"; return; }
  detail.innerHTML = `
    <div class="product-detail">
      <img src="${p.image_url || ''}" alt="${p.name}">
      <div class="product-info">
        <h1>${p.name}</h1>
        <p class="price">€${p.price.toFixed(2)}</p>
        <p class="description">${p.description || ''}</p>
        <button class="btn" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
      </div>
    </div>
  `;
}

renderCatalog();
renderProduct();