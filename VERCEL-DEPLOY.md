# 🚀 Deploy Everything on Vercel - Simple Guide

## 🎯 Overview
Deploy both frontend AND backend on Vercel using Next.js API routes.

## 📋 What You Need
- Supabase account (database)
- Google Gemini API key
- Vercel account
- Your code ready

## 🔧 Step 1: Update Environment Variables

Run the setup script and use these values:

```bash
./setup-config.sh
```

**When prompted:**
- **Backend URL**: `https://your-app-name.vercel.app` (you'll get this after deployment)
- **Frontend URL**: `https://your-app-name.vercel.app` (same URL)

## 📦 Step 2: Install Dependencies

```bash
cd frontend
npm install
```

## 🌐 Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
6. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_BACKEND_URL=https://your-app-name.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   GOOGLE_GENAI_API_KEY=your-google-gemini-api-key
   ```
7. Click **"Deploy"**

## ✅ Step 4: Update URLs

After deployment:
1. Copy your Vercel URL (like: `https://accesslearn-ai.vercel.app`)
2. Go to Vercel dashboard → Settings → Environment Variables
3. Update:
   - `NEXT_PUBLIC_BACKEND_URL` = your Vercel URL
   - `NEXT_PUBLIC_APP_URL` = your Vercel URL
4. Redeploy

## 🧪 Step 5: Test Your App

Visit your Vercel URL and test:
- [ ] Sign up/Sign in works
- [ ] File upload works
- [ ] AI summarization works (`/api/ai/summarize`)
- [ ] Materials API works (`/api/materials`)

## 📍 API Endpoints

Your app will have these API routes:
- `https://your-app.vercel.app/api/health` - Health check
- `https://your-app.vercel.app/api/materials` - Materials CRUD
- `https://your-app.vercel.app/api/ai/summarize` - AI summarization

## 🎉 Done!

Everything runs on one Vercel deployment:
- ✅ Frontend (React/Next.js)
- ✅ Backend (API routes)
- ✅ Database (Supabase)
- ✅ AI (Google Gemini)

**Single URL for everything!** 🚀