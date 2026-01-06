#!/bin/bash

# AccessLearn AI - Quick Production Setup Script
echo "🚀 Setting up AccessLearn AI for Production..."

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install

# Build applications
echo "🔨 Building backend..."
cd ../backend && npm run build

echo "🔨 Building frontend..."
cd ../frontend && npm run build

echo "✅ Build completed successfully!"

# Run tests
echo "🧪 Running backend tests..."
cd ../backend && npm test

echo "🧪 Running frontend linting..."
cd ../frontend && npm run lint

echo "✅ All tests passed!"

echo ""
echo "🎉 AccessLearn AI is ready for production deployment!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase project and apply migrations"
echo "2. Get your Google Gemini API key"
echo "3. Deploy backend to Render with environment variables"
echo "4. Deploy frontend to Vercel with environment variables"
echo "5. Update CORS settings with actual domain URLs"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"