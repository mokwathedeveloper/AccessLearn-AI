'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/auth/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const role = (formData.get('role') as string) || 'student'
  const full_name = formData.get('full_name') as string
  const institution = formData.get('institution') as string
  const admission_number = formData.get('admission_number') as string
  const staff_number = formData.get('staff_number') as string

  if (password !== confirmPassword) {
    redirect('/auth/error?message=passwords-do-not-match')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
      data: {
        role: role,
        full_name: full_name,
        institution: institution,
        admission_number: admission_number,
        staff_number: staff_number,
      },
    },
  })

  if (error) {
    redirect(`/auth/error?message=${encodeURIComponent(error.message)}`)
  }

  // If a session was created (e.g. email confirmation is disabled), 
  // sign out to force manual login as requested by the user.
  if (data?.session) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  redirect('/auth/sign-in?message=signup-success')
}