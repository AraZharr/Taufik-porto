# REQUIREMENT ANALYSIS — Portfolio Website

---

## 1. Project Overview

| Field | Description |
|-------|-------------|
| **Project Name** | Personal Portfolio Website |
| **Description** | Website portofolio personal untuk menampilkan profil diri, kemampuan, dan informasi kontak. Dilengkapi admin dashboard untuk mengelola konten. |
| **Problem Statement** | Seorang profesional membutuhkan website portofolio untuk mempresentasikan diri secara online kepada calon klien atau perusahaan, namun tidak memiliki cara mudah untuk memperbarui konten tanpa bantuan developer. |
| **Project Goals** | Menyediakan website portofolio yang profesional, mudah dikelola melalui admin dashboard, dan responsive di semua perangkat. |
| **Target Users** | Personal owner (admin) yang ingin menampilkan portofolio kepada publik. |

---

## 2. User Analysis

### User Roles

| Role | Description |
|------|-------------|
| **Admin** | Pemilik website, mengelola semua konten melalui dashboard |
| **Visitor** | Pengunjung website, melihat informasi portofolio |

### User Permissions

| Action | Admin | Visitor |
|--------|-------|---------|
| Melihat homepage | ✓ | ✓ |
| Melihat About Me | ✓ | ✓ |
| Melihat Contact | ✓ | ✓ |
| Mengedit konten | ✓ | ✗ |
| Mengupload gambar | ✓ | ✗ |
| Login ke dashboard | ✓ | ✗ |

### User Needs

**Admin:**
- Login ke dashboard dengan aman
- Mengedit Hero/Banner (judul, tagline, foto profil, CTA)
- Mengedit About Me (deskripsi, foto, informasi tambahan)
- Mengedit informasi kontak (email, telepon, alamat, social media)
- Melihat ringkasan kunjungan (opsional, fase mendatang)

**Visitor:**
- Melihat informasi portofolio dengan cepat
- Navigasi yang mudah dan intuitif
- Tampilan yang responsif di mobile, tablet, dan desktop
- Mengirim pesan melalui form kontak (opsional, fase mendatang)

---

## 3. Functional Requirements

### 3.1 Public Pages

**Homepage:**
- Menampilkan Hero/Banner dengan judul, tagline, foto profil, dan CTA button
- Section About Me dengan deskripsi dan foto
- Section Contact dengan informasi kontak
- Navigasi menu yang sticky/smooth scroll

### 3.2 Admin Dashboard

**Authentication:**
- Halaman login dengan username dan password
- Session management (redirect ke dashboard jika sudah login)
- Logout functionality

**Hero/Banner Management:**
- Upload/ganti foto profil
- Edit judul (heading)
- Edit tagline (subheading)
- Edit teks CTA button
- Edit link/URL CTA button

**About Me Management:**
- Edit deskripsi about me
- Upload/ganti foto about me
- Edit informasi tambahan (opsional)

**Contact Management:**
- Edit email
- Edit nomor telepon
- Edit alamat
- Edit link social media (GitHub, LinkedIn, Instagram, dll)

---

## 4. Non Functional Requirements

### Performance
- Halaman harus load dalam 3 detik atau kurang
- Gambar harus ter-optimasi (compressed, WebP format preferred)
- Menggunakan caching untuk konten statis

### Security
- Password admin di-hash (bcrypt)
- Session cookie yang aman (httpOnly, secure)
- Input validation dan sanitization
- Protection terhadap SQL Injection dan XSS

### Maintainability
- Code structure yang bersih dan terorganisir
- Component-based architecture (React)
- Komentar pada code yang kompleks
- Environment variables untuk konfigurasi sensitif

### Scalability
- Struktur database yang fleksibel untuk menambah section baru
- API yang terstruktur untuk integrasi masa depan

### Compatibility
- Responsive design (mobile, tablet, desktop)
- Browser modern: Chrome, Firefox, Safari, Edge
- Minimal resolusi: 320px (mobile) sampai 4K

---

## 5. Business Rules

1. Hanya admin yang bisa mengedit konten
2. Visitor tidak perlu login untuk melihat website
3. Semua konten yang di-edit admin akan langsung terpublish
4. Foto profil memiliki batas ukuran maksimal (2MB)
5. Form kontak mengirim pesan ke email admin (opsional fase mendatang)
6. Admin hanya bisa login dengan 1 akun (single admin)

---

## 6. Data Requirements

### Entities

**User (Admin)**
| Attribute | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Primary key |
| username | String | Unique, required |
| password | String | Hashed, required |
| createdAt | Date | Timestamp |

**Hero Content**
| Attribute | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Primary key |
| heading | String | Judul utama |
| subheading | String | Tagline |
| ctaText | String | Teks button CTA |
| ctaLink | String | URL button CTA |
| profileImage | String | URL/path foto profil |

**About Content**
| Attribute | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Primary key |
| description | String | Deskripsi about me |
| image | String | URL/path foto about |
| extraInfo | String | Informasi tambahan |

**Contact Content**
| Attribute | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Primary key |
| email | String | Alamat email |
| phone | String | Nomor telepon |
| address | String | Alamat |
| github | String | Link GitHub |
| linkedin | String | Link LinkedIn |
| instagram | String | Link Instagram |

**Message (Fase Mendatang)**
| Attribute | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Primary key |
| name | String | Nama pengirim |
| email | String | Email pengirim |
| message | String | Isi pesan |
| createdAt | Date | Timestamp |
| isRead | Boolean | Status baca |

---

## 7. Technical Constraints

| Constraint | Detail |
|------------|--------|
| **Frontend** | React.js (Vite) |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Styling** | Tailwind CSS |
| **File Storage** | Local storage (public/uploads) |
| **Deployment** | Belum ditentukan (opsional: Vercel, Railway, VPS) |
| **Authentication** | Session-based (express-session) |

---

## 8. Risks & Assumptions

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tanpa HTTPS, session rentan diintercept | High | Gunakan HTTPS di production |
| File upload tanpa validasi bisa disalahgunakan | Medium | Validasi tipe file dan ukuran |
| Single admin tanpa backup | Medium | Buat fitur backup di fase mendatang |
| Database crash tanpa backup | High | Regular backup MongoDB |

### Assumptions

1. Admin memiliki pengetahuan dasar menggunakan web browser
2. Website hanya untuk 1 admin (single user)
3. Tidak membutuhkan fitur multi-language
4. Deploy ke hosting yang mendukung Node.js
5. Domain belum ditentukan

---

## 9. Open Questions

| No | Question | Status |
|----|----------|--------|
| 1 | Apakah perlu fitur form kontak yang mengirim email? | **Fase Mendatang** |
| 2 | Apakah perlu analytics/counter kunjungan? | **Fase Mendatang** |
| 3 | Apakah perlu dark mode toggle? | **Tidak** |
| 4 | Apakah perlu blog section? | **Tidak** |
| 5 | Apakah perlu sitemap/SEO meta tags? | **Ya, sederhana** |
| 6 | Nama project untuk repository? | **portofolio-website** |
| 7 | Bahasa konten website? | **Indonesia / English** |

---

*Document created: 2026-07-22*
*Status: Waiting for Approval*
