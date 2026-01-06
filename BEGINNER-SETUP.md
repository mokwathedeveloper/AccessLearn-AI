# 🎓 AccessLearn AI - Beginner Setup Guide

## 📋 What You Need First

1. **Create these accounts (all free)**:
   - [GitHub](https://github.com) - to store your code
   - [Supabase](https://supabase.com) - for database
   - [Google AI Studio](https://aistudio.google.com) - for AI features
   - [Vercel](https://vercel.com) - to host frontend
   - [Render](https://render.com) - to host backend

2. **Install on your computer**:
   - [Node.js](https://nodejs.org) (version 20 or higher)
   - [Git](https://git-scm.com)

## 🗄️ Step 1: Setup Database (Supabase)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - **Name**: `accesslearn-ai`
   - **Password**: Create a strong password
   - **Region**: Choose closest to you
4. Wait for project to be created (2-3 minutes)
5. Go to **Settings** → **API**
6. **SAVE THESE VALUES** (you'll need them later):
   - `Project URL` (looks like: https://abc123.supabase.co)
   - `anon public` key (long string starting with "eyJ...")
   - `service_role` key (long string starting with "eyJ...")

### Setup Database Tables
1. Go to **SQL Editor** in Supabase
2. Click "New Query"
3. Copy and paste this code:

```sql
-- Create user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- Create users table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  role public.app_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create materials table
CREATE TYPE public.material_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TABLE public.materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  status public.material_status NOT NULL DEFAULT 'pending',
  uploaded_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  audio_url TEXT,
  summary TEXT,
  simplified_content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Security policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own materials" ON public.materials
  FOR SELECT USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can insert own materials" ON public.materials
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own materials" ON public.materials
  FOR UPDATE USING (auth.uid() = uploaded_by);
```

4. Click **Run** button
5. You should see "Success. No rows returned"

### Setup File Storage
1. Go to **Storage** in Supabase
2. Click **New Bucket**
3. Name: `materials`
4. Make it **Public**: ✅ Yes
5. Click **Create Bucket**

## 🤖 Step 2: Get AI Key (Google Gemini)

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with Google account
3. Click **Get API Key**
4. Click **Create API Key**
5. **SAVE THIS KEY** - it looks like: `AIza...`

## 💻 Step 3: Setup Your Code

1. **Download the code**:
   ```bash
   git clone https://github.com/mokwathedeveloper/AccessLearn-AI.git
   cd AccessLearn-AI
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   cp .env.example .env
   ```

3. **Edit backend/.env file** (use any text editor):
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   GOOGLE_GENAI_API_KEY=your-google-gemini-api-key
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```
   Replace the values with your actual keys from Step 1 and 2.

4. **Setup Frontend**:
   ```bash
   cd ../frontend
   cp .env.example .env.local
   ```

5. **Edit frontend/.env.local file**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   Replace with your actual Supabase values from Step 1.

## 🏃 Step 4: Run Locally

1. **Install and start backend**:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   Keep this terminal open. You should see "Application is running on: http://localhost:3001"

2. **Open new terminal, install and start frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   You should see "Ready - started server on 0.0.0.0:3000"

3. **Test it**: Open http://localhost:3000 in your browser

## 🌐 Step 5: Deploy to Internet

### Deploy Backend (Render)
1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub account
4. Select your AccessLearn-AI repository
5. Fill in:
   - **Name**: `accesslearn-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
6. Add Environment Variables (click **Advanced**):
   ```
   SUPABASE_URL = https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
   GOOGLE_GENAI_API_KEY = your-google-gemini-api-key
   NODE_ENV = production
   PORT = 10000
   FRONTEND_URL = https://your-app-name.vercel.app
   ```
7. Click **Create Web Service**
8. **SAVE YOUR BACKEND URL** (looks like: https://accesslearn-backend.onrender.com)

### Deploy Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   NEXT_PUBLIC_BACKEND_URL = https://your-backend-url.onrender.com
   NEXT_PUBLIC_APP_URL = https://your-app-name.vercel.app
   ```
6. Click **Deploy**
7. **SAVE YOUR FRONTEND URL** (looks like: https://accesslearn-ai.vercel.app)

### Update URLs
1. Go back to Render (backend)
2. Update `FRONTEND_URL` to your actual Vercel URL
3. Redeploy

## ✅ Step 6: Test Everything

Visit your Vercel URL and test:
- [ ] Sign up for new account
- [ ] Sign in
- [ ] Upload a PDF file
- [ ] Generate summary
- [ ] Listen to text-to-speech

## 🆘 Need Help?

**Common Issues:**

1. **"Cannot connect to database"**
   - Check your Supabase URL and keys
   - Make sure you ran the SQL commands

2. **"AI not working"**
   - Check your Google Gemini API key
   - Make sure it's not expired

3. **"CORS error"**
   - Make sure FRONTEND_URL in backend matches your Vercel URL

4. **"Build failed"**
   - Make sure Node.js version is 20+
   - Try deleting node_modules and running `npm install` again

**Still stuck?** Check the error messages in:
- Browser console (F12)
- Render logs (in Render dashboard)
- Vercel logs (in Vercel dashboard)

## 🎉 You're Done!

Your AccessLearn AI app is now live on the internet! Share your URL with others to try it out.

**Your live app**: https://your-app-name.vercel.app