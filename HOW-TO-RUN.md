# Goel Cake House — Setup Guide

## Folder Structure
```
GCH-FINAL/
├── backend/          ← Node.js server
├── frontend/         ← Website files
├── START-BACKEND.bat ← Double-click to start server (Windows)
├── SETUP-FIRST-TIME.bat ← Run once to seed database
└── HOW-TO-RUN.md
```

---

## Requirements
- **Node.js** — Download from https://nodejs.org (install LTS version)
- **MongoDB** — Either:
  - Local: Download from https://mongodb.com/try/download/community
  - Cloud (easier): Free at https://cloud.mongodb.com (MongoDB Atlas)

---

## How to Run (Step by Step)

### Step 1 — Install Node.js
Download and install from https://nodejs.org

### Step 2 — Set up MongoDB
**Option A — MongoDB Atlas (Cloud, Recommended):**
1. Go to https://cloud.mongodb.com
2. Create free account → Create free cluster
3. Click "Connect" → "Drivers" → Copy the connection string
4. Open `backend/.env` in Notepad
5. Replace `MONGODB_URI=mongodb://localhost:27017/goel-cake-house`
   with your Atlas connection string

**Option B — Local MongoDB:**
1. Install MongoDB Community from https://mongodb.com
2. It runs automatically in background — no changes needed

### Step 3 — First Time Setup
Double-click **SETUP-FIRST-TIME.bat**
This installs packages and adds sample products to database.

### Step 4 — Start the Server
Double-click **START-BACKEND.bat**
Keep this window open while using the website.

### Step 5 — Open the Website
Open `frontend/index.html` in your browser (Chrome recommended).

---

## Admin Panel
- URL: `frontend/pages/admin.html`
- Email: `admin@goelcakehouse.com`
- Password: `Admin@12345`

From the admin panel you can:
- Add real product photos (solves the image problem permanently!)
- Add/edit/delete products
- View and manage orders

---

## Image Fix — Easiest Method
Once the backend is running:
1. Login as admin
2. Go to Admin Panel → Products
3. Edit each product and upload a real photo
4. The website will show your actual photos instantly

---

## Fixing the "Invalid JSON" Error
This error means the backend server is NOT running.
Always start **START-BACKEND.bat** before using the website.
