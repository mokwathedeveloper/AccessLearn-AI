export const config = {
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
}

export const getBackendUrl = () => {
  // In production, we should prioritize the environment variable
  // If not set, we might want to log a warning
  if (!process.env.NEXT_PUBLIC_BACKEND_URL && process.env.NODE_ENV === 'production') {
    console.warn('NEXT_PUBLIC_BACKEND_URL is not defined in production environment')
  }
  return config.backendUrl
}
