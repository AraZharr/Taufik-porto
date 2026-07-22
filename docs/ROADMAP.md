# IMPLEMENTATION PLAN — Portfolio Website

---

## 1. Development Phases

### Overview

| Phase | Name | Duration | Status |
|-------|------|----------|--------|
| 1 | Project Setup | 15 min | Pending |
| 2 | Backend - Auth | 30 min | Pending |
| 3 | Backend - Content API | 30 min | Pending |
| 4 | Backend - File Upload | 20 min | Pending |
| 5 | Frontend - Public Pages | 45 min | Pending |
| 6 | Frontend - Admin Dashboard | 45 min | Pending |
| 7 | Integration & Testing | 30 min | Pending |
| 8 | Polish & Documentation | 20 min | Pending |

**Estimated Total: ~3.5 hours**

---

## 2. Task Breakdown

### Phase 1: Project Setup

| # | Task | File(s) |
|---|------|---------|
| 1.1 | Init root package.json | `package.json` |
| 1.2 | Init server with Express | `server/package.json`, `server/server.js` |
| 1.3 | Setup MongoDB connection | `server/config/db.js` |
| 1.4 | Setup Vite + React | `client/package.json`, `client/vite.config.js` |
| 1.5 | Setup Tailwind CSS | `client/tailwind.config.js` |
| 1.6 | Setup environment variables | `server/.env`, `.gitignore` |
| 1.7 | Create seed script | `server/seed.js` |

---

### Phase 2: Backend - Authentication

| # | Task | File(s) |
|---|------|---------|
| 2.1 | Create User model | `server/models/User.js` |
| 2.2 | Create auth middleware | `server/middleware/auth.js` |
| 2.3 | Create auth controller | `server/controllers/authController.js` |
| 2.4 | Create auth routes | `server/routes/authRoutes.js` |
| 2.5 | Setup express-session | `server/server.js` |

---

### Phase 3: Backend - Content API

| # | Task | File(s) |
|---|------|---------|
| 3.1 | Create Hero model | `server/models/Hero.js` |
| 3.2 | Create About model | `server/models/About.js` |
| 3.3 | Create Contact model | `server/models/Contact.js` |
| 3.4 | Create hero controller | `server/controllers/heroController.js` |
| 3.5 | Create about controller | `server/controllers/aboutController.js` |
| 3.6 | Create contact controller | `server/controllers/contactController.js` |
| 3.7 | Create hero routes | `server/routes/heroRoutes.js` |
| 3.8 | Create about routes | `server/routes/aboutRoutes.js` |
| 3.9 | Create contact routes | `server/routes/contactRoutes.js` |

---

### Phase 4: Backend - File Upload

| # | Task | File(s) |
|---|------|---------|
| 4.1 | Setup Multer config | `server/middleware/upload.js` |
| 4.2 | Create upload routes | `server/routes/uploadRoutes.js` |
| 4.3 | Serve static files | `server/server.js` |

---

### Phase 5: Frontend - Public Pages

| # | Task | File(s) |
|---|------|---------|
| 5.1 | Setup React Router | `client/src/App.jsx` |
| 5.2 | Create API service | `client/src/services/api.js` |
| 5.3 | Create Navbar component | `client/src/components/layout/Navbar.jsx` |
| 5.4 | Create Hero component | `client/src/components/sections/Hero.jsx` |
| 5.5 | Create About component | `client/src/components/sections/About.jsx` |
| 5.6 | Create Contact component | `client/src/components/sections/Contact.jsx` |
| 5.7 | Create Footer component | `client/src/components/layout/Footer.jsx` |
| 5.8 | Create Home page | `client/src/pages/Home.jsx` |
| 5.9 | Create Loading component | `client/src/components/common/Loading.jsx` |

---

### Phase 6: Frontend - Admin Dashboard

| # | Task | File(s) |
|---|------|---------|
| 6.1 | Create AuthContext | `client/src/context/AuthContext.jsx` |
| 6.2 | Create useAuth hook | `client/src/hooks/useAuth.js` |
| 6.3 | Create Login page | `client/src/pages/admin/Login.jsx` |
| 6.4 | Create Dashboard page | `client/src/pages/admin/Dashboard.jsx` |
| 6.5 | Create EditHero page | `client/src/pages/admin/EditHero.jsx` |
| 6.6 | Create EditAbout page | `client/src/pages/admin/EditAbout.jsx` |
| 6.7 | Create EditContact page | `client/src/pages/admin/EditContact.jsx` |
| 6.8 | Add ProtectedRoute component | `client/src/components/common/ProtectedRoute.jsx` |

---

### Phase 7: Integration & Testing

| # | Task | Description |
|---|------|-------------|
| 7.1 | Test all API endpoints | Postman / curl testing |
| 7.2 | Test admin login flow | Login → Dashboard → Edit |
| 7.3 | Test public page rendering | Fetch data → Display |
| 7.4 | Test file upload | Upload image → Display |
| 7.5 | Test responsive design | Mobile, tablet, desktop |
| 7.6 | Fix bugs | Issues found during testing |

---

### Phase 8: Polish & Documentation

| # | Task | File(s) |
|---|------|---------|
| 8.1 | Add error handling UI | Various components |
| 8.2 | Add loading states | Various components |
| 8.3 | Add input validation | Admin forms |
| 8.4 | Update README.md | `README.md` |
| 8.5 | Final code review | All files |

---

## 3. Implementation Order

### Step-by-Step Execution

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Auth) ──────┐
    │                 │
    ▼                 │
Phase 3 (Content API) │ Can be parallel
    │                 │
    ▼                 │
Phase 4 (Upload) ◄────┘
    │
    ▼
Phase 5 (Public Pages)
    │
    ▼
Phase 6 (Admin Dashboard)
    │
    ▼
Phase 7 (Testing)
    │
    ▼
Phase 8 (Polish)
```

---

## 4. File Structure (Final)

```
portofolio-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx
│   │   │       ├── About.jsx
│   │   │       └── Contact.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── EditHero.jsx
│   │   │       ├── EditAbout.jsx
│   │   │       └── EditContact.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── heroController.js
│   │   ├── aboutController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
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
│   ├── uploads/
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── docs/
│   ├── REQUIREMENT_ANALYSIS.md
│   ├── SYSTEM_DESIGN.md
│   ├── DATABASE_DESIGN.md
│   ├── API_DOCUMENTATION.md
│   ├── ROADMAP.md
│   └── TASKS.md
│
├── .gitignore
├── package.json
└── README.md
```

---

## 5. Testing Strategy

### Manual Testing Checklist

#### Backend API
- [ ] `POST /api/auth/login` — Correct credentials
- [ ] `POST /api/auth/login` — Wrong credentials
- [ ] `POST /api/auth/logout` — Clear session
- [ ] `GET /api/auth/check` — With/without session
- [ ] `GET /api/hero` — Public access
- [ ] `PUT /api/hero` — Admin only
- [ ] `PUT /api/hero` — Without login (should fail)
- [ ] `GET /api/about` — Public access
- [ ] `PUT /api/about` — Admin only
- [ ] `GET /api/contact` — Public access
- [ ] `PUT /api/contact` — Admin only
- [ ] `POST /api/upload/image` — Valid file
- [ ] `POST /api/upload/image` — Invalid file type
- [ ] `POST /api/upload/image` — File too large

#### Frontend
- [ ] Homepage loads with data
- [ ] Navbar smooth scroll
- [ ] Mobile responsive
- [ ] Admin login page
- [ ] Admin dashboard access
- [ ] Edit hero content
- [ ] Edit about content
- [ ] Edit contact content
- [ ] Upload image
- [ ] Logout functionality
- [ ] Protected routes redirect

---

## 6. Development Commands

### Server

```bash
# Install dependencies
cd server && npm install

# Run development
npm run dev

# Seed database
npm run seed
```

### Client

```bash
# Install dependencies
cd client && npm install

# Run development
npm run dev

# Build for production
npm run build
```

### Root

```bash
# Install all dependencies
npm run install:all

# Run both server & client
npm run dev
```

---

*Document created: 2026-07-22*
*Status: Waiting for Approval*
