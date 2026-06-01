document.addEventListener("DOMContentLoaded", () => {
  let userData = JSON.parse(localStorage.getItem("VIRELLI_USER")) || {
    name: "Sabrina El-Aouar",
    email: "sabrina@virellistudio.com",
    address: "Avenida da Liberdade 142, Lisbon, Portugal"
  };

  const displayBox = document.getElementById("profile-display");
  const infoForm = document.getElementById("profile-info-form");
  const passwordForm = document.getElementById("password-form");

  function renderProfile() {
    if (displayBox) {
      displayBox.innerHTML = `
        <p><strong>Full Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
      `;
    }
  }

  if (infoForm) {
    document.getElementById("profile-email").value = userData.email;
    document.getElementById("profile-address").value = userData.address;
    infoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      userData.email = document.getElementById("profile-email").value;
      userData.address = document.getElementById("profile-address").value;
      localStorage.setItem("VIRELLI_USER", JSON.stringify(userData));
      renderProfile();
      alert("Account information updated successfully inside LocalStorage.");
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Security credentials updated successfully.");
      passwordForm.reset();
    });
  }

  renderProfile();
});