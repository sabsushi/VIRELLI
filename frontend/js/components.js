function getNavHTML(activePage = '') {
  return `
  <nav class="main-nav">
    <div class="nav-left">
      <a href="index.html" class="logo">VIRELLI</a>
      <div class="nav-links">
        <a href="catalog.html" class="${activePage === 'collections' ? 'active' : ''}">Collections</a>
        <a href="about.html" class="${activePage === 'about' ? 'active' : ''}">About</a>
      </div>
    </div>

    <div class="nav-right">
      <div class="search-wrapper" style="position:relative;">
        <input type="text" id="nav-search-input" placeholder="Search products…" autocomplete="off">
        <button class="search-btn" id="nav-search-btn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <div id="search-dropdown" class="search-dropdown" style="display:none;"></div>
      </div>
      <div class="nav-icons">
        <button class="icon-link" id="fav-toggle-btn" aria-label="Favorites">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span id="fav-count">0</span>
        </button>
        <a href="checkout.html" class="icon-link" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span id="cart-count">0</span>
        </a>
        <a href="user.html" class="icon-link" id="nav-account-link" aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
      </div>
    </div>

    <!-- Hamburger button (mobile only) -->
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- Mobile slide-in drawer -->
  <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true">
    <div class="mobile-search-wrap">
      <input type="text" id="mobile-search-input" placeholder="Search products…" autocomplete="off">
      <button class="search-btn" id="mobile-search-btn" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>

    <nav class="mobile-nav-links">
      <a href="catalog.html">Collections</a>
      <a href="about.html">About</a>
    </nav>

    <div class="mobile-nav-icons">
      <button class="icon-link" id="mobile-fav-btn" aria-label="Favorites" style="gap:0.5rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">Wishlist</span>
      </button>
      <a href="checkout.html" class="icon-link" style="gap:0.5rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">Cart</span>
      </a>
      <a href="user.html" class="icon-link" id="mobile-account-link" style="gap:0.5rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">Account</span>
      </a>
    </div>
  </div>

  <!-- Favorites Drawer -->
  <div id="favorites-drawer" class="fav-modal">
    <div class="fav-modal-header">
      <h2>Favorites</h2>
      <button class="fav-modal-close" id="fav-close-btn">&times;</button>
    </div>
    <div id="fav-modal-items" class="fav-modal-items"></div>
  </div>
  `;
}

function getFooterHTML() {
  return `
  <footer class="main-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <span class="footer-logo">VIRELLI</span>
        <p>Minimal urban aesthetics engineered for focus.<br>
        An academic frontend project — ETIC_Algarve Web Programming.</p>
      </div>
      <div class="footer-links-group">
        <div class="footer-column">
          <h4>Collection</h4>
          <a href="catalog.html">All Clothing</a>
        </div>
        <div class="footer-column">
          <h4>Company</h4>
          <a href="about.html">Contact Us</a>
        </div>
        <div class="footer-column">
          <h4>Account</h4>
          <a href="user.html">My Profile</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 VIRELLI Studio. All Rights Reserved.</p>
      <p>Designed by <strong>Sabrina &amp; Tiago</strong></p>
    </div>
  </footer>
  `;
}

function injectLayout(activePage = '') {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = getNavHTML(activePage);
  } else {
    document.body.insertAdjacentHTML('afterbegin', getNavHTML(activePage));
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooterHTML();
  } else {
    document.body.insertAdjacentHTML('beforeend', getFooterHTML());
  }

  // Admin link
  const session = JSON.parse(localStorage.getItem('VIRELLI_SESSION'));
  const accountLink = document.getElementById('nav-account-link');
  const mobileAccountLink = document.getElementById('mobile-account-link');
  if (session && session.role === 'admin') {
    if (accountLink) {
      accountLink.href = 'admin.html';
      accountLink.setAttribute('aria-label', 'Admin Dashboard');
    }
    if (mobileAccountLink) {
      mobileAccountLink.href = 'admin.html';
    }
  }

  // Wire up hamburger
  initHamburger();

  // Enforce nav layout via JS (belt-and-suspenders alongside CSS)
  enforceNavLayout();

  // Wire up mobile search
  initMobileSearch();

  // Wire up mobile favorites button
  const mobileFavBtn = document.getElementById('mobile-fav-btn');
  if (mobileFavBtn) {
    mobileFavBtn.addEventListener('click', () => {
      closeMobileNav();
      const drawer = document.getElementById('favorites-drawer');
      if (drawer) drawer.classList.toggle('open');
    });
  }

  // Always initialise live search after the nav is in the DOM
  if (typeof initLiveSearch === 'function') initLiveSearch();

  updateFavCountFromBackend();
}

function enforceNavLayout() {
  const BREAKPOINT = 900;

  function applyLayout() {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const navLinks    = document.querySelector('.nav-links');
    const navRight    = document.querySelector('.nav-right');
    const hamburger   = document.getElementById('nav-hamburger');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    if (!hamburger) return;

    if (isMobile) {
      if (navLinks)     navLinks.style.display    = 'none';
      if (navRight)     navRight.style.display     = 'none';
      if (hamburger)    hamburger.style.display    = 'flex';
      if (mobileDrawer) mobileDrawer.style.display = mobileDrawer.classList.contains('open') ? 'flex' : 'flex';
    } else {
      if (navLinks)     navLinks.style.display    = '';
      if (navRight)     navRight.style.display     = '';
      if (hamburger)    hamburger.style.display    = 'none';
      if (mobileDrawer) {
        mobileDrawer.style.display = 'none';
        closeMobileNav();
      }
    }
  }

  applyLayout();

  // Keep in sync on resize - ResizeObserver is more reliable than resize event
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(applyLayout);
    ro.observe(document.documentElement);
  } else {
    window.addEventListener('resize', applyLayout);
  }
}

function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMobileNav();
    }
  });
}

function openMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!hamburger || !drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!hamburger || !drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function initMobileSearch() {
  const input = document.getElementById('mobile-search-input');
  const btn = document.getElementById('mobile-search-btn');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeMobileNav();
      window.location.href = `catalog.html?search=${encodeURIComponent(input.value.trim())}`;
    }
  });

  if (btn) {
    btn.addEventListener('click', () => {
      closeMobileNav();
      window.location.href = `catalog.html?search=${encodeURIComponent(input.value.trim())}`;
    });
  }
}

// --- Favorites drawer toggling with Backend integration ---
document.addEventListener('click', async function(e) {
  // 1. If clicking the favorites button (Desktop or Mobile)
  if (e.target.closest('#fav-toggle-btn') || e.target.closest('#mobile-fav-btn')) {
    const drawer = document.getElementById('favorites-drawer');
    if (drawer) {
      drawer.classList.toggle('open');
      
      // If the drawer opened, fetch favorites from the database
      if (drawer.classList.contains('open')) {
        await renderWishlistItems();
      }
    }
    return;
  }

  // 2. If clicking the close button (X) of the drawer
  if (e.target.closest('#fav-close-btn')) {
    const drawer = document.getElementById('favorites-drawer');
    if (drawer) drawer.classList.remove('open');
    return;
  }

  // 3. If clicking outside the drawer, close it
  const drawer = document.getElementById('favorites-drawer');
  if (
    drawer &&
    drawer.classList.contains('open') &&
    !drawer.contains(e.target) &&
    !e.target.closest('#fav-toggle-btn') &&
    !e.target.closest('#mobile-fav-btn')
  ) {
    drawer.classList.remove('open');
  }
});

// --- Function to fetch wishlist data and render HTML inside the drawer ---
async function renderWishlistItems() {
  const container = document.getElementById('fav-modal-items');
  if (!container) return;

  const session = JSON.parse(localStorage.getItem('VIRELLI_SESSION'));
  if (!session || !session.token) {
    container.innerHTML = '<div style="padding:1.5rem; font-size:0.8rem; text-align:center;">Please sign in to view your wishlist.</div>';
    return;
  }

  container.innerHTML = '<div style="padding:1.5rem; font-size:0.8rem; text-align:center; color:#8c8c8c;">Loading…</div>';

  try {
    const response = await fetch('http://localhost:8000/wishlist/me', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const items = await response.json();
      
      // Update visual counter badge
      const favBadge = document.getElementById('fav-count');
      if (favBadge) favBadge.textContent = items.length;

      if (items.length === 0) {
        container.innerHTML = '<div style="padding:1.5rem; font-size:0.8rem; text-align:center; color:#8c8c8c;">Your wishlist is empty.</div>';
        return;
      }

      // Render wishlist items dynamically
      // --- 1. DYNAMICALLY RENDER WISHLIST ITEMS WITHIN DRAWER ---
      // We read from item.product_name or fallback gracefully to the ID template string
      container.innerHTML = items.map(item => {
        const displayName = item.product_name || (item.product ? item.product.name : `Product #${item.product_id}`);
        const esc = (typeof escapeHTML === 'function') ? escapeHTML : function(v){ return v; };

        return `
          <div class="fav-item" style="display:flex; justify-content:space-between; align-items:center; padding:1rem 0; border-bottom:1px solid #f5f5f5;">
            <div style="font-size:0.8rem; font-family:inherit;">
              <p style="margin:0; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--black);">
                ${esc(displayName)}
              </p>
              ${item.size ? `<p style="margin:0.2rem 0 0 0; font-size:0.7rem; color:#8c8c8c;">Size: ${esc(item.size)}</p>` : ''}
            </div>
            
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.4rem;">
              <button class="wishlist-add-to-bag-btn" 
                      data-id="${item.product_id}" 
                      data-size="${esc(item.size || '')}" 
                      style="background:var(--black); color:#fff; border:1px solid var(--black); padding:0.4rem 0.8rem; font-size:0.65rem; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; font-family:var(--font); transition:all 0.2s ease;">
                Add to Bag
              </button>
              <a href="product.html?id=${item.product_id}" style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.05em; text-decoration:underline; color:var(--grey-mid);">
                View
              </a>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.innerHTML = '<div style="padding:1.5rem; font-size:0.8rem; text-align:center; color:#c0392b;">Could not load items.</div>';
    }
  } catch (err) {
    container.innerHTML = '<div style="padding:1.5rem; font-size:0.8rem; text-align:center; color:#c0392b;">Server connection failed.</div>';
  }
}

// --- 2. LIVE SEARCH CONTROLS (DESKTOP) ---
function initLiveSearch() {
  const input = document.getElementById('nav-search-input');
  const dropdown = document.getElementById('search-dropdown');
  const searchBtn = document.getElementById('nav-search-btn');
  if (!input || !dropdown) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();
    if (query.length < 2) { dropdown.style.display = 'none'; return; }
    debounceTimer = setTimeout(() => showLiveResults(query, dropdown), 200);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      dropdown.style.display = 'none';
      window.location.href = `catalog.html?search=${encodeURIComponent(input.value.trim())}`;
    }
    if (e.key === 'Escape') dropdown.style.display = 'none';
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      dropdown.style.display = 'none';
      window.location.href = `catalog.html?search=${encodeURIComponent(input.value.trim())}`;
    });
  }

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

// --- 3. RENDERING SEARCH RESULTS IN DROPDOWN ---
async function showLiveResults(query, dropdown) {
  const products = await apiGetAllProducts();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const esc = (typeof window.escapeHTML === 'function') ? window.escapeHTML : function(v){ return v; };
  const fmt = (typeof window.formatPrice === 'function') ? window.formatPrice : function(v){ return v; };

  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-no-results">No results for "${esc(query)}"</div>`;
    dropdown.style.display = 'block';
    return;
  }

  dropdown.innerHTML = results.map(p => `
    <a href="product.html?id=${p.id}" class="search-result-item">
      <div class="search-result-img"></div>
      <div>
        <div class="search-result-name">${esc(p.name)}</div>
        <div class="search-result-price">${fmt(p.price)}</div>
      </div>
    </a>
  `).join('') + `<a href="catalog.html?search=${encodeURIComponent(query)}" class="search-see-all">See all results &rarr;</a>`;
  dropdown.style.display = 'block';
}

// --- 4. COUNTER UPDATE FROM BACKEND ---
async function updateFavCountFromBackend() {
  const session = JSON.parse(localStorage.getItem('VIRELLI_SESSION'));
  if (!session || !session.token) return;

  try {
    const response = await fetch('http://localhost:8000/wishlist/me', {
      headers: { 'Authorization': `Bearer ${session.token}` }
    });
    if (response.ok) {
      const items = await response.json();
      const favCountBadge = document.getElementById('fav-count');
      if (favCountBadge) {
        favCountBadge.textContent = items.length;
      }
    }
  } catch (err) {
    console.error("Error fetching wishlist items count:", err);
  }
}


// --- 5. EVENT DELEGATION FOR DRAWER ADD-TO-BAG ACTIONS ---
document.addEventListener('click', async function(e) {
  const addToBagBtn = e.target.closest('.wishlist-add-to-bag-btn');
  
  if (addToBagBtn) {
    e.preventDefault();
    
    // Find the parent item row wrapper to animate removal later
    const wishlistRow = addToBagBtn.closest('.fav-item');
    const productId = addToBagBtn.getAttribute('data-id');
    const productSize = addToBagBtn.getAttribute('data-size');
    
    // 1. Add the item to the standard shopping bag
    if (typeof window.addToCart === 'function') {
      window.addToCart(productId, productSize);
    } else {
      console.error("The global window.addToCart function layout could not be found.");
      return;
    }

    // 2. Remove the item from the backend Database Wishlist automatically
    const session = JSON.parse(localStorage.getItem('VIRELLI_SESSION'));
    if (session && session.token) {
      try {
        const response = await fetch('http://localhost:8000/wishlist/add', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: parseInt(productId, 10),
            size: productSize
          })
        });

        if (response.ok) {
          // 3. Trigger the header counter badge update if the method exists
          if (typeof updateFavCountFromBackend === 'function') {
            await updateFavCountFromBackend();
          }

          // 4. Animate the interface row item removal for a premium UX feel
          if (wishlistRow) {
            wishlistRow.style.transition = 'all 0.35s ease';
            wishlistRow.style.opacity = '0';
            wishlistRow.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
              wishlistRow.remove();
              
              // If the wishlist container is now empty, display a clean state message
              const container = document.getElementById('favorites-drawer-container') || wishlistRow.parentNode;
              if (container && container.querySelectorAll('.fav-item').length === 0) {
                container.innerHTML = '<div style="padding:2rem; font-size:0.8rem; text-align:center; color:var(--grey-mid);">Your wishlist is empty.</div>';
              }
            }, 350);
          }
        } else {
          console.error("Backend failed to clear item from wishlist table hierarchy.");
        }
      } catch (err) {
        console.error("Network communication error while syncing wishlist states:", err);
      }
    }
  }
});

