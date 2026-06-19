document.addEventListener('DOMContentLoaded', async function() {

  // Bug #15: render skeleton placeholders while products load.
  const carouselSkeletonHost = document.getElementById('home-featured-items');
  if (carouselSkeletonHost) {
    carouselSkeletonHost.innerHTML = Array.from({ length: 3 }).map(() => `
      <div class="carousel-product-card skeleton-card">
        <div class="image-placeholder vir-skeleton skeleton-thumb"></div>
        <div class="vir-skeleton skeleton-line medium"></div>
        <div class="vir-skeleton skeleton-line short"></div>
      </div>`).join('');
  }
  const detailSkeletonHost = document.getElementById('product-detail');
  if (detailSkeletonHost) {
    detailSkeletonHost.innerHTML = `
      <div class="image-placeholder vir-skeleton" style="min-height:480px;"></div>
      <div class="product-info">
        <div class="vir-skeleton skeleton-line short"></div>
        <div class="vir-skeleton skeleton-line medium" style="height:28px;"></div>
        <div class="vir-skeleton skeleton-line short"></div>
        <div class="vir-skeleton skeleton-line" style="width:90%;"></div>
        <div class="vir-skeleton skeleton-line" style="width:80%;"></div>
      </div>`;
  }

  let allProducts = await apiGetAllProducts();

  // If the backend is unreachable, apiGetAllProducts returns [].
  // Show a visible warning so it's clear the server isn't running.
  if (allProducts.length === 0) {
    const anyHost = document.getElementById('home-featured-items') || document.getElementById('product-grid');
    if (anyHost) {
      anyHost.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:3rem;color:#999;font-size:0.85rem;">No products found. Make sure the backend is running and products have been added via the admin dashboard.</p>';
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');

  
  const homeCarousel = document.getElementById('home-featured-items');
  if (homeCarousel) {
    let currentIndex = 0;
    let isAnimating = false;

    // Wrap the grid in a clip container so slides animate within bounds
    homeCarousel.style.cssText = 'position:relative;overflow:hidden;min-height:420px;';

    function buildSlide(index) {
      const visibleCount = Math.min(3, allProducts.length);
      const items = [];
      for (let k = 0; k < visibleCount; k++) {
        items.push(allProducts[(index + k) % allProducts.length]);
      }
      const slide = document.createElement('div');
      slide.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;position:absolute;inset:0;';
      slide.innerHTML = items.map(function(item) {
        const isFav = window.favoritesList && window.favoritesList.map(Number).indexOf(Number(item.id)) > -1;
        let displayCategory = item.category || 'Collection';
        if (displayCategory.includes(':')) {
          const parts = displayCategory.split(':');
          displayCategory = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }
        return `
          <div class="carousel-product-card">
            <a href="product.html?id=${item.id}" class="carousel-card-image-link">
              <div class="image-placeholder" role="img" aria-label="${escapeHTML(item.name)} — product image">
                ${item.image_url ? `<img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.name)}" style="width:100%;height:100%;object-fit:cover;object-position:center 40%;display:block;" onerror="this.style.display='none'">` : ''}
              </div>
            </a>
            <div class="carousel-card-body">
              <h3 class="carousel-card-name"><a href="product.html?id=${item.id}">${escapeHTML(item.name)}</a></h3>
              <p class="carousel-card-price">${window.formatPrice(item.price)}</p>
            </div>
          </div>`;
      }).join('');
      return slide;
    }

    function renderCarousel(direction) {
      if (!allProducts || allProducts.length === 0) {
        homeCarousel.innerHTML = '<p style="color:var(--grey-mid);font-size:0.85rem;">No products available.</p>';
        isAnimating = false;
        return;
      }

      const incoming = buildSlide(currentIndex);
      const DURATION = 420;
      const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

      if (direction && homeCarousel.children.length > 0) {
        const outgoing = homeCarousel.children[0];

        // Position incoming off-screen
        incoming.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        incoming.style.opacity = '0';
        homeCarousel.appendChild(incoming);

        // Force reflow so the initial transform is painted before we transition
        incoming.getBoundingClientRect();

        const transitionVal = `transform ${DURATION}ms ${easing}, opacity ${DURATION}ms ${easing}`;
        outgoing.style.transition = transitionVal;
        incoming.style.transition = transitionVal;

        // Slide old out, slide new in
        outgoing.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        outgoing.style.opacity = '0';
        incoming.style.transform = 'translateX(0)';
        incoming.style.opacity = '1';

        setTimeout(function() {
          outgoing.remove();
          incoming.style.transition = '';
          // Make the container flow-height again now that only one slide exists
          homeCarousel.style.minHeight = incoming.offsetHeight + 'px';
          isAnimating = false;
        }, DURATION + 20);
      } else {
        homeCarousel.innerHTML = '';
        incoming.style.cssText = incoming.style.cssText + 'opacity:0;transform:translateY(12px);';
        homeCarousel.appendChild(incoming);
        incoming.getBoundingClientRect();
        incoming.style.transition = `opacity 380ms ease, transform 380ms ease`;
        incoming.style.opacity = '1';
        incoming.style.transform = 'translateY(0)';
        setTimeout(function() {
          incoming.style.transition = '';
          isAnimating = false;
        }, 400);
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
      let displayCategory = item.category || 'Collection';
      if (displayCategory.includes(':')) {
        const parts = displayCategory.split(':');
        displayCategory = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
      return `
        <div class="product-card">
          <a href="product.html?id=${item.id}">
            <div class="image-placeholder" role="img" aria-label="${escapeHTML(item.name)} — product image">
              ${item.image_url ? `<img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.name)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">` : ''}
            </div>
          </a>
          <h3><a href="product.html?id=${item.id}">${escapeHTML(item.name)}</a></h3>
          <p>${window.formatPrice(item.price)}</p>
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
      // Always show the full size grid; fade out sizes not available for this product
      const fullSizeGrid = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
      const availableSizes = (typeof item.sizes === 'string' && item.sizes.trim())
        ? item.sizes.split(',').map(function(s){ return s.trim(); }).filter(Boolean)
        : [];

      let selectedSize = '';
      for (let i = 0; i < fullSizeGrid.length; i++) {
        if (availableSizes.indexOf(fullSizeGrid[i]) > -1) {
          selectedSize = fullSizeGrid[i];
          break;
        }
      }

      detailContainer.innerHTML = `
        <div class="product-detail-image">
          <div class="image-placeholder" role="img" aria-label="${escapeHTML(item.name)}">
            ${item.image_url ? `<img src="${escapeHTML(item.image_url)}" alt="${escapeHTML(item.name)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">` : ''}
          </div>
        </div>
        <div class="product-info">
          <p class="product-info-category">${escapeHTML(item.category || 'Collection')}</p>
          <h1>${escapeHTML(item.name)}</h1>
          <div class="price">${window.formatPrice(item.price)}</div>
          <p class="description">${escapeHTML(item.description)}</p>

          <span class="size-label">Select Size</span>
          <div class="size-options">
            ${fullSizeGrid.map(function(s) {
              const isAvailable = availableSizes.indexOf(s) > -1;
              const isDefault = s === selectedSize;
              if (isAvailable) {
                return `<button class="size-btn${isDefault ? ' selected' : ''}" data-size="${escapeHTML(s)}"
                  style="border:1px solid #000;background:${isDefault ? '#000' : '#fff'};color:${isDefault ? '#fff' : '#000'};padding:0.6rem 1.2rem;cursor:pointer;font-family:var(--font);font-weight:500;">${escapeHTML(s)}</button>`;
              } else {
                return `<button class="size-btn disabled" data-size="${escapeHTML(s)}" disabled
                  style="border:1px solid var(--grey-light);background:#fafafa;color:#cccccc;padding:0.6rem 1.2rem;cursor:not-allowed;opacity:0.4;font-family:var(--font);">${escapeHTML(s)}</button>`;
              }
            }).join('')}
          </div>

          <div class="product-detail-actions">
            <button class="btn-add-bag" id="detail-add-btn">
              <span class="btn-label">Add to Shopping Bag</span>
              <span class="btn-check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Added to Bag
              </span>
            </button>
            <button class="btn-fav ${isFav ? 'active' : ''}" id="detail-fav-btn"
              onclick="window.toggleFavorite(${item.id})" style="padding:0 1.2rem;border:1px solid var(--grey-light);background:#fff;color:var(--grey-mid);transition:all 0.25s ease;" aria-label="Favorite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <div class="product-meta-row">
            <span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Free returns within 30 days
            </span>
            <span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Standard shipping 5–7 days
            </span>
          </div>
        </div>`;

      // Size button selection — only non-disabled buttons
      detailContainer.querySelectorAll('.size-btn:not([disabled])').forEach(function(btn) {
        btn.addEventListener('click', function() {
          detailContainer.querySelectorAll('.size-btn:not([disabled])').forEach(function(b) {
            b.classList.remove('selected');
            b.style.background = '#fff';
            b.style.color = '#000';
          });
          btn.classList.add('selected');
          btn.style.background = '#000';
          btn.style.color = '#fff';
          selectedSize = btn.dataset.size;
        });
      });

      // Add to bag with animation
      const addBtn = document.getElementById('detail-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', function() {
          if (addBtn.classList.contains('added')) return;
          window.addToCart(item.id, selectedSize);
          addBtn.classList.add('added');

          // Show persistent cart reminder bar
          var reminder = document.getElementById('cart-reminder');
          if (reminder) {
            reminder.classList.add('visible');
          }

          setTimeout(function() {
            addBtn.classList.remove('added');
          }, 2200);
        });
      }
    }

    // Cart reminder bar — show if cart already has items on page load
    var cartData = JSON.parse(localStorage.getItem('VIRELLI_CART') || '[]');
    var reminder = document.getElementById('cart-reminder');
    if (reminder && cartData.length > 0) {
      reminder.classList.add('visible');
      var countEl = reminder.querySelector('#reminder-count');
      if (countEl) countEl.textContent = cartData.length;
    }
  }
});