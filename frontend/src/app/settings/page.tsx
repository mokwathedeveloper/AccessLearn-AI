import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { SettingsForm } from './settings-form'
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/sign-in')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        <div className="wide-grid py-12 lg:py-20 space-y-10">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Button variant="ghost" size="sm" asChild className="mb-4 h-8 rounded-full bg-white shadow-sm border border-slate-200">
                <Link href={profile?.role === 'admin' ? '/admin' : '/dashboard'}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to {profile?.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </Link>
              </Button>
            </div>
          </div>

          <SettingsForm />
        </div>
      </div>
    </TooltipProvider>
  )
}