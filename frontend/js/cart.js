let cart = JSON.parse(localStorage.getItem('VIRELLI_CART')) || [];
window.favoritesList = (JSON.parse(localStorage.getItem('VIRELLI_FAVS')) || []).map(Number);

// --- Bug #5: robust price parsing/formatting -----------------------------
// Handles numbers, "€ 29.99", European "1.299,00" and US "1,299.00".
window.parsePrice = function parsePrice(value) {
  if (typeof value === 'number') return isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;
  let s = value.replace(/[^\d.,]/g, '');
  if (!s) return 0;
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma > lastDot) {
    // comma is the decimal separator, dots are thousands separators
    s = s.split('.').join('').replace(',', '.');
  } else if (lastDot > lastComma) {
    // dot is the decimal separator, commas are thousands separators
    s = s.split(',').join('');
  } else {
    // no separators
    s = s.replace(/,/g, '');
  }
  const n = parseFloat(s);
  return isFinite(n) ? n : 0;
};

window.formatPrice = function formatPrice(value) {
  return '€ ' + window.parsePrice(value).toFixed(2);
};

// --- Bug #8: derive a real size instead of hardcoding "L" -----------------
function defaultSizeFor(product) {
  if (product && typeof product.sizes === 'string' && product.sizes.trim()) {
    return product.sizes.split(',')[0].trim();
  }
  if (product && Array.isArray(product.sizes) && product.sizes.length) {
    return String(product.sizes[0]).trim();
  }
  return 'One Size';
}

// --- Bugs #1 & #2: clear cart + favourites on logout ----------------------
// Wipes both storage and in-memory state, then refreshes any visible badges.
window.clearShoppingState = function clearShoppingState() {
  cart = [];
  window.favoritesList = [];
  localStorage.removeItem('VIRELLI_CART');
  localStorage.removeItem('VIRELLI_FAVS');
  if (typeof updateCartUI === 'function') updateCartUI();
  if (typeof updateFavUI === 'function') updateFavUI();
};

window.addToCart = function(productId, size) {
  apiGetProductById(productId).then(productData => {
    if (!productData) return;
    const chosenSize = size || defaultSizeFor(productData);
    cart.push({ ...productData, size: chosenSize });
    syncCartState();
    showToast(`${productData.name} added to bag`, 'cart');
  });
};

window.changeQty = function(id, delta, size) {
  if (delta === 1) {
    apiGetProductById(id).then(productData => {
      if (productData) {
        cart.push({ ...productData, size: size || defaultSizeFor(productData) });
        syncCartState();
      }
    });
  } else if (delta === -1) {
    const idx = cart.findIndex(item => item.id === id && (size === undefined || item.size === size));
    if (idx > -1) { cart.splice(idx, 1); syncCartState(); }
  }
};

window.removeFromCart = function(id, size) {
  cart = cart.filter(item => !(item.id === id && (size === undefined || item.size === size)));
  syncCartState();
};

function syncCartState() {
  localStorage.setItem('VIRELLI_CART', JSON.stringify(cart));
  updateCartUI();
  renderCheckoutCart();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.length;
}

function renderCheckoutCart() {
  const container = document.getElementById('checkout-summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem;color:var(--grey-mid);padding:1rem 0;">Your shopping bag is empty.</p>`;
    if (subtotalEl) subtotalEl.textContent = '€ 0.00';
    if (totalEl) totalEl.textContent = '€ 0.00';
    return;
  }

  const itemMap = {};
  cart.forEach(item => {
    if (item && item.id) {
      const size = item.size || defaultSizeFor(item);
      const key = item.id + '__' + size;
      itemMap[key] ? itemMap[key].qty++ : (itemMap[key] = { ...item, size: size, qty: 1 });
    }
  });

  let subtotal = 0;
  container.innerHTML = Object.values(itemMap).map(item => {
    const price = window.parsePrice(item.price);

    subtotal += price * item.qty;

    return `
      <div class="checkout-item-row">
        <div class="checkout-item-left">
          <div class="image-placeholder" style="width:60px;height:60px;flex-shrink:0;overflow:hidden;">
            ${item.image_url ? `<img src="${item.image_url}" alt="${item.name || ''}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">` : ''}
          </div>
          <div class="checkout-item-meta">
            <h4>${item.name || 'Product'}</h4>
            <p>Size: ${item.size}</p>
            <div class="qty-stepper" style="margin-top:0.35rem;">
              <button type="button" onclick="changeQty(${item.id}, -1, '${item.size}')">−</button>
              <span>${item.qty}</span>
              <button type="button" onclick="changeQty(${item.id}, 1, '${item.size}')">+</button>
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem;">
          <span class="checkout-item-price">€ ${(price * item.qty).toFixed(2)}</span>
          <button onclick="removeFromCart(${item.id}, '${item.size}')" style="font-size:0.7rem;color:var(--grey-mid);text-transform:uppercase;letter-spacing:0.05em;">Remove</button>
        </div>
      </div>`;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `€ ${subtotal.toFixed(2)}`;
  const total = subtotal + (window.shippingCost || 0);
  if (totalEl) totalEl.textContent = `€ ${total.toFixed(2)}`;

  const checkoutTotal = document.getElementById('checkout-calculated-total');
  if (checkoutTotal) checkoutTotal.textContent = `€ ${total.toFixed(2)}`;
}

window.toggleFavorite = function(id) {
  id = Number(id);
  window.favoritesList = window.favoritesList.map(Number);
  const idx = window.favoritesList.indexOf(id);
  const isAdding = idx === -1;

  if (isAdding) {
    window.favoritesList.push(id);
  } else {
    window.favoritesList.splice(idx, 1);
  }

  localStorage.setItem('VIRELLI_FAVS', JSON.stringify(window.favoritesList));
  updateFavUI();

  document.querySelectorAll('.btn-fav[data-id="' + id + '"]').forEach(function(btn) {
    btn.classList.toggle('active', isAdding);
    if (isAdding) {
      btn.classList.add('fav-pop');
      setTimeout(function() { btn.classList.remove('fav-pop'); }, 400);
    }
  });

  var detailBtn = document.getElementById('detail-fav-btn');
  if (detailBtn) {
    detailBtn.classList.toggle('active', isAdding);
    if (isAdding) {
      detailBtn.classList.add('fav-pop');
      setTimeout(function() { detailBtn.classList.remove('fav-pop'); }, 400);
    }
  }

  showToast(isAdding ? 'Added to favorites' : 'Removed from favorites', 'heart');
};

function updateFavUI() {
  var badge = document.getElementById('fav-count');
  if (badge) badge.textContent = window.favoritesList.length;
  renderFavoritesDrawer();
}

async function renderFavoritesDrawer() {
  const container = document.getElementById('fav-modal-items');
  if (!container) return;
  if (typeof apiGetProductById !== 'function') return;
  if (window.favoritesList.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem;color:var(--grey-mid);padding:1rem 0;">No items favorited yet.</p>`;
    return;
  }
  const esc = (typeof window.escapeHTML === 'function') ? window.escapeHTML : function(v){ return v; };
  const fmt = (typeof window.formatPrice === 'function') ? window.formatPrice : function(v){ return v; };
  let html = '';
  for (let id of window.favoritesList) {
    const item = await apiGetProductById(id);
    if (item) {
      html += `
        <div class="fav-item-row">
          <div class="image-placeholder" style="width:60px;height:60px;flex-shrink:0;overflow:hidden;">
            ${item.image_url ? `<img src="${item.image_url}" alt="${esc(item.name)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'">` : ''}
          </div>
          <div style="flex-grow:1;">
            <h4 style="font-size:0.85rem;text-transform:uppercase;font-weight:400;">${esc(item.name)}</h4>
            <p style="font-size:0.8rem;color:var(--grey-mid);">${fmt(item.price)}</p>
          </div>
          <div style="display:flex;gap:0.5rem;align-items:center;">
            <button class="btn" style="padding:0.4rem 0.8rem;font-size:0.65rem;" onclick="addToCart(${item.id}); toggleFavorite(${item.id})">Add</button>
            <button style="font-size:1.2rem;padding:0 0.5rem;color:var(--grey-mid);" onclick="toggleFavorite(${item.id})">&times;</button>
          </div>
        </div>`;
    }
  }
  container.innerHTML = html;
}

function showToast(message, type) {
  type = type || 'cart';
  var toast = document.getElementById('virelli-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'virelli-toast';
    toast.className = 'virelli-toast';
    document.body.appendChild(toast);
  }
  const icon = type === 'heart'
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

  toast.innerHTML = icon + '<span>' + message + '</span>';
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();
  updateFavUI();
  renderCheckoutCart();
});