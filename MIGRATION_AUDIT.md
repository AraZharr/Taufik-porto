# Portfolio Project - Full Audit & Migration Plan
**MongoDB → Supabase (PostgreSQL)**

Generated: 2026-07-23  
Target: AraZharr/Taufik-porto

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Current Tech Stack](#current-tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Authentication Flow](#authentication-flow)
7. [File Upload System](#file-upload-system)
8. [Migration Strategy](#migration-strategy)
9. [Environment Variables](#environment-variables)
10. [Deployment Plan](#deployment-plan)

---

## 1. Project Overview

**Original Source:** `Fis-art/New-Portofolio`  
**Target Repository:** `AraZharr/Taufik-porto`  
**Local Path:** `/root/work5`

### Purpose
Personal portfolio website with admin dashboard for content management.

### Features
- ✅ Dynamic Hero/Banner section
- ✅ About Me section with image
- ✅ Contact information with social links
- ✅ Admin authentication (session-based)
- ✅ Image upload (2MB limit, jpg/png/webp)
- ✅ Responsive design (Tailwind CSS)

---

## 2. Current Tech Stack

### Frontend
- **Framework:** React 19.2.7
- **Build Tool:** Vite 8.1.1
- **Styling:** Tailwind CSS 3.4.19
- **Routing:** React Router DOM 7.18.1
- **HTTP Client:** Axios 1.18.1
- **Linter:** Oxlint 1.71.0

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4.18.2
- **Database:** MongoDB Atlas (Mongoose 7.4.0)
- **Auth:** bcrypt 5.1.0 + express-session 1.17.3
- **Session Store:** connect-mongo 5.0.0
- **File Upload:** Multer 1.4.5-lts.1
- **CORS:** cors 2.8.5

### Development
- **Frontend Dev Server:** Vite (port 5173)
- **Backend Dev Server:** Nodemon (port 5000)
- **Concurrency:** concurrently 8.2.0

---

## 3. Project Structure

```
work5/
├── client/                    # Frontend (React + Vite)
│   ├── src/
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
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── EditHero.jsx
│   │   │       ├── EditAbout.jsx
│   │   │       └── EditContact.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                    # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Login, logout, checkAuth
│   │   ├── heroController.js  # GET, UPDATE hero
│   │   ├── aboutController.js # GET, UPDATE about
│   │   └── contactController.js # GET, UPDATE contact
│   ├── middleware/
│   │   ├── auth.js           # Session auth check
│   │   └── upload.js         # Multer config
│   ├── models/
│   │   ├── User.js           # username, password
│   │   ├── Hero.js           # heading, subheading, CTA
│   │   ├── About.js          # description, image
│   │   └── Contact.js        # email, phone, socials
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── heroRoutes.js
│   │   ├── aboutRoutes.js
│   │   ├── contactRoutes.js
│   │   └── uploadRoutes.js
│   ├── uploads/              # Local image storage
│   ├── server.js             # Entry point
│   ├── seed.js               # Database seeder
│   ├── ensure-uploads.js
│   ├── package.json
│   └── .env
│
├── docs/                      # Documentation
│   ├── REQUIREMENT_ANALYSIS.md
│   ├── SYSTEM_DESIGN.md
│   ├── DATABASE_DESIGN.md
│   ├── API_DOCUMENTATION.md
│   └── ROADMAP.md
│
├── AGENTS.md
├── README.md
└── package.json              # Root scripts
```

---

## 4. Database Schema

### Current (MongoDB/Mongoose)

#### **users** Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, 3-30 chars, required),
  password: String (hashed bcrypt, min 6 chars, required),
  createdAt: Date (default: now)
}
```

#### **heroes** Collection (Singleton)
```javascript
{
  _id: ObjectId,
  heading: String (max 100 chars, default: "Hello, I am"),
  subheading: String (max 200 chars, default: "Full Stack Developer"),
  ctaText: String (max 50 chars, default: "View My Work"),
  ctaLink: String (max 200 chars, default: "#portfolio"),
  profileImage: String (default: "uploads/default-avatar.png"),
  updatedAt: Date (auto-updated on save)
}
```

#### **abouts** Collection (Singleton)
```javascript
{
  _id: ObjectId,
  description: String (max 2000 chars, required),
  image: String (default: "uploads/default-about.png"),
  extraInfo: String (max 1000 chars, optional),
  updatedAt: Date (auto-updated on save)
}
```

#### **contacts** Collection (Singleton)
```javascript
{
  _id: ObjectId,
  email: String (required, validated),
  phone: String (optional),
  github: String (optional),
  linkedin: String (optional),
  instagram: String (optional),
  updatedAt: Date (auto-updated on save)
}
```

#### **sessions** Collection (connect-mongo)
```javascript
{
  _id: String (session ID),
  expires: Date,
  session: {
    cookie: {...},
    userId: ObjectId
  }
}
```

### Target (Supabase PostgreSQL)

#### **users** Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  password TEXT NOT NULL, -- bcrypt hash
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_username ON users(username);
```

#### **hero** Table (Singleton - single row)
```sql
CREATE TABLE hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL DEFAULT 'Hello, I am' CHECK (char_length(heading) <= 100),
  subheading TEXT NOT NULL DEFAULT 'Full Stack Developer' CHECK (char_length(subheading) <= 200),
  cta_text TEXT CHECK (char_length(cta_text) <= 50),
  cta_link TEXT CHECK (char_length(cta_link) <= 200),
  profile_image TEXT DEFAULT 'default-avatar.png',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure only one row (singleton pattern)
CREATE UNIQUE INDEX idx_hero_singleton ON hero ((true));
```

#### **about** Table (Singleton)
```sql
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL CHECK (char_length(description) <= 2000),
  image TEXT DEFAULT 'default-about.png',
  extra_info TEXT CHECK (char_length(extra_info) <= 1000),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_about_singleton ON about ((true));
```

#### **contact** Table (Singleton)
```sql
CREATE TABLE contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  github TEXT,
  linkedin TEXT,
  instagram TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_contact_singleton ON contact ((true));
```

---

## 5. API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Login with username/password |
| POST | `/api/auth/logout` | ✅ | Destroy session |
| GET | `/api/auth/check` | ❌ | Check auth status |

### Hero Section
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/hero` | ❌ | Get hero data (public) |
| PUT | `/api/hero` | ✅ | Update hero data |

### About Section
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/about` | ❌ | Get about data (public) |
| PUT | `/api/about` | ✅ | Update about data |

### Contact Section
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/contact` | ❌ | Get contact data (public) |
| PUT | `/api/contact` | ✅ | Update contact data |

### File Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/upload/image` | ✅ | Upload image (2MB max) |

### Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | ❌ | Server health status |

---

## 6. Authentication Flow

### Current (MongoDB + express-session)

**Login Flow:**
1. Client sends `POST /api/auth/login` with `{username, password}`
2. Server queries MongoDB: `User.findOne({username})`
3. Server compares password: `bcrypt.compare(password, user.password)`
4. On success: `req.session.userId = user._id`
5. Session stored in MongoDB via `connect-mongo`
6. Cookie `connect.sid` sent to client

**Auth Check:**
1. Client sends request with `connect.sid` cookie
2. Middleware reads `req.session.userId`
3. Query MongoDB: `User.findById(req.session.userId)`
4. If found: `req.user = user`, proceed
5. If not: return 401

**Logout:**
1. Client sends `POST /api/auth/logout`
2. Server: `req.session.destroy()`
3. Clear cookie: `res.clearCookie('connect.sid')`

### Target (Supabase Auth)

**Option A: Supabase Auth (Recommended)**
- Use `@supabase/auth-helpers-nextjs` or `@supabase/auth-helpers-node`
- JWT-based auth (stored in client)
- Row Level Security (RLS) policies

**Option B: Custom Session Table**
- Keep express-session
- Store sessions in Supabase `sessions` table
- Use `@supabase/supabase-js` for queries

---

