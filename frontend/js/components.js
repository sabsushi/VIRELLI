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

// Favorites drawer toggling
document.addEventListener('click', function(e) {
  if (e.target.closest('#fav-toggle-btn')) {
    const drawer = document.getElementById('favorites-drawer');
    if (drawer) drawer.classList.toggle('open');
    return;
  }

  if (e.target.closest('#fav-close-btn')) {
    const drawer = document.getElementById('favorites-drawer');
    if (drawer) drawer.classList.remove('open');
    return;
  }

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

// Live search (desktop)
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
