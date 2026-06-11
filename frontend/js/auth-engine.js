function switchAuthTab(target) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
  
  document.getElementById(`tab-${target}`).classList.add("active");
  document.getElementById(`form-${target}`).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("form-signin");
  const signUpForm = document.getElementById("form-signup");
  const API_URL = "http://localhost:8000"; // Backend FastAPI address

  // ---- Sign In ----
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signin-email").value.trim();
      const password = document.getElementById("signin-password").value;

      // Master Admin Account Control Criteria
      if (email === "admin@virelli.com" && password === "admin123") {
        const adminSession = { name: "System Administrator", email: email, role: "admin" };
        localStorage.setItem("VIRELLI_SESSION", JSON.stringify(adminSession));
        alert("Access Granted: Admin Dashboard online.");
        window.location.href = "admin.html";
        return;
      }

      const registeredUsers = JSON.parse(localStorage.getItem("VIRELLI_USER_DB")) || [];
      const matchedUser = registeredUsers.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        const userSession = { name: matchedUser.name, email: matchedUser.email, role: "user", address: "Avenida da Liberdade, Lisbon" };
        localStorage.setItem("VIRELLI_SESSION", JSON.stringify(userSession));
        alert(`Welcome back, ${matchedUser.name}!`);
        window.location.href = "user.html";
      } else {
        alert("Invalid credentials. Use admin@virelli.com / admin123, or create a customer account.");
      }
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;

      let registeredUsers = JSON.parse(localStorage.getItem("VIRELLI_USER_DB")) || [];
      
      if (registeredUsers.some(user => user.email === email) || email === "admin@virelli.com") {
        alert("An account with this email address already exists.");
        return;
      }

      registeredUsers.push({ name, email, password });
      localStorage.setItem("VIRELLI_USER_DB", JSON.stringify(registeredUsers));
      alert("Account created successfully!");
      switchAuthTab("signin");
    });
  }
});

function executeLogout() {
  localStorage.removeItem('VIRELLI_SESSION');
  window.location.href = 'index.html';
}
