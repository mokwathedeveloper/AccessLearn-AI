#!/bin/bash

# AccessLearn AI - Vercel Setup Script
echo "🚀 Welcome to AccessLearn AI Vercel Setup!"
echo "This will configure everything to run on Vercel."
echo ""

# Function to read input with default value
read_with_default() {
    local prompt="$1"
    local default="$2"
    local value
    
    if [ -n "$default" ]; then
        read -p "$prompt [$default]: " value
        echo "${value:-$default}"
    else
        read -p "$prompt: " value
        echo "$value"
    fi
}

echo "📋 Let's collect your configuration values..."
echo ""

# Collect Supabase info
echo "🗄️  SUPABASE CONFIGURATION"
echo "Go to your Supabase project → Settings → API"
SUPABASE_URL=$(read_with_default "Enter your Supabase Project URL" "https://your-project.supabase.co")
SUPABASE_ANON_KEY=$(read_with_default "Enter your Supabase Anon Key" "")
SUPABASE_SERVICE_KEY=$(read_with_default "Enter your Supabase Service Role Key" "")

echo ""
echo "🤖 AI CONFIGURATION"
GEMINI_API_KEY=$(read_with_default "Enter your Google Gemini API Key" "")

echo ""
echo "🌐 VERCEL DEPLOYMENT"
APP_URL=$(read_with_default "Enter your Vercel app URL (or leave default for now)" "https://your-app-name.vercel.app")

echo ""
echo "📝 Creating configuration files..."

# Create frontend .env.local (everything runs here now)
cat > frontend/.env.local << EOF
# Supabase Configuration (Client-side)
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

# Backend API Configuration (same as frontend on Vercel)
NEXT_PUBLIC_BACKEND_URL=$APP_URL

# Application Configuration
NEXT_PUBLIC_APP_URL=$APP_URL

# Server-side environment variables (for API routes)
SUPABASE_URL=$SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY
GOOGLE_GENAI_API_KEY=$GEMINI_API_KEY
EOF

echo "✅ Configuration files created!"
echo ""
echo "📁 Files created:"
echo "  - frontend/.env.local (contains everything)"
echo ""
echo "🚀 Next steps:"
echo "1. Install dependencies:"
echo "   cd frontend && npm install"
echo ""
echo "2. Test locally:"
echo "   npm run dev"
echo "   Open http://localhost:3000"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repo"
echo "   - Set root directory to 'frontend'"
echo "   - Add all environment variables from .env.local"
echo "   - Deploy!"
echo ""
echo "📖 See VERCEL-DEPLOY.md for detailed instructions"