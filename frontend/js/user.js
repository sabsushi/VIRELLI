document.addEventListener("DOMContentLoaded", () => {
  let session = JSON.parse(localStorage.getItem("VIRELLI_SESSION"));

  if (!session) {
    window.location.href = "auth.html";
    return;
  }

  function renderProfile() {
    const displayBox = document.getElementById("profile-display");
    if (displayBox) {
      displayBox.innerHTML = `
        <p><strong>Account Privilege:</strong> ${session.role.toUpperCase()}</p>
        <p><strong>Full Name:</strong> ${session.name || 'Not Configured'}</p>
        <p><strong>Email Address:</strong> ${session.email}</p>
        <p><strong>Default Address:</strong> ${session.address || 'Not Configured'}</p>
        <button class="btn" onclick="executeLogout()" style="margin-top:1.5rem; padding: 0.5rem 1.5rem; font-size: 0.75rem; background:#8c8c8c; border-color:#8c8c8c; color: white;">Sign Out</button>
      `;
    }
  }

  renderProfile();

  // Bug #17: the address field was unlabelled and saved nowhere. Prefill it,
  // and persist email + address back into the session on submit.
  const emailInput = document.getElementById("profile-email");
  const addressInput = document.getElementById("profile-address");
  if (emailInput) emailInput.value = session.email || "";
  if (addressInput) addressInput.value = session.address || "";

  const profileForm = document.getElementById("profile-info-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newEmail = emailInput ? emailInput.value.trim() : session.email;
      const newAddress = addressInput ? addressInput.value.trim() : session.address;

      if (!newEmail) { alert("Please enter a valid email address."); return; }
      if (!newAddress) { alert("Please enter your address."); return; }

      session.email = newEmail;
      session.address = newAddress;
      localStorage.setItem("VIRELLI_SESSION", JSON.stringify(session));
      renderProfile();
      alert("Details saved.");
    });
  }
});

function executeLogout() {
  if (typeof window.clearShoppingState === 'function') window.clearShoppingState();
  localStorage.removeItem("VIRELLI_SESSION");
  window.location.href = "index.html";
}