// --- Bug #9: no plaintext admin password in source ------------------------
// Self-contained SHA-256 (works under file:// too, where crypto.subtle is
// unavailable). The admin password is never stored in this file; only the
// digest below is. Demo login: admin@virelli.com / admin123
// NOTE: this is still a client-side demo gate, not real auth. Proper fix
// needs an is_admin column + server-side check (backend, out of scope here).
// To change the password, replace ADMIN_PASSWORD_HASH with sha256(newPassword).
function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var result = '';
  var words = [];
  var asciiBitLength = ascii.length * 8;
  var hash = sha256.h = sha256.h || [];
  var k = sha256.k = sha256.k || [];
  var primeCounter = k.length;
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (var i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while (ascii.length % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii.length; i++) {
    var j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (j = 0; j < words.length;) {
    var w = words.slice(j, j += 16);
    var oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var w15 = w[i - 15], w2 = w[i - 2];
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

const ADMIN_EMAIL = "admin@virelli.com";
const ADMIN_PASSWORD_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

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

      if (email === ADMIN_EMAIL && sha256(password) === ADMIN_PASSWORD_HASH) {
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
  if (typeof window.clearShoppingState === 'function') window.clearShoppingState();
  localStorage.removeItem('VIRELLI_SESSION');
  window.location.href = 'index.html';
}



