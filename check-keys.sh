#!/bin/bash

echo "🔍 Checking your environment variables..."
echo ""

# Check current .env.local
if [ -f "frontend/.env.local" ]; then
    echo "📁 Found frontend/.env.local"
    echo ""
    echo "✅ Current values:"
    cat frontend/.env.local
    echo ""
else
    echo "❌ No .env.local file found"
    exit 1
fi

echo "❌ Missing required variables:"
echo ""

# Check for missing variables
if ! grep -q "SUPABASE_SERVICE_ROLE_KEY" frontend/.env.local; then
    echo "- SUPABASE_SERVICE_ROLE_KEY (needed for API routes)"
fi

if ! grep -q "GOOGLE_GENAI_API_KEY" frontend/.env.local; then
    echo "- GOOGLE_GENAI_API_KEY (needed for AI features)"
fi

if ! grep -q "NEXT_PUBLIC_APP_URL" frontend/.env.local; then
    echo "- NEXT_PUBLIC_APP_URL (needed for deployment)"
fi

echo ""
echo "🔧 To fix this:"
echo "1. Go to Supabase → Settings → API → Copy 'service_role' key"
echo "2. Go to Google AI Studio → Get API Key"
echo "3. Run: ./setup-config.sh (to update all keys)"
echo ""
echo "📖 Or see BEGINNER-SETUP.md for detailed instructions"