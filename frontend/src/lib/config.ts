export const config = {
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
}

export const getBackendUrl = () => {
  const url = config.backendUrl
  const isLocalhost = url.includes('localhost')
  const isProduction = process.env.NODE_ENV === 'production' || (typeof window !== 'undefined' && window.location.hostname !== 'localhost')
  
  if (typeof window !== 'undefined') {
    if (isLocalhost && isProduction) {
      console.error('[CRITICAL] AI Engine is pointing to LOCALHOST on a PRODUCTION site. Connectivity will fail. Set NEXT_PUBLIC_BACKEND_URL.')
    } else if (process.env.NODE_ENV === 'development') {
      console.log('[CONFIG] AI Engine Link:', url)
    }
  }

  return url
}
