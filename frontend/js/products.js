// ============================================================
// PRODUCTS PAGE — Filter, search, pagination (static fallback)
// ============================================================
let currentPage = 1, currentFilters = {};

async function loadProducts() {
  const grid = document.getElementById('productsGrid');
  UI.setLoading(grid, 8);

  let data, pagination;
  try {
    const params = new URLSearchParams({ page: currentPage, limit: 12, ...currentFilters });
    const res = await API.get(`/products?${params}`);
    if (res.data && res.data.length > 0) {
      data = res.data;
      pagination = res.pagination;
    } else { throw new Error('empty'); }
  } catch (_) {
    // Backend unavailable — use static data
    const res = filterStaticProducts({ ...currentFilters, limit: 12, page: currentPage });
    data = res.data;
    pagination = res.pagination;
  }

  UI.renderProducts(data, grid);
  renderPagination(pagination);
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = `${pagination.total} product${pagination.total !== 1 ? 's' : ''} found`;
}

function renderPagination({ page, pages }) {
  const el = document.getElementById('pagination');
  if (!el || pages <= 1) { if (el) el.innerHTML = ''; return; }
  let html = '';
  if (page > 1) html += `<button onclick="goPage(${page - 1})" class="page-btn">← Prev</button>`;
  for (let i = 1; i <= pages; i++) html += `<button onclick="goPage(${i})" class="page-btn ${i === page ? 'active' : ''}">${i}</button>`;
  if (page < pages) html += `<button onclick="goPage(${page + 1})" class="page-btn">Next →</button>`;
  el.innerHTML = html;
}

function goPage(p) { currentPage = p; loadProducts(); window.scrollTo({ top: 200, behavior: 'smooth' }); }

function applyFilters() {
  currentFilters = {};
  const category = document.getElementById('filterCategory')?.value;
  const minPrice = document.getElementById('filterMinPrice')?.value;
  const maxPrice = document.getElementById('filterMaxPrice')?.value;
  const sort = document.getElementById('filterSort')?.value;
  const search = document.getElementById('searchInput')?.value?.trim();
  if (category && category !== 'all') currentFilters.category = category;
  if (minPrice) currentFilters.minPrice = minPrice;
  if (maxPrice) currentFilters.maxPrice = maxPrice;
  if (sort) currentFilters.sort = sort;
  if (search) currentFilters.search = search;
  currentPage = 1;
  loadProducts();
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('category');
  if (cat) {
    const el = document.getElementById('filterCategory');
    if (el) el.value = cat;
    currentFilters.category = cat;
  }
  loadProducts();

  let searchTimer;
  document.getElementById('searchInput')?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 400);
  });
  document.getElementById('filterCategory')?.addEventListener('change', applyFilters);
  document.getElementById('filterSort')?.addEventListener('change', applyFilters);
  document.getElementById('applyPriceFilter')?.addEventListener('click', applyFilters);
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterSort').value = '';
    document.getElementById('filterMinPrice').value = '';
    document.getElementById('filterMaxPrice').value = '';
    document.getElementById('searchInput').value = '';
    currentFilters = {};
    currentPage = 1;
    loadProducts();
  });
});
