#!/bin/bash

echo "🔧 Quick Fix - Add Missing Keys"
echo ""

read -p "Enter your Supabase SERVICE ROLE key: " SERVICE_KEY
read -p "Enter your Google Gemini API key: " GEMINI_KEY

# Add missing variables to .env.local
cat >> frontend/.env.local << EOF

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server-side environment variables (for API routes)
SUPABASE_URL=https://wlzcgkbtmwspcgepkcgq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY
GOOGLE_GENAI_API_KEY=$GEMINI_KEY
EOF

echo ""
echo "✅ Keys added to frontend/.env.local"
echo ""
echo "🧪 Test your setup:"
echo "cd frontend && npm run dev"