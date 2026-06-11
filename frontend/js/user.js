document.addEventListener("DOMContentLoaded", () => {
  let session = JSON.parse(localStorage.getItem("VIRELLI_SESSION"));

  if (!session) {
    window.location.href = "auth.html";
    return;
  }

  const displayBox = document.getElementById("profile-display");
  if (displayBox) {
    displayBox.innerHTML = `
      <p><strong>Account Privilege:</strong> ${session.role.toUpperCase()}</p>
      <p><strong>Full Name:</strong> ${session.name}</p>
      <p><strong>Email Address:</strong> ${session.email}</p>
      <p><strong>Default Address:</strong> ${session.address || 'Not Configured'}</p>
      <button class="btn" onclick="executeLogout()" style="margin-top:1.5rem; padding: 0.5rem 1.5rem; font-size: 0.75rem; background:#8c8c8c; border-color:#8c8c8c; color: white;">Sign Out</button>
    `;
  }
});

function executeLogout() {
  localStorage.removeItem("VIRELLI_SESSION");
  window.location.href = "index.html";
}