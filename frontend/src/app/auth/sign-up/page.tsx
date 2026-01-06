'use client'

import { signup } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ShieldCheck, GraduationCap, ArrowLeft } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SignUpPage() {
  const [role, setRole] = useState('student')

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
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">Get Started</CardTitle>
            <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Inclusive Intelligence Hub
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 p-8 pt-4">
            <form action={signup} className="space-y-6">
              <div className="space-y-3">
                <Tabs value={role} onValueChange={setRole} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-10 bg-slate-50 p-1 rounded-lg border border-slate-100">
                    <TabsTrigger value="student" className="rounded-md font-bold text-[10px] uppercase tracking-tighter data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                      <GraduationCap className="w-3.5 h-3.5 mr-2" /> Student
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="rounded-md font-bold text-[10px] uppercase tracking-tighter data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                      <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Admin
                    </TabsTrigger>
                  </TabsList>
                  <input type="hidden" name="role" value={role} />
                </Tabs>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                  <Input 
                    id="full_name" 
                    name="full_name" 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    className="h-11 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-sm font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">University / Institution</Label>
                  <Input 
                    id="institution" 
                    name="institution" 
                    type="text" 
                    placeholder="Global University" 
                    required 
                    className="h-11 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-sm font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="admission_number" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Admission Number</Label>
                  <Input 
                    id="admission_number" 
                    name="admission_number" 
                    type="text" 
                    placeholder="UG/2026/001" 
                    required 
                    className="h-11 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-sm font-medium transition-all"
                  />
                </div>

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
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</Label>
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
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 pb-10 bg-slate-50/50 p-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 font-medium">Already have an account?</p>
            <Button variant="outline" className="w-full h-11 rounded-xl text-xs font-bold bg-white border-slate-200" asChild>
               <Link href="/auth/sign-in">Sign In Instead</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}
