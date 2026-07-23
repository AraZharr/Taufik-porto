# Deployment Plan - Portfolio Migration

## Backend Deployment (Vercel Serverless Functions)

### Option A: Vercel Serverless API

**Structure:**
```
server/
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   ├── logout.js
│   │   └── check.js
│   ├── hero/
│   │   └── index.js
│   ├── about/
│   │   └── index.js
│   ├── contact/
│   │   └── index.js
│   └── upload/
│       └── image.js
└── vercel.json
```

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

### Session Handling on Vercel

**Problem:** Serverless functions are stateless  
**Solution:** Use Supabase for session storage

**Install:**
```bash
npm install connect-pg-simple pg
```

**Configure (`api/_middleware.js` or shared config):**
```javascript
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const sessionMiddleware = session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  }
});

module.exports = sessionMiddleware;
```

---

## Frontend Deployment (Vercel)

### Build Configuration

**Vercel Settings:**
- Framework Preset: Vite
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL = https://taufik-porto-api.vercel.app
```

### Update API Base URL

**Before (`client/src/services/api.js`):**
```javascript
const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});
```

**After:**
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## Migration Checklist

### Pre-Migration
- [ ] Backup MongoDB data
- [ ] Export user credentials (hash stays same)
- [ ] Download all images from `/uploads`
- [ ] Document current admin username

### Database Setup
- [ ] Create Supabase project
- [ ] Run SQL schema creation
- [ ] Create storage bucket `portfolio-images`
- [ ] Set bucket to public
- [ ] Configure bucket policies (2MB limit, image types only)

### Code Migration
- [ ] Replace Mongoose with Supabase client
- [ ] Rewrite all models as query helpers
- [ ] Update all controllers
- [ ] Replace session store (connect-mongo → connect-pg-simple)
- [ ] Update upload handler (multer disk → Supabase Storage)
- [ ] Update CORS origin for production

### Data Migration
- [ ] Seed admin user to PostgreSQL
- [ ] Migrate hero data
- [ ] Migrate about data
- [ ] Migrate contact data
- [ ] Upload images to Supabase Storage
- [ ] Update image URLs in database

### Frontend Updates
- [ ] Add environment variables
- [ ] Update API base URL
- [ ] Test image loading from Supabase CDN
- [ ] Update image upload flow

### Deployment
- [ ] Deploy backend to Vercel (serverless functions)
- [ ] Deploy frontend to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Test auth flow end-to-end
- [ ] Test image upload
- [ ] Test all CRUD operations

### Post-Deployment
- [ ] Verify all pages load
- [ ] Test admin login
- [ ] Test content editing
- [ ] Test image upload/display
- [ ] Check session persistence
- [ ] Monitor Supabase logs
- [ ] Set up error tracking (optional: Sentry)

---

## Rollback Plan

**If migration fails:**

1. **Keep MongoDB running** (don't delete until verified)
2. **Revert DNS/domain** if needed
3. **Re-deploy old version** from git tag
4. **Restore uploaded images** to `/uploads`

**Backup Commands:**
```bash
# Backup MongoDB data
mongodump --uri="mongodb+srv://..." --out=./backup

# Backup uploads folder
tar -czf uploads-backup.tar.gz server/uploads/
```

---

## Performance Optimization

### Supabase
- Enable Row Level Security (RLS) policies
- Add indexes on frequently queried columns
- Use `select('*')` sparingly (select only needed fields)

### Supabase Storage
- Enable CDN caching (already enabled by default)
- Use image transformations for thumbnails
- Set appropriate cache headers

### Vercel
- Enable edge caching for API routes
- Use `stale-while-revalidate` for static assets
- Monitor function execution time

---

## Cost Estimation

### Supabase (Free Tier)
- Database: 500MB (sufficient for portfolio)
- Storage: 1GB (sufficient for ~100 images)
- Bandwidth: 2GB/month
- **Cost: $0/month** (within free tier)

### Vercel (Hobby Tier)
- Frontend: Unlimited bandwidth
- Serverless Functions: 100GB-hrs/month
- **Cost: $0/month** (hobby tier)

**Total: $0/month** ✅

---
