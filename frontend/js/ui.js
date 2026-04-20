// ============================================================
// UI — Shared helpers: toast, product cards, product HTML
// ============================================================
const UI = {
  toast(msg, type = 'info', duration = 3000) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast ${type} show`;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.classList.remove('show'); }, duration);
  },

  formatPrice(amount) {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  _getImg(product) {
    // Always use the image stored directly in the product data.
    // Each product in staticProducts.js has its own confirmed photo URL.
    const stored = product.images?.[0]?.url;
    if (stored) return stored;
    // Generic fallback by category only if no image at all
    const fallbacks = {
      cakes:    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
      pastries: 'https://images.unsplash.com/photo-1612197527762-8cfb694b5a46?w=600&q=80',
      cookies:  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
      biscuits: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    };
    return fallbacks[(product.category||'').toLowerCase()] || fallbacks.cakes;
  },

  productCard(product) {
    const price = product.discountPrice || product.price;
    const hasDiscount = product.discountPrice && product.discountPrice < product.price;
    const discount = hasDiscount ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;
    const img = this._getImg(product);
    // Detail page link — handle both root-relative and relative paths
    const detailHref = window.location.pathname.includes('/pages/')
      ? `product-detail.html?id=${product._id}`
      : `pages/product-detail.html?id=${product._id}`;

    return `
      <div class="product-card" data-id="${product._id}">
        <div class="product-img-wrap">
          <img src="${img}" alt="${product.name}" loading="lazy"
            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80'"/>
          <div class="product-badge">
            ${hasDiscount ? `<span class="badge badge-sale">${discount}% OFF</span>` : ''}
            ${product.isEggless ? `<span class="badge badge-eggless">🌿 Eggless</span>` : ''}
          </div>
        </div>
        <div class="product-body">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <span class="stars">${'★'.repeat(Math.round(product.rating?.average || 4))}</span>
            <span>${product.rating?.average?.toFixed(1) || '4.5'}</span>
            <span>(${product.rating?.count || 0})</span>
          </div>
          <div class="product-price">
            <span class="price-current">${this.formatPrice(price)}</span>
            ${hasDiscount ? `<span class="price-original">${this.formatPrice(product.price)}</span><span class="price-save">Save ${discount}%</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="btn-add-cart" onclick="UI.addToCart(this, '${product._id}')">Add to Cart</button>
            <a href="${detailHref}" class="btn-view" title="View details">👁</a>
          </div>
        </div>
      </div>`;
  },

  addToCart(btn, productId) {
    btn.disabled = true;
    btn.textContent = 'Adding...';

    // If this is a static product (no backend), add directly
    if (productId.startsWith('static_')) {
      const product = findStaticProduct(productId);
      if (product) {
        Cart.add(product);
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
          btn.classList.remove('added');
          btn.disabled = false;
        }, 2000);
      } else {
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
      }
      return;
    }
    API.get(`/products/${productId}`)
      .then(({ data }) => {
        Cart.add(data);
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
          btn.classList.remove('added');
          btn.disabled = false;
        }, 2000);
      })
      .catch(() => {
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
        UI.toast('Failed to add item. Try again.', 'error');
      });
  },

  renderProducts(products, container) {
    if (!container) return;
    if (!products || products.length === 0) {
      container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🍰</div><h3>No products found</h3><p>Try changing your filters or search term.</p></div>`;
      return;
    }
    container.innerHTML = products.map(p => this.productCard(p)).join('');
  },

  setLoading(container, count = 4) {
    if (!container) return;
    container.innerHTML = Array(count).fill('<div class="skeleton-card"></div>').join('');
  }
};

// Add nav user dropdown styles dynamically
const navDropStyles = document.createElement('style');
navDropStyles.textContent = `
.nav-user-menu{position:relative}
.nav-user-btn{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:8px;color:var(--text-muted);font-weight:500;font-size:.9rem;transition:.2s}
.nav-user-btn:hover{background:rgba(201,125,90,.08);color:var(--rose)}
.user-avatar{width:28px;height:28px;border-radius:50%;background:var(--rose);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;flex-shrink:0}
.user-dropdown{display:none;position:absolute;top:calc(100%+8px);right:0;background:#fff;border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow-md);min-width:160px;overflow:hidden}
.user-dropdown.open{display:block}
.user-dropdown a,.user-dropdown button{display:block;width:100%;text-align:left;padding:12px 18px;font-size:.88rem;color:var(--text);transition:.15s;background:none;border:none;cursor:pointer;font-family:inherit}
.user-dropdown a:hover,.user-dropdown button:hover{background:var(--cream);color:var(--rose)}
`;
document.head.appendChild(navDropStyles);
