// ============================================================
// AUTH — JWT auth state management
// ============================================================
const Auth = {
  TOKEN_KEY: 'gch_token',
  USER_KEY: 'gch_user',

  isPagesPath() {
    return window.location.pathname.includes('/pages/');
  },

  pageUrl(page) {
    return this.isPagesPath() ? page : `pages/${page}`;
  },

  homeUrl() {
    return this.isPagesPath() ? '../index.html' : 'index.html';
  },

  getToken() { return localStorage.getItem(this.TOKEN_KEY); },
  getUser() {
    try { return JSON.parse(localStorage.getItem(this.USER_KEY)); }
    catch { return null; }
  },
  isLoggedIn() { return !!this.getToken(); },
  isAdmin() { return this.getUser()?.role === 'admin'; },

  save(token, user) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.updateNavUI();
  },

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.updateNavUI();
    window.location.href = this.homeUrl();
  },

  updateNavUI() {
    const authEl = document.getElementById('authNavItem');
    if (!authEl) return;
    const user = this.getUser();
    if (user) {
      authEl.innerHTML = `
        <div class="nav-user-menu">
          <button class="nav-link nav-user-btn" onclick="Auth.toggleUserMenu()">
            <span class="user-avatar">${user.name[0].toUpperCase()}</span>
            ${user.name.split(' ')[0]}
          </button>
          <div class="user-dropdown" id="userDropdown">
            ${user.role === 'admin' ? `<a href="${this.pageUrl('admin.html')}">Admin Panel</a>` : ''}
            <a href="${this.pageUrl('orders.html')}">My Orders</a>
            <button onclick="Auth.logout()">Logout</button>
          </div>
        </div>`;
    } else {
      authEl.innerHTML = `<a href="${this.pageUrl('login.html')}" class="nav-link nav-cta">Login</a>`;
    }
  },

  toggleUserMenu() {
    document.getElementById('userDropdown')?.classList.toggle('open');
  },

  requireAuth(redirectTo) {
    if (!this.isLoggedIn()) {
      const url = redirectTo || window.location.href;
      window.location.href = `${this.pageUrl('login.html')}?redirect=${encodeURIComponent(url)}`;
      return false;
    }
    return true;
  }
};

// Apply nav UI on every page load
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavUI();
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Mobile nav toggle
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  });
});
