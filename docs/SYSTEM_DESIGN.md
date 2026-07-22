# SYSTEM DESIGN — Portfolio Website

---

## 1. Architecture Overview

### Architecture Pattern

Menggunakan **Client-Server Architecture** dengan REST API:

```
┌─────────────────────────────────────────────────────────┐
│                       CLIENT                            │
│                   (React Frontend)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Visitor    │  │   Visitor   │  │    Admin    │     │
│  │   Pages      │  │   Pages     │  │  Dashboard  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     SERVER                              │
│                (Node.js + Express)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    Auth      │  │   API       │  │   File      │     │
│  │  Middleware   │  │  Routes     │  │  Upload     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE                              │
│                   (MongoDB)                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  Users   │  │  Hero   │  │  About  │  │ Contact │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **Public Pages:** React fetch data langsung dari API (GET)
2. **Admin Dashboard:** React kirim request dengan session cookie (POST/PUT/DELETE)
3. **File Upload:** Multipart form data ke Express, disimpan ke local storage

---

## 2. Application Structure

### Directory Structure

```
portofolio-website/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── uploads/                 # Static images (symlink atau copy)
│   ├── src/
│   │   ├── assets/                  # Static assets (images, icons)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Loading.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx
│   │   │       ├── About.jsx
│   │   │       └── Contact.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Public homepage
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── EditHero.jsx
│   │   │       ├── EditAbout.jsx
│   │   │       └── EditContact.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js               # Axios instance
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── heroController.js
│   │   ├── aboutController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js                  # Session auth check
│   │   └── upload.js                # Multer config
│   ├── models/
│   │   ├── User.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── heroRoutes.js
│   │   ├── aboutRoutes.js
│   │   ├── contactRoutes.js
│   │   └── uploadRoutes.js
│   ├── uploads/                     # Uploaded images
│   ├── seed.js                      # Seed admin user
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── .env
│
├── .gitignore
├── package.json                     # Root package (scripts)
└── README.md
```

---

## 3. Component Design

### Frontend Components

#### Public Components

| Component | Location | Responsibility |
|-----------|----------|----------------|
| **Navbar** | components/layout/Navbar.jsx | Navigasi sticky, smooth scroll ke section |
| **Hero** | components/sections/Hero.jsx | Banner utama, judul, tagline, CTA button |
| **About** | components/sections/About.jsx | Deskripsi about me, foto |
| **Contact** | components/sections/Contact.jsx | Info kontak (email, phone, address, social links) |
| **Footer** | components/layout/Footer.jsx | Copyright, social links |
| **Loading** | components/common/Loading.jsx | Loading spinner untuk async operation |

#### Admin Components

| Component | Location | Responsibility |
|-----------|----------|----------------|
| **Login** | pages/admin/Login.jsx | Form login username + password |
| **Dashboard** | pages/admin/Dashboard.jsx | Overview dan navigasi ke edit sections |
| **EditHero** | pages/admin/EditHero.jsx | Form edit hero content + upload foto |
| **EditAbout** | pages/admin/EditAbout.jsx | Form edit about content + upload foto |
| **EditContact** | pages/admin/EditContact.jsx | Form edit contact info + social links |

### Backend Components

#### Controllers

| Controller | Responsibility |
|------------|----------------|
| **authController.js** | Handle login, logout, check session |
| **heroController.js** | CRUD hero content (hanya admin) |
| **aboutController.js** | CRUD about content (hanya admin) |
| **contactController.js** | CRUD contact content (hanya admin) |

#### Middleware

| Middleware | Responsibility |
|-----------|----------------|
| **auth.js** | Cek apakah user sudah login (session exists) |
| **upload.js** | Konfigurasi Multer untuk file upload (size limit, file filter) |

---

## 4. Data Flow

### Flow 1: Visitor Melihat Homepage

```
Visitor ──GET /api/hero──► Server ──Query──► MongoDB
   │                                              │
   │◄──── Hero Data ──────────────────────────────┘
   │
   └──Render──► Hero Component
```

### Flow 2: Admin Login

```
Admin ──POST /api/auth/login──► Server ──Verify Password──► MongoDB
   │                                                       │
   │◄──── Set Session Cookie ◄────────────────────────────┘
   │
   └──Redirect──► Dashboard
```

### Flow 3: Admin Edit Hero

```
Admin ──PUT /api/hero──► Auth Middleware ──► Controller ──► MongoDB
   │                         │
   │                    Session Check
   │                    (401 if not logged in)
   │
   └──Success──► Frontend Refetch ──► Updated Hero
```

### Flow 4: Admin Upload Image

```
Admin ──POST /api/upload──► Multer ──► Validate ──► Save to /uploads
   │                                            │
   │◄──── Image URL ◄───────────────────────────┘
   │
   └──Use URL in content fields
```

---

## 5. Technology Decisions

### Frontend

| Technology | Choice | Reason |
|------------|--------|--------|
| **Framework** | React 18 | Component-based, large ecosystem |
| **Build Tool** | Vite | Fast HMR, modern setup |
| **Routing** | React Router v6 | Standard for React SPA |
| **HTTP Client** | Axios | Easy interceptors, promise-based |
| **Styling** | Tailwind CSS | Utility-first, fast development |

### Backend

| Technology | Choice | Reason |
|------------|--------|--------|
| **Runtime** | Node.js | JavaScript fullstack |
| **Framework** | Express.js | Minimal, flexible |
| **Database** | MongoDB + Mongoose | Flexible schema, JSON-like |
| **Session** | express-session | Simple session management |
| **Password Hash** | bcrypt | Industry standard |
| **File Upload** | Multer | Standard for Express |
| **CORS** | cors package | Handle cross-origin |

### Security

| Measure | Implementation |
|---------|----------------|
| **Password Hashing** | bcrypt with salt rounds = 10 |
| **Session Security** | httpOnly, secure (prod), sameSite |
| **Input Validation** | express-validator atau manual |
| **File Validation** | Multer fileFilter (jpg, png, webp only) |
| **Rate Limiting** | express-rate-limit (optional) |

---

## 6. API Design Overview

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hero` | Get hero content |
| GET | `/api/about` | Get about content |
| GET | `/api/contact` | Get contact content |

### Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login | No |
| POST | `/api/auth/logout` | Admin logout | Yes |
| GET | `/api/auth/check` | Check session | Yes |

### Admin Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/hero` | Update hero content |
| PUT | `/api/about` | Update about content |
| PUT | `/api/contact` | Update contact content |
| POST | `/api/upload/image` | Upload image file |

*Detail API Design ada di document terpisah (Phase 3).*

---

## 7. Deployment Architecture

### Development

```
Frontend (Vite)     → http://localhost:5173
Backend (Express)   → http://localhost:5000
MongoDB             → localhost:27017
```

### Production

```
┌─────────────────────────────────────┐
│         Single Server / PaaS        │
│                                     │
│  ┌───────────┐  ┌───────────────┐   │
│  │  Nginx /  │  │  Node.js      │   │
│  │  Static   │──│  Express      │   │
│  │  Files    │  │  (API Server) │   │
│  └───────────┘  └───────┬───────┘   │
│                         │           │
│                 ┌───────▼───────┐   │
│                 │  MongoDB Atlas │   │
│                 │  (Cloud DB)    │   │
│                 └───────────────┘   │
└─────────────────────────────────────┘
```

---

*Document created: 2026-07-22*
*Status: Waiting for Approval*
