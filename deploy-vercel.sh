#!/bin/bash

# 🚀 AccessLearn AI - Monorepo Deployment Fixer (MASTER VERSION - Project Explicit)
# This script ensures Vercel ignores ALL old caches and deploys to the CORRECT project.

PROJECT_NAME="access-learn-ai"

echo "🧹 Cleaning local environment..."
rm -rf frontend/.next
rm -rf .vercel
rm -rf frontend/.vercel

echo "📂 Entering frontend directory..."
cd frontend || exit 1

echo "⚙️ Forcing Vercel Link to $PROJECT_NAME..."
# We explicitly link to the specific project name
vercel link --yes --project $PROJECT_NAME

echo "🌐 Deploying to Production with NO CACHE..."
# --force ensures Vercel ignores previous build caches
vercel deploy --prod --yes --force \
  -e NEXT_PUBLIC_SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTc3MDAsImV4cCI6MjA4MzI3MzcwMH0.oE8ZDRkzyfAwvFFqP1OQsbGcr--QbTdTzPPUDJ-696I" \
  -e NEXT_PUBLIC_APP_URL="https://access-learn-ai.vercel.app" \
  -e NEXT_PUBLIC_BACKEND_URL="https://access-learn-ai.vercel.app" \
  -e SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
  -e SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY5NzcwMCwiZXhwIjoyMDgzMjczNzAwfQ.2htgeYyX7vrMj2G0balE0Mvocg5nsLOkoPVkFcPtHGc" \
  -e DEEPSEEK_API_KEY="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"

echo "🎉 Master Deployment Completed!"
echo "📍 Verify changes at: https://access-learn-ai-moracios-projects.vercel.app"