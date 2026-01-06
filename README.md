# AccessLearn AI 🎓✨

**Inclusive Education Platform powered by AI.**

AccessLearn AI is an AI-powered accessibility platform designed to help students—especially those with visual, learning, or cognitive disabilities—access and consume academic materials independently.

## 🚀 Key Features

- **📄 Document Conversion**: Upload lecture slides or notes (PDF/TXT).
- **🧠 Smart Summarization**: Get concise summaries of dense academic texts.
- **💡 Content Simplification**: Convert complex academic language into simpler, more readable formats.
- **🎧 Text-to-Speech (TTS)**: Listen to your study materials with AI-generated audio.
- **🎙️ Voice Navigation**: Navigate the dashboard and materials using simple voice commands.
- **🔒 Secure & Personal**: Role-based access control (RBAC) and private document storage using Supabase.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (React 19), Tailwind CSS, shadcn/ui.
- **Backend**: NestJS, TypeScript.
- **Database & Auth**: Supabase (PostgreSQL, RLS, Storage).
- **AI Integration**: Custom services for Summarization and TTS (extensible to Gemini/OpenAI).

## 🏃 Getting Started

### 🔰 New to Development?
**Start here**: [📖 Beginner Setup Guide](./BEGINNER-SETUP.md) - Step-by-step instructions for beginners

**Quick setup**: Run `./setup-config.sh` to configure your environment files interactively

### 🚀 Experienced Developer?

### Prerequisites

- Node.js 20+
- A Supabase Project (Database + Storage + Auth)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mokwathedeveloper/AccessLearn-AI.git
   cd AccessLearn-AI
   ```

2. **Configure Backend**:
   ```bash
   cd backend
   cp .env.example .env
   # Fill in your SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and GOOGLE_GENAI_API_KEY
   npm install
   ```

3. **Configure Frontend**:
   ```bash
   cd ../frontend
   cp .env.example .env.local
   # Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and NEXT_PUBLIC_BACKEND_URL
   npm install
   ```

### Running Locally

- **Start Backend**:
  ```bash
  cd backend
  npm run start:dev
  ```
- **Start Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```

## 🧪 Testing & Quality

- **Backend Tests**: `npm run test` in `/backend`.
- **Linting**: `npm run lint` in both directories.
- **Quality**: Adheres to strict TypeScript and ESLint rules.

## 📄 Documentation

### 🔰 For Beginners
- [📖 Beginner Setup Guide](./BEGINNER-SETUP.md) - Complete step-by-step setup
- [📋 Setup Checklist](./SETUP-CHECKLIST.md) - Track your progress
- [🔧 Troubleshooting Guide](./TROUBLESHOOTING.md) - Fix common issues

### 🚀 For Developers
- [📦 Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [✅ Production Checklist](./PRODUCTION-CHECKLIST.md) - Pre-deployment verification
- [Feature Documentation](./docs) - Detailed technical docs

Detailed documentation for each feature can be found in the [`/docs`](./docs) folder.

## 🏆 Hackathon Details

Built for **EduInnovate Hackathon 2026**.
- **Goal**: Inclusive, accessible, and independent learning.
- **Role**: Full-stack AI application.
