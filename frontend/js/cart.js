let cart = JSON.parse(localStorage.getItem("VIRELLI_CART")) || [];
window.favoritesList = JSON.parse(localStorage.getItem("VIRELLI_FAVS")) || [];

// --- FAVORITES ENGINE CONTROLS ---
window.toggleFavorite = function(id) {
  const index = window.favoritesList.indexOf(id);
  if (index > -1) {
    window.favoritesList.splice(index, 1);
  } else {
    window.favoritesList.push(id);
  }
  localStorage.setItem("VIRELLI_FAVS", JSON.stringify(window.favoritesList));
  updateFavUI();
  
  // Instantly sync background buttons state 
  if (typeof window.refreshCarouselUI === "function") window.refreshCarouselUI();
  if (typeof window.refreshGridUI === "function") window.refreshGridUI();
  
  const detailFavBtn = document.getElementById("detail-fav-btn");
  if (detailFavBtn) {
    detailFavBtn.classList.toggle("active", window.favoritesList.includes(id));
  }
};

function updateFavUI() {
  const countBadge = document.getElementById("fav-count");
  if (countBadge) countBadge.innerText = window.favoritesList.length;
  renderFavoritesDrawer();
}

async function renderFavoritesDrawer() {
  const container = document.getElementById("fav-modal-items");
  if (!container) return;

  if (window.favoritesList.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem; color:var(--grey-mid); padding: 1rem 0;">No items favorited yet.</p>`;
    return;
  }

  let itemsHTML = "";
  for (let id of window.favoritesList) {
    const item = await apiGetProductById(id);
    if (item) {
      itemsHTML += `
        <div class="fav-item-row">
          <div class="image-placeholder">60x60</div>
          <div style="flex-grow:1;">
            <h4 style="font-size:0.85rem; text-transform:uppercase; font-weight:400;">${item.name}</h4>
            <p style="font-size:0.8rem; color:var(--grey-mid);">${item.price}</p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn" style="padding:0.4rem 0.8rem; font-size:0.65rem;" onclick="addToCart(${item.id})">Add</button>
            <button style="font-size:1.2rem; padding:0 0.5rem; color:var(--grey-mid);" onclick="toggleFavorite(${item.id})">&times;</button>
          </div>
        </div>
      `;
    }
  }
  container.innerHTML = itemsHTML;
}

// --- SHOPPING BAG CONTROLS ---
window.addToCart = function(productId) {
  if (typeof apiGetProductById === "function") {
    apiGetProductById(productId).then(productData => {
      if (productData) {
        cart.push(productData);
        localStorage.setItem("VIRELLI_CART", JSON.stringify(cart));
        updateCartUI();
        renderCheckoutCart(); 
        alert(`${productData.name} added to bag.`);
      }
    });
  }
};

window.changeQty = function(id, delta) {
  if (delta === 1) {
    apiGetProductById(id).then(productData => {
      if (productData) {
        cart.push(productData);
        syncCartState();
      }
    });
  } else if (delta === -1) {
    const targetIndex = cart.findIndex(item => item.id === id);
    if (targetIndex > -1) {
      cart.splice(targetIndex, 1);
      syncCartState();
    }
  }
};

function syncCartState() {
  localStorage.setItem("VIRELLI_CART", JSON.stringify(cart));
  updateCartUI();
  renderCheckoutCart();
}

function updateCartUI() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = cart.length;
}

function renderCheckoutCart() {
  const summaryContainer = document.getElementById("checkout-summary-items");
  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--grey-mid); padding: 1rem 0;">Your shopping bag is empty.</p>`;
    document.getElementById("summary-subtotal").innerText = "€ 0.00";
    document.getElementById("summary-total").innerText = "€ 0.00";
    return;
  }

  const itemMap = {};
  cart.forEach(item => {
    if (itemMap[item.id]) { 
      itemMap[item.id].qty += 1; 
    } else { 
      itemMap[item.id] = { ...item, qty: 1 }; 
    }
  });

  let subtotal = 0;
  summaryContainer.innerHTML = Object.values(itemMap).map(item => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    subtotal += numericPrice * item.qty;
    return `
      <div class="checkout-item-row">
        <div class="checkout-item-left">
          <div class="image-placeholder">50x50</div>
          <div class="checkout-item-meta">
            <h4>${item.name}</h4>
            <p>Size: L</p>
            <div class="qty-stepper" style="margin-top:0.35rem;">
              <button type="button" onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.qty}</span>
              <button type="button" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>
        <div class="checkout-item-price">€ ${(numericPrice * item.qty).toFixed(2)}</div>
      </div>
    `;
  }).join("");

  document.getElementById("summary-subtotal").innerText = `€ ${subtotal.toFixed(2)}`;
  document.getElementById("summary-total").innerText = `€ ${subtotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  updateFavUI();
  renderCheckoutCart();
  
  const drawer = document.getElementById("favorites-drawer");
  const openBtn = document.getElementById("fav-toggle-btn");
  const closeBtn = document.getElementById("fav-close-btn");

  if (drawer && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => drawer.classList.add("open"));
    closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
  }

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.style.display = "none";
      document.querySelector(".checkout-steps").style.display = "none";
      document.getElementById("confirmation").style.display = "block";
      
      cart = [];
      localStorage.removeItem("VIRELLI_CART");
      updateCartUI();
    });
  }
});