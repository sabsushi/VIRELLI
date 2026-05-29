function getCart() {
  return JSON.parse(localStorage.getItem("virelli-cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("virelli-cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  saveCart(cart);
  alert(`${name} added to cart.`);
}

function removeFromCart(id) {
  saveCart(getCart().filter(item => item.id !== id));
  renderCheckout();
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function renderCheckout() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name} x${item.quantity}</span>
      <span>€${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join("") + `<p style="margin-top:1rem;font-weight:500;">Total: €${total.toFixed(2)}</p>`;
}

document.getElementById("checkout-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  if (!name || !email || !address) {
    alert("Please fill in all fields.");
    return;
  }
  localStorage.removeItem("virelli-cart");
  document.getElementById("checkout-form").style.display = "none";
  document.getElementById("confirmation").style.display = "block";
});

updateCartCount();
renderCheckout();