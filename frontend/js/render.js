document.addEventListener("DOMContentLoaded", async () => {
  let allProducts = await apiGetAllProducts();

  // --- 1. SEARCH SYSTEM ---
  const searchInputs = document.querySelectorAll(".search-wrapper input");
  const searchButtons = document.querySelectorAll(".search-btn");

  function handleSearch(query) {
    const cleanQuery = query.toLowerCase().trim();
    const productGrid = document.getElementById("product-grid");
    
    if (productGrid) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        p.description.toLowerCase().includes(cleanQuery)
      );
      renderGridHTML(filtered);
    } else {
      window.location.href = `catalog.html?search=${encodeURIComponent(cleanQuery)}`;
    }
  }

  searchInputs.forEach(input => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch(input.value);
    });
  });

  searchButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const input = e.target.closest(".search-wrapper").querySelector("input");
      handleSearch(input.value);
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  if (searchParam && searchInputs.length > 0) {
    searchInputs[0].value = decodeURIComponent(searchParam);
  }

  // --- 2. HOME FEATURED CAROUSEL ---
  const homeCarousel = document.getElementById("home-featured-items");
  if (homeCarousel) {
    let currentIndex = 0;

    function renderCarousel() {
      const visibleProducts = [
        allProducts[currentIndex % allProducts.length],
        allProducts[(currentIndex + 1) % allProducts.length],
        allProducts[(currentIndex + 2) % allProducts.length]
      ];

      homeCarousel.innerHTML = visibleProducts.map(item => {
        const isFav = window.favoritesList && window.favoritesList.includes(item.id) ? "active" : "";
        return `
          <div class="carousel-product-card">
            <div class="image-placeholder">Placeholder [Product ${item.id}]</div>
            <h3 style="font-size:1.1rem; font-weight:400;"><a href="product.html?id=${item.id}">${item.name}</a></h3>
            <span style="font-size:0.9rem; font-weight:500; margin-bottom: 1rem; display:block;">${item.price}</span>
            <p style="font-size:0.8rem; color:var(--grey-mid); margin-bottom:1.5rem;">${item.description}</p>
            <div class="product-card-controls">
              <button class="btn" onclick="executeCartAddition(${item.id})">Add to Bag</button>
              <button class="btn-fav ${isFav}" onclick="toggleFavorite(${item.id})" aria-label="Favorite">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    const prevBtn = document.querySelector(".carousel-controls .control-btn:nth-child(1)");
    const nextBtn = document.querySelector(".carousel-controls .control-btn:nth-child(2)");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;
        renderCarousel();
      });
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % allProducts.length;
        renderCarousel();
      });
    }

    window.refreshCarouselUI = renderCarousel;
    renderCarousel();
  }

  // --- 3. PRODUCT CATALOG GRID ---
  const standardGrid = document.getElementById("product-grid");
  function renderGridHTML(itemsToRender) {
    if (!standardGrid) return;
    if (itemsToRender.length === 0) {
      standardGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--grey-mid);">No products match your query.</p>`;
      return;
    }
    standardGrid.innerHTML = itemsToRender.map(item => {
      const isFav = window.favoritesList && window.favoritesList.includes(item.id) ? "active" : "";
      return `
        <div class="product-card">
          <div class="image-placeholder">Placeholder [Product ${item.id}]</div>
          <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <p>${item.price}</p>
          <div class="product-card-controls">
            <button class="btn" onclick="executeCartAddition(${item.id})">Add To Cart</button>
            <button class="btn-fav ${isFav}" onclick="toggleFavorite(${item.id})" aria-label="Favorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  window.refreshGridUI = () => { if(standardGrid) renderGridHTML(allProducts); };

  if (standardGrid) {
    if (searchParam) {
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()));
      renderGridHTML(filtered);
    } else {
      renderGridHTML(allProducts);
    }
  }

  // --- 4. INDIVIDUAL PRODUCT OVERVIEW PANEL ---
  const descriptiveContainer = document.getElementById("product-detail");
  if (descriptiveContainer) {
    const targetId = urlParams.get("id") || "1"; 
    const item = await apiGetProductById(targetId);
    if (item) {
      const isFav = window.favoritesList && window.favoritesList.includes(item.id) ? "active" : "";
      descriptiveContainer.innerHTML = `
        <div class="image-placeholder">Large Preview Placeholder [Product ${item.id}]</div>
        <div class="product-info">
          <h1>${item.name}</h1>
          <div class="price">${item.price}</div>
          <p class="description">${item.description}</p>
          <div class="product-detail-actions">
            <button class="btn" onclick="executeCartAddition(${item.id})">Add to Shopping Bag</button>
            <button class="btn-fav ${isFav}" id="detail-fav-btn" onclick="toggleFavorite(${item.id})" style="padding: 0 1.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
      `;
    }
  }
});

function executeCartAddition(id) {
  if (typeof window.addToCart === "function") { window.addToCart(id); }
}