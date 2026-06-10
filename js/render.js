
document.addEventListener('DOMContentLoaded', async function() {
  if (typeof initLiveSearch === 'function') initLiveSearch();

  let allProducts = await apiGetAllProducts();

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');

  
  const homeCarousel = document.getElementById('home-featured-items');
  if (homeCarousel) {
    let currentIndex = 0;
    let isAnimating = false;

    function renderCarousel(direction) {
      direction = direction || null;
      const items = [
        allProducts[currentIndex % allProducts.length],
        allProducts[(currentIndex + 1) % allProducts.length],
        allProducts[(currentIndex + 2) % allProducts.length]
      ];

      const incoming = document.createElement('div');
      incoming.className = 'carousel-slide';
      incoming.style.cssText = 'display:contents;';
      incoming.innerHTML = items.map(function(item) {
        const isFav = window.favoritesList && window.favoritesList.map(Number).indexOf(Number(item.id)) > -1;
        return `
          <div class="carousel-product-card">
            <div class="image-placeholder" role="img" aria-label="${item.name} — product image"></div>
            <h3 style="font-size:1.1rem;font-weight:400;">
              <a href="product.html?id=${item.id}">${item.name}</a>
            </h3>
            <span style="font-size:0.9rem;font-weight:500;margin-bottom:1rem;display:block;">${item.price}</span>
            <p style="font-size:0.8rem;color:var(--grey-mid);margin-bottom:1.5rem;">${item.description}</p>
            <div class="product-card-controls">
              <button class="btn" onclick="window.addToCart(${item.id})">Add to Bag</button>
              <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${item.id}"
                onclick="window.toggleFavorite(${item.id})" aria-label="Favorite">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>`;
      }).join('');

      if (direction && homeCarousel.children.length > 0) {
        const old = Array.from(homeCarousel.children);
        const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const slideInClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
        old.forEach(function(c) { c.classList.add(slideOutClass); });
        incoming.querySelectorAll('.carousel-product-card').forEach(function(c) {
          c.classList.add(slideInClass);
          homeCarousel.appendChild(c);
        });
        setTimeout(function() {
          old.forEach(function(c) { c.remove(); });
          homeCarousel.querySelectorAll('.carousel-product-card').forEach(function(c) {
            c.classList.remove(slideInClass);
          });
          isAnimating = false;
        }, 400);
      } else {
        homeCarousel.innerHTML = '';
        incoming.querySelectorAll('.carousel-product-card').forEach(function(c) {
          homeCarousel.appendChild(c);
        });
        isAnimating = false;
      }
    }

    const prevBtn = document.querySelector('.carousel-controls .control-btn:nth-child(1)');
    const nextBtn = document.querySelector('.carousel-controls .control-btn:nth-child(2)');
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;
        renderCarousel('prev');
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % allProducts.length;
        renderCarousel('next');
      });
    }

    renderCarousel(null);
  }

  // ---- 2. PRODUCT CATALOG GRID (index.html uses #product-grid) ----
  const standardGrid = document.getElementById('product-grid');

  function renderGridHTML(itemsToRender) {
    if (!standardGrid) return;
    if (itemsToRender.length === 0) {
      standardGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--grey-mid);">No products match your search.</p>`;
      return;
    }
    standardGrid.innerHTML = itemsToRender.map(function(item) {
      const isFav = window.favoritesList && window.favoritesList.map(Number).indexOf(Number(item.id)) > -1;
      return `
        <div class="product-card">
          <a href="product.html?id=${item.id}">
            <div class="image-placeholder" role="img" aria-label="${item.name} — product image"></div>
          </a>
          <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <p>${item.price}</p>
          <div class="product-card-controls">
            <button class="btn" onclick="window.addToCart(${item.id})">Add to Bag</button>
            <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${item.id}"
              onclick="window.toggleFavorite(${item.id})" aria-label="Favorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>`;
    }).join('');
  }

  if (standardGrid) {
    if (searchParam) {
      const q = searchParam.toLowerCase();
      renderGridHTML(allProducts.filter(function(p) {
        return p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
      }));
    } else {
      renderGridHTML(allProducts);
    }
  }

  // ---- 3. PRODUCT DETAIL PAGE ----
  const detailContainer = document.getElementById('product-detail');
  if (detailContainer) {
    const targetId = urlParams.get('id') || '1';
    const item = await apiGetProductById(targetId);
    if (item) {
      const isFav = window.favoritesList && window.favoritesList.map(Number).indexOf(Number(item.id)) > -1;
      detailContainer.innerHTML = `
        <div class="image-placeholder" style="min-height:480px;font-size:0.75rem;">Large Preview [Product ${item.id}]</div>
        <div class="product-info">
          <p style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--grey-mid);">Cotton Layer</p>
          <h1>${item.name}</h1>
          <div class="price">${item.price}</div>
          <p class="description">${item.description}</p>
          <div class="product-detail-actions">
            <button class="btn" onclick="window.addToCart(${item.id})">Add to Shopping Bag</button>
            <button class="btn-fav ${isFav ? 'active' : ''}" id="detail-fav-btn"
              onclick="window.toggleFavorite(${item.id})" style="padding:0 1.5rem;" aria-label="Favorite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>`;
    }
  }
});
