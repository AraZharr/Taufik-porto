# Vercel Deployment Guide - Taufik Portfolio

**Last Updated:** 2026-07-23

---

## 🎯 Overview

Deploy portfolio to Vercel with two separate projects:
1. **Frontend** (React + Vite) - Main website
2. **Backend** (Express API) - API server

---

## 📋 Prerequisites

- [ ] Vercel account: https://vercel.com/signup
- [ ] Supabase project created
- [ ] GitHub repository: AraZharr/Taufik-porto
- [ ] Supabase credentials ready

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend API First

**Why first?** Frontend needs backend API URL during build.

#### 1.1 Import Backend to Vercel

1. Go to https://vercel.com/new
2. Import Git Repository → Select `AraZharr/Taufik-porto`
3. Configure:
   - **Project Name:** `taufik-porto-api`
   - **Framework Preset:** Other
   - **Root Directory:** `server`
   - **Build Command:** *(leave empty)*
   - **Output Directory:** *(leave empty)*
   - **Install Command:** `npm install`

#### 1.2 Add Environment Variables

Click "Environment Variables" and add:

```
SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL = postgresql://postgres:***@db.xxxxx.supabase.co:5432/postgres
SESSION_SECRET = ***
NODE_ENV = production
PORT = 5000
CORS_ORIGIN = https://taufik-porto.vercel.app
```

**⚠️ IMPORTANT:** 
- Use your actual Supabase values
- Generate SESSION_SECRET: `openssl rand -base64 32`
- CORS_ORIGIN will be your frontend URL (update after frontend deployment)

#### 1.3 Deploy

Click "Deploy" and wait ~2 minutes.

#### 1.4 Note Backend URL

After deployment, copy your backend URL:
```
https://taufik-porto-api.vercel.app
```

You'll need this for frontend deployment.

---

### Step 2: Deploy Frontend

#### 2.1 Import Frontend to Vercel

1. Go to https://vercel.com/new
2. Import Git Repository → Select `AraZharr/Taufik-porto` (same repo)
3. Configure:
   - **Project Name:** `taufik-porto`
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### 2.2 Add Environment Variables

Click "Environment Variables" and add:

```
VITE_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL = https://taufik-porto-api.vercel.app
```

**⚠️ IMPORTANT:** 
- Must use `VITE_` prefix (Vite requirement)
- Use same Supabase URL and ANON_KEY as backend
- VITE_API_URL = your backend URL from Step 1.4

#### 2.3 Deploy

Click "Deploy" and wait ~2 minutes.

#### 2.4 Note Frontend URL

After deployment, copy your frontend URL:
```
https://taufik-porto.vercel.app
```

---

### Step 3: Update Backend CORS

**Important:** Backend needs to allow frontend domain.

1. Go to backend project: https://vercel.com/dashboard
2. Select `taufik-porto-api`
3. Settings → Environment Variables
4. Find `CORS_ORIGIN`
5. Update value to: `https://taufik-porto.vercel.app`
6. Save
7. Redeploy: Deployments → Latest → ⋯ → Redeploy

---

## ✅ Verification Checklist

After deployment, test these:

### Backend API
- [ ] Health check: `https://taufik-porto-api.vercel.app/api/health`
- [ ] Should return: `{"status":"ok","timestamp":"..."}`

### Frontend
- [ ] Homepage loads: `https://taufik-porto.vercel.app`
- [ ] Images display correctly
- [ ] No console errors (F12 → Console)

### Admin Login
- [ ] Go to: `https://taufik-porto.vercel.app/admin/login`
- [ ] Enter credentials (default: check seed.js)
- [ ] Should redirect to dashboard
- [ ] Try editing hero section
- [ ] Upload an image

### Session Persistence
- [ ] Login to admin
- [ ] Refresh page (F5)
- [ ] Should stay logged in
- [ ] If not → check SESSION_SECRET and DATABASE_URL

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" errors

**Cause:** CORS misconfiguration

**Fix:**
1. Check backend CORS_ORIGIN matches frontend URL exactly
2. Redeploy backend after changing
3. Clear browser cache (Ctrl+Shift+R)

---

### Issue: Session doesn't persist (logged out on refresh)

**Cause:** Session store not working

**Fix:**
1. Verify DATABASE_URL in backend env vars
2. Check Supabase → SQL Editor:
   ```sql
   SELECT * FROM sessions;
   ```
3. Should show session data after login
4. If empty → check connect-pg-simple installation

---

### Issue: Images not uploading

**Cause:** Supabase Storage not configured

**Fix:**
1. Supabase Dashboard → Storage
2. Create bucket: `portfolio-images`
3. Make it public
4. Check bucket policies allow inserts

---

### Issue: Build fails on Vercel

**Cause:** Missing dependencies or build errors

**Fix:**
1. Check Vercel build logs
2. Test locally first: `npm run build`
3. Ensure all dependencies in package.json
4. Check Node version compatibility

---

## 🔄 Update Deployment

### Frontend Changes

```bash
git add .
git commit -m "update: frontend changes"
git push origin main
```

Vercel auto-deploys on push.

### Backend Changes

```bash
git add .
git commit -m "update: backend changes"
git push origin main
```

Vercel auto-deploys on push.

### Environment Variable Changes

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Update values
3. Redeploy: Deployments → ⋯ → Redeploy

---

## 📊 Monitoring

### Check Logs

**Backend:**
1. Vercel Dashboard → `taufik-porto-api`
2. Deployments → Latest → View Function Logs
3. See real-time API calls

**Frontend:**
1. Browser Console (F12)
2. Check for errors

### Performance

Vercel Dashboard → Analytics (Pro plan)

---

## 💰 Cost

**Free Tier Limits:**
- Deployments: Unlimited
- Bandwidth: 100GB/month
- Serverless Function Execution: 100GB-hrs/month
- Build Minutes: 100 hours/month

**Portfolio usage:** ~1-5% of free tier (well within limits)

---

## 🔐 Security Checklist

- [ ] SESSION_SECRET is random (32+ chars)
- [ ] SUPABASE_SERVICE_KEY only in backend (not frontend)
- [ ] CORS_ORIGIN set to exact frontend domain
- [ ] No .env files committed to git
- [ ] Supabase RLS policies enabled (optional but recommended)

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Project Repo:** https://github.com/AraZharr/Taufik-porto

---

**Deployment Status:** Ready to deploy after Supabase migration completed.
