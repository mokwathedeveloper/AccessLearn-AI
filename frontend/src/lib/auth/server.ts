import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export type UserRole = 'student' | 'admin' | null

export const getUserRole = cache(async (): Promise<UserRole> => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: userProfile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !userProfile) {
    // Fallback or error handling
    console.error('Error fetching user role:', error)
    return null
  }

  return userProfile.role as UserRole
})
