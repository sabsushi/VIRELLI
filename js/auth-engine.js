
function switchAuthTab(target) {
  document.querySelectorAll('.auth-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.auth-form').forEach(function(f) {
    f.classList.remove('active');
    f.style.display = 'none';
  });
  var tab = document.getElementById('tab-' + target);
  if (tab) tab.classList.add('active');
  var form = document.getElementById('form-' + target);
  if (form) { form.classList.add('active'); form.style.display = 'flex'; }
  var err = document.getElementById('auth-error');
  if (err) err.style.display = 'none';
  var succ = document.getElementById('auth-success');
  if (succ) succ.style.display = 'none';
}

function showAuthError(message) {
  var err = document.getElementById('auth-error');
  if (err) { err.textContent = message; err.style.display = 'block'; }
}

function showAuthSuccess(message) {
  var succ = document.getElementById('auth-success');
  if (succ) { succ.textContent = message; succ.style.display = 'block'; }
}

document.addEventListener('DOMContentLoaded', function() {
  var signInForm = document.getElementById('form-signin');
  var signUpForm = document.getElementById('form-signup');

  // ---- Sign In ----
  if (signInForm) {
    signInForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email    = document.getElementById('signin-email').value.trim();
      var password = document.getElementById('signin-password').value;
      var err = document.getElementById('auth-error');
      if (err) err.style.display = 'none';

      if (email === 'admin@virelli.com' && password === 'admin123') {
        localStorage.setItem('VIRELLI_SESSION', JSON.stringify({ name: 'System Administrator', email: email, role: 'admin' }));
        window.location.href = 'admin.html';
        return;
      }

      var users = JSON.parse(localStorage.getItem('VIRELLI_USER_DB')) || [];
      var user = users.find(function(u) { return u.email === email && u.password === password; });
      if (user) {
        localStorage.setItem('VIRELLI_SESSION', JSON.stringify({ name: user.name, email: user.email, role: 'user' }));
        window.location.href = 'user.html';
      } else {
        showAuthError('Incorrect email or password. Please try again.');
      }
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name     = document.getElementById('signup-name').value.trim();
      var email    = document.getElementById('signup-email').value.trim();
      var password = document.getElementById('signup-password').value;
      var confirm  = document.getElementById('signup-password-confirm').value;
      var err = document.getElementById('auth-error');
      if (err) err.style.display = 'none';

      if (password.length < 6) {
        showAuthError('Password must be at least 6 characters.');
        return;
      }

      if (password !== confirm) {
        showAuthError('Passwords do not match. Please try again.');
        return;
      }

      var users = JSON.parse(localStorage.getItem('VIRELLI_USER_DB')) || [];
      if (users.some(function(u) { return u.email === email; }) || email === 'admin@virelli.com') {
        showAuthError('An account with this email already exists.');
        return;
      }

      users.push({ name: name, email: email, password: password });
      localStorage.setItem('VIRELLI_USER_DB', JSON.stringify(users));
      showAuthSuccess('Account created! Please sign in.');
      setTimeout(function() { switchAuthTab('signin'); }, 1200);
    });
  }
});

function executeLogout() {
  localStorage.removeItem('VIRELLI_SESSION');
  window.location.href = 'index.html';
}
