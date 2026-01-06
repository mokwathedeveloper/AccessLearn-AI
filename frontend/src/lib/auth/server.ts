import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { redirect } from 'next/navigation'

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

export async function requireRole(requiredRole: UserRole) {
  const role = await getUserRole()

  if (!role) {
    redirect('/auth/sign-in')
  }

  if (role !== requiredRole) {
    // If user is logged in but doesn't have the right role, redirect to a safe page or 403
    // For now, redirect to root or a specific error page
    redirect('/')
  }

  return role
}
