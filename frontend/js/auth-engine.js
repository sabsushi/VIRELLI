const API_URL = "http://localhost:8000/auth";


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

  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signin-email").value.trim();
      const password = document.getElementById("signin-password").value;

      // Master Admin Account Control Criteria
      if (email === "admin@virelli.com" && password === "admin123") {
        const adminSession = { name: "System Administrator", email: email, role: "admin", token: "admin" };
        localStorage.setItem("VIRELLI_SESSION", JSON.stringify(adminSession));
        alert("Access Granted: Admin Dashboard online.");
        window.location.href = "admin.html";
        return;
      }

      // --- REAL LOGIN CONNECTED TO PYTHON BACKEND ---
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, password: password })
        });

        if (response.ok) {
          const data = await response.json();
          // The access_token now contains just the user ID string (e.g., "1")
          const userId = data.access_token; 

          // Quick fetch to get user details using the new ID parameter
          const userResponse = await fetch(`${API_URL}/users/me?user_id=${userId}`);
          const userData = await userResponse.json();

          const userSession = { 
            id: userId,
            name: userData.username, 
            email: userData.email, 
            role: "user" 
          };
          
          localStorage.setItem("VIRELLI_SESSION", JSON.stringify(userSession));
          alert(`Welcome back, ${userData.username}!`);
          window.location.href = "user.html";

        } else {
          const errorData = await response.json();
          alert(`Login failed: ${errorData.detail || "Invalid credentials."}`);
        }
      } catch (error) {
        console.error("Connection error:", error);
        alert("Could not connect to the backend server. Please make sure Python is running!");
      }
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;

      // --- REAL REGISTER CONNECTED TO PYTHON BACKEND ---
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: name, // Python backend expects 'username'
            email: email,
            password: password
          })
        });

        if (response.status === 201) { // 201 Created Status
          alert("Account created successfully on the local server!");
          switchAuthTab("signin");
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.detail || "Please check your inputs."}`);
        }
      } catch (error) {
        console.error("Connection error:", error);
        alert("Could not connect to the backend server. Make sure Uvicorn is active!");
      }
    });
  }
});

function executeLogout() {
  localStorage.removeItem("VIRELLI_SESSION");
  alert("Signed out successfully.");
  window.location.href = "index.html";
}