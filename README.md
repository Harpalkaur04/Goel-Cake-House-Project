# 🎂 Goel Cake House — Full-Stack Bakery Website

**100% Eggless Homemade Bakery | Jalandhar Cantt**

---

## 📁 Project Structure

```
goel-cake-house/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # JWT auth (register/login)
│   │   ├── productController.js   # Product CRUD
│   │   ├── orderController.js     # Order management
│   │   ├── customCakeController.js# Custom cake requests
│   │   └── adminController.js     # Admin dashboard
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect + admin guard
│   │   ├── errorMiddleware.js     # Global error handler
│   │   └── uploadMiddleware.js    # Multer image upload
│   ├── models/
│   │   ├── User.js                # User schema + bcrypt
│   │   ├── Product.js             # Product schema
│   │   ├── Order.js               # Order schema
│   │   └── CustomCake.js          # Custom cake request schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── customCakeRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── seed.js                # Database seeder (15 products)
│   ├── uploads/                   # Product & custom cake images
│   ├── server.js                  # Express + Socket.io entry point
│   ├── .env                       # Environment variables
│   └── package.json
├── frontend/
│   ├── css/
│   │   └── style.css              # Complete design system
│   ├── js/
│   │   ├── config.js              # API base URL + constants
│   │   ├── api.js                 # Centralised fetch wrapper
│   │   ├── cart.js                # localStorage cart management
│   │   ├── auth.js                # JWT auth state
│   │   ├── ui.js                  # Toast, product cards, helpers
│   │   ├── home.js                # Home page logic
│   │   └── products.js            # Filter/search/pagination
│   ├── pages/
│   │   ├── products.html          # Product listing + filters
│   │   ├── product-detail.html    # Single product view
│   │   ├── cart.html              # Cart + order summary
│   │   ├── login.html             # Login + Register
│   │   ├── custom-cake.html       # Custom cake request form
│   │   ├── orders.html            # My orders + tracking
│   │   └── admin.html             # Admin panel
│   └── index.html                 # Home page
├── render.yaml                    # Render.com deploy config
├── package.json                   # Root scripts
└── README.md
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone & Install

```bash
cd goel-cake-house/backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Seed Database

```bash
npm run seed
# Creates admin user + 14 sample products
```

**Admin credentials:**
- Email: `admin@goelcakehouse.com`
- Password: `Admin@12345`

### 4. Start Server

```bash
npm run dev     # Development (with nodemon)
npm start       # Production
```

### 5. Open Frontend

Open `frontend/index.html` in your browser, or serve it with any static server:

```bash
npx serve frontend -p 3000
```

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get profile (auth) |
| PUT | `/api/auth/me` | Update profile (auth) |
| PUT | `/api/auth/change-password` | Change password (auth) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (filter, search, paginate) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/categories` | Category counts |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

**Query params:** `?category=cakes&minPrice=100&maxPrice=700&search=chocolate&sort=price_asc&page=1&limit=12&featured=true`

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order (auth) |
| GET | `/api/orders/my-orders` | My orders (auth) |
| GET | `/api/orders/:id` | Single order (auth) |
| PUT | `/api/orders/:id/cancel` | Cancel order (auth) |
| GET | `/api/orders` | All orders (admin) |
| PUT | `/api/orders/:id/status` | Update status (admin) |

### Custom Cakes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/custom-cakes` | Submit request |
| GET | `/api/custom-cakes/my-requests` | My requests (auth) |
| GET | `/api/custom-cakes` | All requests (admin) |
| PUT | `/api/custom-cakes/:id` | Update status (admin) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats (admin) |
| GET | `/api/admin/users` | All users (admin) |
| PUT | `/api/admin/users/:id/toggle` | Toggle user active (admin) |

---

## 📡 Real-Time (Socket.io)

```javascript
// Client connects and joins an order room
socket.emit('joinOrder', orderId);

// Receive status updates
socket.on('orderStatusUpdate', ({ status, message, order }) => { ... });

// Admin receives new order notifications
socket.on('newOrder', ({ orderId, orderNumber, total, customerName }) => { ... });

// Admin receives order update events
socket.on('orderUpdated', ({ orderId, status }) => { ... });
```

---

## 🛡️ Security Features

- ✅ JWT authentication with expiry
- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ Rate limiting (100 requests/15 min)
- ✅ Helmet.js security headers
- ✅ CORS with whitelisted origin
- ✅ Multer file type & size validation
- ✅ Mongoose input validation
- ✅ Admin-only route guards
- ✅ Environment variables for secrets

---

## ☁️ Deployment

### Option A: Render (Backend) + Vercel (Frontend)

**Backend on Render:**
1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Add environment variables in Render dashboard:
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = strong random string
   - `FRONTEND_URL` = your Vercel frontend URL
   - `NODE_ENV` = production

**Frontend on Vercel:**
1. Upload the `frontend/` folder to Vercel
2. Update `frontend/js/config.js` to point to your Render API URL

**MongoDB Atlas (Free):**
1. Create cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Add connection string to Render env vars

### Option B: Single Server (e.g. VPS / Railway)

Set `NODE_ENV=production` and the backend will serve the frontend as static files.

---

## 💡 Frontend Features

| Feature | Implementation |
|---------|---------------|
| Responsive design | CSS Grid + Flexbox, mobile-first |
| Product filtering | Category, price range, text search |
| Search | 400ms debounced API search |
| Cart | localStorage, persists across sessions |
| Real-time badge | Cart count updates dynamically |
| Auth state | JWT in localStorage, nav updates |
| WhatsApp integration | Pre-filled order messages |
| Admin panel | Full CRUD for products, orders, users |
| Order tracking | Visual step-by-step progress bar |
| Custom cake form | Multi-step form with image upload |
| Toast notifications | Non-blocking feedback messages |
| Skeleton loaders | UX during API calls |

---

## 🎨 Design System

- **Colors:** Warm cream `#fdf6ee`, Rose gold `#c97d5a`, Dark chocolate `#2d1a10`
- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Aesthetic:** Luxury patisserie — warm, elegant, trustworthy
- **Components:** Cards, badges, modals, forms, toasts, nav, footer

---

## 📞 Business Details

- **Name:** Goel Cake House
- **Location:** 11/57, Anaj Mandi, Jalandhar Cantt – 144005
- **Phone:** 9592285145
- **WhatsApp:** https://wa.me/919592285145
- **Specialty:** 100% Eggless Homemade Products
- **Services:** Pickup & Nearby Delivery
- **Payment:** Cash on Delivery + Online

---

*Built with ❤️ for Goel Cake House, Jalandhar*
