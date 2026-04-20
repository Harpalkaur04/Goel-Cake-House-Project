// ============================================================
// API — Centralised fetch wrapper
// ============================================================
const API = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('gch_token');
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${CONFIG.API_BASE}${endpoint}`, { ...options, headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      return data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  },
  get: (url, opts) => API.request(url, { method: 'GET', ...opts }),
  post: (url, body, opts) => API.request(url, { method: 'POST', body: JSON.stringify(body), ...opts }),
  put: (url, body, opts) => API.request(url, { method: 'PUT', body: JSON.stringify(body), ...opts }),
  delete: (url, opts) => API.request(url, { method: 'DELETE', ...opts }),

  // Multipart (file upload)
  async upload(endpoint, formData, method = 'POST') {
    const token = localStorage.getItem('gch_token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${CONFIG.API_BASE}${endpoint}`, { method, headers, body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
  }
};
