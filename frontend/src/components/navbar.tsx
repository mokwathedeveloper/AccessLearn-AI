import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav'
import { Sparkles, LayoutDashboard, ShieldCheck } from 'lucide-react'
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
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl transition-all duration-300">
        <div className="container flex h-14 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-all group-hover:rotate-3 shadow-lg shadow-primary/20">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground sm:inline-block">
                AccessLearn <span className="text-primary font-black">AI</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {user && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4.5 h-4.5 text-slate-500 hover:text-primary transition-colors" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] font-bold">Dashboard</TooltipContent>
                </Tooltip>
              )}
              {role === 'admin' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" asChild>
                      <Link href="/admin">
                        <ShieldCheck className="w-4.5 h-4.5 text-slate-500 hover:text-primary transition-colors" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] font-bold">Admin Hub</TooltipContent>
                </Tooltip>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <UserNav email={user.email!} role={role || 'student'} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="font-semibold text-xs px-4" asChild>
                  <Link href="/auth/sign-in text-slate-600">Sign In</Link>
                </Button>
                <Button size="sm" className="rounded-full px-5 text-xs font-bold shadow-md shadow-primary/10" asChild>
                  <Link href="/auth/sign-up">Join Platform</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}