// ============================================================
// CART — localStorage-based cart management
// ============================================================
const Cart = {
  key: 'gch_cart',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }));
  },

  add(product, quantity = 1) {
    const items = this.getAll();
    const idx = items.findIndex(i => i.productId === product._id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        originalPrice: product.price,
        image: product.images?.[0]?.url || '',
        category: product.category,
        quantity
      });
    }
    this.save(items);
    UI.toast(`🛒 ${product.name} added to cart!`, 'success');
  },

  remove(productId) {
    this.save(this.getAll().filter(i => i.productId !== productId));
  },

  updateQty(productId, quantity) {
    if (quantity < 1) return this.remove(productId);
    const items = this.getAll();
    const idx = items.findIndex(i => i.productId === productId);
    if (idx > -1) { items[idx].quantity = quantity; this.save(items); }
  },

  clear() { this.save([]); },

  getTotal() {
    return this.getAll().reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },

  getCount() {
    return this.getAll().reduce((sum, i) => sum + i.quantity, 0);
  },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('#cartBadge, .cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }
};

// Init badge on load
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
