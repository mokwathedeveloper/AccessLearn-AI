import { signup } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100-64px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join AccessLearn AI to make your education more accessible
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={signup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                className="bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-slate-50/50 focus:bg-white transition-colors"
              />
              <p className="text-xs text-muted-foreground pt-1">
                Must be at least 8 characters long
              </p>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Sign Up
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground px-8 leading-relaxed">
            By clicking sign up, you agree to our{' '}
            <Link href="#" className="underline hover:text-primary">Terms of Service</Link>{' '}
            and{' '}
            <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground pb-8">
          <span>Already have an account?</span>
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline underline-offset-4">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}