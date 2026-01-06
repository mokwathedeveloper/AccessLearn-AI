#!/bin/bash

echo "🚀 Deploying AccessLearn AI to Vercel..."

cd frontend

# Remove the problematic vercel.json temporarily
mv vercel.json vercel.json.bak

# Create a simple vercel.json
cat > vercel.json << 'EOF'
{
  "version": 2
}
EOF

# Deploy with environment variables inline
NEXT_PUBLIC_SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTc3MDAsImV4cCI6MjA4MzI3MzcwMH0.oE8ZDRkzyfAwvFFqP1OQsbGcr--QbTdTzPPUDJ-696I" \
NEXT_PUBLIC_BACKEND_URL="https://frontend-moracios-projects.vercel.app" \
NEXT_PUBLIC_APP_URL="https://frontend-moracios-projects.vercel.app" \
SUPABASE_URL="https://wlzcgkbtmwspcgepkcgq.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsemNna2J0bXdzcGNnZXBrY2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY5NzcwMCwiZXhwIjoyMDgzMjczNzAwfQ.2htgeYyX7vrMj2G0balE0Mvocg5nsLOkoPVkFcPtHGc" \
DEEPSEEK_API_KEY="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" \
vercel --prod --yes

echo "✅ Deployment complete!"