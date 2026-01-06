import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav'
import { Sparkles, LayoutDashboard, ShieldCheck, LogIn, UserPlus } from 'lucide-react'
import { getUserRole } from '@/lib/auth/server'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = user ? await getUserRole() : null

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-2xl">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-2xl shadow-primary/30">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-foreground leading-none">
                  AccessLearn <span className="text-primary">AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">v2.0 Master</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-4">
              {user && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-primary/10 transition-all" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-6 h-6 text-slate-600" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Dashboard</TooltipContent>
                </Tooltip>
              )}
              {role === 'admin' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-primary/10 transition-all" asChild>
                      <Link href="/admin">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Admin Console</TooltipContent>
                </Tooltip>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <UserNav email={user.email!} role={role || 'student'} />
            ) : (
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl" asChild>
                      <Link href="/auth/sign-in">
                        <LogIn className="w-6 h-6 text-slate-600" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Sign In</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="h-12 w-12 rounded-2xl shadow-xl shadow-primary/20" asChild>
                      <Link href="/auth/sign-up">
                        <UserPlus className="w-6 h-6" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create Account</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
