#!/bin/bash

echo "🔧 Updating environment variables with actual Vercel URL..."

cd frontend

# Your actual Render Backend URL
BACKEND_URL="https://accesslearn-ai-backend.onrender.com"

echo "Adding environment variables..."

# Add/update environment variables
echo "$BACKEND_URL" | vercel env add NEXT_PUBLIC_BACKEND_URL production
echo "$VERCEL_URL" | vercel env add NEXT_PUBLIC_APP_URL production

echo "✅ Environment variables updated!"
echo "🚀 Redeploying with updated URLs..."

# Redeploy with updated environment variables
vercel --prod --yes

echo "✅ Deployment complete with updated URLs!"
echo "🌐 Your app: $VERCEL_URL"