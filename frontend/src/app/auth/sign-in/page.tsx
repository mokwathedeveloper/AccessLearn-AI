import { login } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const isSignupSuccess = params.message === 'signup-success'

  return (
    <TooltipProvider>
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)] bg-slate-50/50 px-4">
        <div className="absolute top-8 left-8">
           <Tooltip>
              <TooltipTrigger asChild>
                 <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-200">
                    <Link href="/">
                       <ArrowLeft className="w-4 h-4 text-slate-500" />
                    </Link>
                 </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Exit to Home</TooltipContent>
           </Tooltip>
        </div>

        <Card className="w-full max-w-sm shadow-[0_20px_60px_-10px_rgba(0,0,0,0.05)] border-slate-200 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="space-y-1 text-center pt-10">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">Welcome Back</CardTitle>
            <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Resume Your Learning Flow
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-8 pt-4">
            {isSignupSuccess && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 mb-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-semibold leading-tight">
                  Account created successfully! Please sign in to continue.
                </p>
              </div>
            )}
            <form action={login} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="name@university.edu" 
                    required 
                    className="h-11 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-sm font-medium transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                    <Link href="#" className="text-[9px] font-black uppercase text-primary hover:underline">Forgot?</Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="h-11 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                Access Library
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 pb-10 bg-slate-50/50 p-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 font-medium">New to AccessLearn?</p>
            <Button variant="outline" className="w-full h-11 rounded-xl text-xs font-bold bg-white border-slate-200" asChild>
               <Link href="/auth/sign-up">Create New Account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}
