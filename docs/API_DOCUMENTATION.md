# API DOCUMENTATION — Portfolio Website

---

## 1. Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000/api` |
| Production | `https://yourdomain.com/api` |

---

## 2. Authentication

### Session-Based Authentication

| Property | Value |
|----------|-------|
| **Method** | Cookie-based Session |
| **Cookie Name** | `connect.sid` |
| **Session Store** | Memory (dev) / MongoDB (prod) |
| **Duration** | 24 hours |

### Auth Headers

```
Content-Type: application/json
Cookie: connect.sid=<session-id>
```

---

## 3. Public Endpoints

### 3.1 Get Hero Content

```
GET /api/hero
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "heading": "Hello, I am",
    "subheading": "Full Stack Developer",
    "ctaText": "View My Work",
    "ctaLink": "#portfolio",
    "profileImage": "uploads/avatar.jpg",
    "updatedAt": "2026-07-22T10:30:00.000Z"
  }
}
```

---

### 3.2 Get About Content

```
GET /api/about
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "description": "I am a passionate developer...",
    "image": "uploads/about.jpg",
    "extraInfo": "Open for opportunities",
    "updatedAt": "2026-07-22T10:30:00.000Z"
  }
}
```

---

### 3.3 Get Contact Content

```
GET /api/contact
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "email": "hello@example.com",
    "phone": "+628123456789",
    "address": "Jakarta, Indonesia",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "instagram": "https://instagram.com/username",
    "twitter": "https://twitter.com/username",
    "updatedAt": "2026-07-22T10:30:00.000Z"
  }
}
```

---

## 4. Auth Endpoints

### 4.1 Login

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j0",
    "username": "admin"
  }
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

### 4.2 Logout

```
POST /api/auth/logout
```

**Headers:** `Cookie: connect.sid=<session-id>`

**Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4.3 Check Session

```
GET /api/auth/check
```

**Headers:** `Cookie: connect.sid=<session-id>`

**Response (200) — Logged In:**

```json
{
  "success": true,
  "isLoggedIn": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j0",
    "username": "admin"
  }
}
```

**Response (401) — Not Logged In:**

```json
{
  "success": false,
  "isLoggedIn": false,
  "message": "Not authenticated"
}
```

---

## 5. Admin Endpoints (Protected)

> Semua endpoint di bawah memerlukan session yang valid.
> Jika tidak login, response: `401 Unauthorized`

---

### 5.1 Update Hero

```
PUT /api/hero
```

**Headers:**
```
Cookie: connect.sid=<session-id>
Content-Type: application/json
```

**Request Body:**

```json
{
  "heading": "Hello, I am",
  "subheading": "Frontend Developer",
  "ctaText": "Contact Me",
  "ctaLink": "#contact"
}
```

> Semua field bersifat optional. Hanya field yang dikirim yang akan diupdate.

**Response (200):**

```json
{
  "success": true,
  "message": "Hero updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "heading": "Hello, I am",
    "subheading": "Frontend Developer",
    "ctaText": "Contact Me",
    "ctaLink": "#contact",
    "profileImage": "uploads/avatar.jpg",
    "updatedAt": "2026-07-22T11:00:00.000Z"
  }
}
```

**Response (401):**

```json
{
  "success": false,
  "message": "Not authenticated"
}
```

---

### 5.2 Update About

```
PUT /api/about
```

**Headers:**
```
Cookie: connect.sid=<session-id>
Content-Type: application/json
```

**Request Body:**

```json
{
  "description": "I am a passionate full-stack developer with 5 years of experience...",
  "extraInfo": "Currently open for freelance opportunities"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "About updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "description": "I am a passionate full-stack developer with 5 years of experience...",
    "image": "uploads/about.jpg",
    "extraInfo": "Currently open for freelance opportunities",
    "updatedAt": "2026-07-22T11:00:00.000Z"
  }
}
```

---

### 5.3 Update Contact

```
PUT /api/contact
```

**Headers:**
```
Cookie: connect.sid=<session-id>
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "hello@example.com",
  "phone": "+628123456789",
  "address": "Jakarta, Indonesia",
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "instagram": "https://instagram.com/username",
  "twitter": "https://twitter.com/username"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "email": "hello@example.com",
    "phone": "+628123456789",
    "address": "Jakarta, Indonesia",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "instagram": "https://instagram.com/username",
    "twitter": "https://twitter.com/username",
    "updatedAt": "2026-07-22T11:00:00.000Z"
  }
}
```

---

## 6. File Upload Endpoint

### 6.1 Upload Image

```
POST /api/upload/image
```

**Headers:**
```
Cookie: connect.sid=<session-id>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

| Field | Type | Description |
|-------|------|-------------|
| `image` | File | Image file (required) |

**File Constraints:**

| Constraint | Value |
|------------|-------|
| Allowed types | `image/jpeg`, `image/png`, `image/webp` |
| Max size | 2MB |
| Destination | `server/uploads/` |

**Response (200):**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "filename": "1690032000000-avatar.jpg",
    "path": "uploads/1690032000000-avatar.jpg",
    "url": "http://localhost:5000/uploads/1690032000000-avatar.jpg"
  }
}
```

**Response (400) — Invalid File:**

```json
{
  "success": false,
  "message": "Only .jpg, .png, and .webp files are allowed"
}
```

**Response (400) — File Too Large:**

```json
{
  "success": false,
  "message": "File size must be less than 2MB"
}
```

---

## 7. Error Response Format

Semua error response menggunakan format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (not admin) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 8. Frontend Integration

### Axios Instance

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
```

### Usage Examples

```javascript
// Fetch hero data
const { data } = await api.get('/hero');

// Login
await api.post('/auth/login', { username, password });

// Update hero (admin)
await api.put('/hero', { heading: 'New Heading' });

// Upload image
const formData = new FormData();
formData.append('image', file);
await api.post('/upload/image', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

*Document created: 2026-07-22*
*Status: Waiting for Approval*
