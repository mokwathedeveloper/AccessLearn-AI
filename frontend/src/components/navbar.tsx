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
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="app-container flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">
                AccessLearn <span className="text-slate-400">AI</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {user && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4 text-slate-500 hover:text-primary transition-colors" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] font-bold">Dashboard</TooltipContent>
                </Tooltip>
              )}
              {role === 'admin' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" asChild>
                      <Link href="/admin">
                        <ShieldCheck className="w-4 h-4 text-slate-500 hover:text-primary transition-colors" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] font-bold">Admin</TooltipContent>
                </Tooltip>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <UserNav email={user.email!} role={role || 'student'} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" className="h-8 text-xs font-bold rounded-md px-4" asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
