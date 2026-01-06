# 🔧 AccessLearn AI - Troubleshooting Guide

## 🚨 Common Problems & Solutions

### 1. "Command not found: npm" or "Command not found: node"

**Problem**: Node.js is not installed or not in PATH

**Solution**:
1. Go to [nodejs.org](https://nodejs.org)
2. Download and install Node.js (version 20+)
3. Restart your terminal
4. Test: `node --version` should show version number

### 2. "Cannot connect to Supabase" or Database errors

**Problem**: Wrong Supabase configuration

**Solution**:
1. Go to your Supabase project
2. Go to Settings → API
3. Copy the exact URLs and keys
4. Make sure there are no extra spaces
5. Check that you ran the SQL commands to create tables

### 3. "AI features not working" or "Gemini API error"

**Problem**: Wrong or missing Google Gemini API key

**Solution**:
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Make sure you're signed in
3. Create a new API key
4. Copy the exact key (starts with "AIza...")
5. Update your .env files

### 4. "CORS error" or "Network error"

**Problem**: Frontend can't connect to backend

**Solution**:
1. Make sure backend is running on port 3001
2. Make sure frontend is running on port 3000
3. Check that FRONTEND_URL in backend/.env matches your frontend URL
4. Restart both servers

### 5. "Module not found" or "Package not found"

**Problem**: Dependencies not installed

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 6. "Port already in use"

**Problem**: Another app is using the same port

**Solution**:
```bash
# Kill processes on port 3000 or 3001
npx kill-port 3000
npx kill-port 3001

# Or use different ports in your .env files
```

### 7. "Build failed" during deployment

**Problem**: Code has errors or wrong configuration

**Solution**:
1. Test locally first: `npm run build`
2. Fix any TypeScript errors
3. Make sure all environment variables are set in deployment platform
4. Check deployment logs for specific errors

### 8. "Authentication not working"

**Problem**: Supabase auth configuration

**Solution**:
1. Go to Supabase → Authentication → Settings
2. Make sure "Enable email confirmations" is OFF for testing
3. Add your domain to "Site URL" if deployed
4. Check that auth policies are set correctly

### 9. "File upload not working"

**Problem**: Storage bucket not configured

**Solution**:
1. Go to Supabase → Storage
2. Make sure "materials" bucket exists
3. Make sure bucket is public
4. Check storage policies

### 10. "Page not found" or "404 errors"

**Problem**: Routing issues

**Solution**:
1. Make sure you're using the correct URLs
2. Check that all pages exist in the frontend/src/app folder
3. Clear browser cache
4. Try hard refresh (Ctrl+F5)

## 🔍 How to Debug

### 1. Check Browser Console
1. Open your browser
2. Press F12 (or right-click → Inspect)
3. Go to "Console" tab
4. Look for red error messages

### 2. Check Terminal Output
- Look for error messages in the terminal where you started the servers
- Red text usually indicates errors

### 3. Check Network Tab
1. In browser dev tools (F12)
2. Go to "Network" tab
3. Try the action that's not working
4. Look for failed requests (red status codes)

### 4. Check Environment Variables
```bash
# In backend folder
cat .env

# In frontend folder
cat .env.local
```

Make sure all values are filled in correctly.

## 📞 Still Need Help?

1. **Check the error message carefully** - it usually tells you what's wrong
2. **Google the exact error message** - others have likely had the same issue
3. **Check the documentation** for the specific service (Supabase, Vercel, etc.)
4. **Try the setup again** from the beginning with fresh accounts

## 💡 Prevention Tips

1. **Double-check all URLs and keys** when copying them
2. **Don't include extra spaces** in environment variables
3. **Use the exact commands** shown in the guides
4. **Test locally first** before deploying
5. **Keep your API keys secure** - never share them publicly

Remember: Every developer faces these issues when starting out. Don't give up! 🚀