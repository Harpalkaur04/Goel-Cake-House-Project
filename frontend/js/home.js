// ============================================================
// HOME PAGE — Load featured products (with static fallback)
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;

  try {
    const { data } = await API.get('/products?featured=true&limit=8');
    if (data && data.length > 0) {
      UI.renderProducts(data, grid);
      return;
    }
  } catch (_) { /* backend not running — use static data */ }

  const { data } = filterStaticProducts({ featured: true, limit: 8 });
  UI.renderProducts(data, grid);
});
