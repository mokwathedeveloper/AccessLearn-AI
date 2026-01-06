#!/bin/bash

# 🚀 AccessLearn AI - Master Vercel Deployer (Front-end Centric)
# This script deploys from the frontend directory to ensure Vercel recognizes the framework.

echo "🔍 Checking for Vercel CLI..."
if ! command -v vercel &> /dev/null;
    echo "❌ Error: Vercel CLI is not installed. Please run: npm i -g vercel"
    exit 1
fi

echo "📂 Moving to frontend directory..."
cd frontend || exit 1

echo "🌐 Deploying to Vercel Project: access-learn-ai..."

# We deploy from within the frontend folder.
# This forces Vercel to treat this folder as the root of the deployment.

vercel deploy --prod --yes \
  -e NEXT_PUBLIC_SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTc3MDAsImV4cCI6MjA4MzI3MzcwMH0.oE8ZDRkzyfAwvFFqP1OQsbGcr--QbTdTzPPUDJ-696I" \
  -e NEXT_PUBLIC_APP_URL="https://access-learn-ai-moracios-projects.vercel.app" \
  -e NEXT_PUBLIC_BACKEND_URL="https://access-learn-ai-moracios-projects.vercel.app" \
  -e SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY5NzcwMCwiZXhwIjoyMDgzMjczNzAwfQ.2htgeYyX7vrMj2G0balE0Mvocg5nsLOkoPVkFcPtHGc" \
  -e DEEPSEEK_API_KEY="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"

echo "🎉 Master Deployment Complete!"
echo "📍 URL: https://access-learn-ai-moracios-projects.vercel.app"