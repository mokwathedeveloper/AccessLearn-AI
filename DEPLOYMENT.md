# 🚀 AccessLearn AI - Production Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Supabase project set up with database migrations applied
- ✅ Google Gemini API key
- ✅ GitHub repository ready
- ✅ Vercel account (for frontend)
- ✅ Render account (for backend)

## 📋 Environment Variables Setup

### Backend Environment Variables (Render)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GENAI_API_KEY=your-google-gemini-api-key
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables (Vercel)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.render.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.vercel.app
```

## 🗄️ Database Setup (Supabase)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down your project URL and keys

2. **Apply Database Migrations**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Apply migrations
   supabase db push
   ```

3. **Configure Storage**:
   - Enable storage in Supabase dashboard
   - Create bucket named `materials`
   - Set appropriate RLS policies

## 🖥️ Backend Deployment (Render)

1. **Connect Repository**:
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Select `backend` folder as root directory

2. **Configure Build Settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Node Version**: 20.x

3. **Set Environment Variables**:
   Add all backend environment variables listed above

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL

## 🌐 Frontend Deployment (Vercel)

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `frontend` folder as root directory

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. **Set Environment Variables**:
   Add all frontend environment variables listed above

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL

## 🔧 Post-Deployment Configuration

1. **Update CORS Settings**:
   - Update backend `FRONTEND_URL` with your actual Vercel URL
   - Redeploy backend if needed

2. **Update Frontend Backend URL**:
   - Update frontend `NEXT_PUBLIC_BACKEND_URL` with your actual Render URL
   - Redeploy frontend if needed

3. **Test Application**:
   - Visit your frontend URL
   - Test user registration/login
   - Test file upload functionality
   - Test AI features (summarization, TTS)

## 🔍 Verification Checklist

- [ ] Frontend loads without errors
- [ ] User authentication works
- [ ] File upload functionality works
- [ ] AI summarization works
- [ ] Text-to-speech works
- [ ] Voice navigation works
- [ ] Database operations work
- [ ] All environment variables are set correctly

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Verify `FRONTEND_URL` in backend matches your Vercel domain
   - Check CORS configuration in `main.ts`

2. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check if migrations are applied
   - Verify RLS policies

3. **AI Features Not Working**:
   - Verify Google Gemini API key
   - Check API quotas and limits

4. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

## 📊 Monitoring

- **Frontend**: Monitor via Vercel dashboard
- **Backend**: Monitor via Render dashboard
- **Database**: Monitor via Supabase dashboard
- **AI Usage**: Monitor via Google Cloud Console

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to `main` branch triggers automatic deployment
- Monitor deployment status in respective dashboards
- Set up branch protection rules for production stability

---

**🎉 Congratulations! Your AccessLearn AI application is now live in production!**

Access your application at: `https://your-frontend-domain.vercel.app`