'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { type UserRole } from './server'

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setRole(null)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setRole(data.role as UserRole)
      }
      setLoading(false)
    }

    fetchRole()
  }, [])

  return { role, loading }
}
