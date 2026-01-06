import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav'
import { Sparkles } from 'lucide-react'
import { getUserRole } from '@/lib/auth/server'

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = user ? await getUserRole() : null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="hidden font-black text-2xl tracking-tighter text-foreground sm:inline-block">
              AccessLearn <span className="text-primary">AI</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            )}
            {role === 'admin' && (
              <Link
                href="/admin"
                className="text-sm font-semibold text-primary transition-colors hover:opacity-80"
              >
                Admin Console
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserNav email={user.email!} role={role || 'student'} />
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="font-semibold" asChild>
                <Link href="/auth/sign-in">Log in</Link>
              </Button>
              <Button className="rounded-full px-6 font-bold shadow-lg shadow-primary/10" asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}