// ============================================================
// CONFIG — API base URL and constants
// ============================================================
const CONFIG = {
  API_BASE: ['localhost', '127.0.0.1', ''].includes(window.location.hostname)
    ? 'http://localhost:5000/api'
    : '/api',
  WA_NUMBER: '919592285145',
  STORE_NAME: 'Goel Cake House',
  STORE_PHONE: '9592285145',
  STORE_ADDRESS: '11/57, Anaj Mandi, Jalandhar Cantt – 144005',
  DELIVERY_CHARGE: 50,
  FREE_DELIVERY_ABOVE: 500
};
