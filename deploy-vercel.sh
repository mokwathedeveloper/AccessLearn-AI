#!/bin/bash

# 🚀 AccessLearn AI - Master Vercel Deployer
# This script configures and deploys the entire monorepo to Vercel correctly.

echo "🔍 Validating project structure..."

if [ ! -d "frontend" ]; then
  echo "❌ Error: frontend directory not found. Please run this from the project root."
  exit 1
fi

echo "🧹 Cleaning up old configurations..."
rm -f frontend/vercel.json

echo "📝 Creating Master vercel.json in root..."
cat > vercel.json << 'EOF'
{
  "version": 2,
  "buildCommand": "npm run build --prefix frontend",
  "outputDirectory": "frontend/.next",
  "installCommand": "npm install --prefix frontend",
  "framework": "nextjs"
}
EOF

echo "🌐 Deploying to Vercel with Master Credentials..."

# We use 'vercel link' first if needed, but 'vercel' will prompt if not linked.
# We pass --prod to deploy to production.
# We set all environment variables explicitly to ensure the backend API routes work.

vercel deploy --prod --yes \
  -e NEXT_PUBLIC_SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTc3MDAsImV4cCI6MjA4MzI3MzcwMH0.oE8ZDRkzyfAwvFFqP1OQsbGcr--QbTdTzPPUDJ-696I" \
  -e NEXT_PUBLIC_APP_URL="https://frontend-moracios-projects.vercel.app" \
  -e SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY5NzcwMCwiZXhwIjoyMDgzMjczNzAwfQ.2htgeYyX7vrMj2G0balE0Mvocg5nsLOkoPVkFcPtHGc" \
  -e DEEPSEEK_API_KEY="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"

echo "🎉 Master Deployment Triggered!"
echo "📍 Note: Check the Vercel dashboard for the final production URL."
