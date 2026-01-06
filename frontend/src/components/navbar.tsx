import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from './user-nav' // We'll create this for the dropdown

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-blue-600">AccessLearn AI</span>
          </Link>
          {user && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <UserNav email={user.email!} />
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-in">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
