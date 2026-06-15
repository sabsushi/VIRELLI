function switchAuthTab(target) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
  
  document.getElementById(`tab-${target}`).classList.add("active");
  document.getElementById(`form-${target}`).classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("form-signin");
  const signUpForm = document.getElementById("form-signup");
  const API_URL = "http://localhost:8000"; 

  // ---- Sign In ----
  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => { 
      e.preventDefault();
      const email = document.getElementById("signin-email").value.trim();
      const password = document.getElementById("signin-password").value;

      if (email === "admin@virelli.com" && password === "admin123") {
        const adminSession = { name: "System Administrator", email: email, role: "admin" };
        localStorage.setItem("VIRELLI_SESSION", JSON.stringify(adminSession));
        alert("Access Granted: Admin Dashboard online.");
        window.location.href = "admin.html";
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            email: email, 
            password: password 
          })
        });

        const data = await response.json();

        if (response.ok) {
          const userSession = { 
            email: email, 
            role: "user", 
            token: data.access_token, 
          };
          
          localStorage.setItem("VIRELLI_SESSION", JSON.stringify(userSession));
          alert("Welcome back!");
          window.location.href = "user.html";
        } else {
          alert(data.detail || "Invalid credentials. Verify your email and password.");
        }

      } catch (error) {
        console.error("Error connecting to backend during login:", error);
        alert("The backend server is offline. Unable to log in.");
      }
    });
  }
  if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => { 
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username: name, 
          email: email, 
          password: password 
        })
      });

      const data = await response.json();

      if (response.ok) {
        let registeredUsers = JSON.parse(localStorage.getItem("VIRELLI_USER_DB")) || [];

        registeredUsers.push({ name, email, password });
        localStorage.setItem("VIRELLI_USER_DB", JSON.stringify(registeredUsers));

        alert("Account created successfully in the database and saved locally!");
        switchAuthTab("signin");
      } else {
        alert(data.detail || "Error creating account on the server.");
      }

    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Backend server is offline. Account could not be saved to database.");
    }
  });
}
});

function executeLogout() {
  localStorage.removeItem('VIRELLI_SESSION');
  window.location.href = 'index.html';
}



