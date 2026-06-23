document.addEventListener('DOMContentLoaded', () => {
  const session = JSON.parse(localStorage.getItem('VIRELLI_SESSION'));
  const API_URL = 'http://localhost:8000';

  if (!session) {
    window.location.href = 'auth.html';
    return;
  }

  // --- Render profile display ---
  function renderProfile() {
    const displayBox = document.getElementById('profile-display');
    if (!displayBox) return;
    displayBox.innerHTML = `
      <p><strong>Account Privilege:</strong> ${session.role ? session.role.toUpperCase() : 'USER'}</p>
      <p><strong>Full Name:</strong> ${session.username || 'Not configured'}</p>
      <p><strong>Email Address:</strong> ${session.email || '—'}</p>
      <p><strong>Default Address:</strong> ${session.address || 'Not configured'}</p>
      <button class="btn" onclick="executeLogout()" style="margin-top:1.5rem;padding:0.5rem 1.5rem;font-size:0.75rem;background:#8c8c8c;border-color:#8c8c8c;color:white;">Sign Out</button>
    `;
  }

  renderProfile();

  // Prefill update form with current session values
  const emailInput   = document.getElementById('profile-email');
  const addressInput = document.getElementById('profile-address');
  if (emailInput)   emailInput.value   = session.email   || '';
  if (addressInput) addressInput.value = session.address || '';

  // --- Update profile details ---
  const profileForm = document.getElementById('profile-info-form');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newEmail   = emailInput   ? emailInput.value.trim()   : session.email;
      const newAddress = addressInput ? addressInput.value.trim() : session.address;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!newEmail || !emailRegex.test(newEmail)) {
        showUserMsg('profile-msg', 'Please enter a valid email address.', 'error');
        return;
      }
      if (!newAddress) {
        showUserMsg('profile-msg', 'Please enter your shipping address.', 'error');
        return;
      }

      if (!session.token) {
        showUserMsg('profile-msg', 'Session error — please sign in again.', 'error');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
          },
          body: JSON.stringify({ 
            email: newEmail,
            address: newAddress 
          })
        });

        if (response.ok) {
          // Só atualiza o localStorage se o backend aceitar a mudança com sucesso
          session.email   = newEmail;
          session.address = newAddress;
          localStorage.setItem('VIRELLI_SESSION', JSON.stringify(session));
          
          renderProfile();
          showUserMsg('profile-msg', 'Details saved successfully.', 'success');
        } else {
          const data = await response.json();
          showUserMsg('profile-msg', data.detail || 'Could not update profile. Please try again.', 'error');
        }
      } catch (err) {
        showUserMsg('profile-msg', 'Cannot reach the server. Make sure the backend is running.', 'error');
      }
    });
  }

  // --- Change password ---
  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const currentPass = document.getElementById('current-pass').value;
      const newPass     = document.getElementById('new-pass').value;

      if (!currentPass || !newPass) {
        showUserMsg('password-msg', 'Please fill in both password fields.', 'error');
        return;
      }

      if (newPass.length < 6) {
        showUserMsg('password-msg', 'New password must be at least 6 characters.', 'error');
        return;
      }

      if (!session.token) {
        showUserMsg('password-msg', 'Session error — please sign in again.', 'error');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
          },
          body: JSON.stringify({ password: newPass })
        });

        if (response.ok) {
          passwordForm.reset();
          showUserMsg('password-msg', 'Password updated successfully.', 'success');
        } else {
          const data = await response.json();
          showUserMsg('password-msg', data.detail || 'Could not update password. Please try again.', 'error');
        }
      } catch (err) {
        showUserMsg('password-msg', 'Cannot reach the server. Make sure the backend is running.', 'error');
      }
    });
  }

  // --- Helper: show an inline message below a form ---
  function showUserMsg(msgId, text, type) {
    let el = document.getElementById(msgId);
    if (!el) {
      // Create the element if it doesn't exist yet
      el = document.createElement('p');
      el.id = msgId;
      el.style.cssText = 'font-size:0.8rem;margin-top:0.75rem;padding:0.6rem 0.85rem;';

      // Insert after the relevant form
      if (msgId === 'profile-msg') {
        const form = document.getElementById('profile-info-form');
        if (form) form.after(el);
      } else {
        const form = document.getElementById('password-form');
        if (form) form.after(el);
      }
    }

    el.textContent = text;
    if (type === 'error') {
      el.style.background = '#fff5f5';
      el.style.border = '1px solid #f5c6cb';
      el.style.color = '#c0392b';
    } else {
      el.style.background = '#f0fff4';
      el.style.border = '1px solid #b2dfdb';
      el.style.color = '#27ae60';
    }
    el.style.display = 'block';

    // Auto-hide after 4 seconds
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.style.display = 'none'; }, 4000);
  }
});

function executeLogout() {
  if (typeof window.clearShoppingState === 'function') window.clearShoppingState();
  localStorage.removeItem('VIRELLI_SESSION');
  window.location.href = 'index.html';
}
