'use client'

import { signup } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { UserPlus, ShieldCheck, GraduationCap } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'

export default function SignUpPage() {
  const [role, setRole] = useState('student')

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl overflow-hidden bg-white">
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="space-y-1 text-center pt-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900">Create Account</CardTitle>
          <CardDescription className="font-medium">
            Join the future of inclusive education
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form action={signup} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Account Type</Label>
              <Tabs value={role} onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="student" className="rounded-lg font-bold text-xs uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    <GraduationCap className="w-4 h-4 mr-2" /> Student
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="rounded-lg font-bold text-xs uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    <ShieldCheck className="w-4 h-4 mr-2" /> Admin
                  </TabsTrigger>
                </TabsList>
                <input type="hidden" name="role" value={role} />
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@university.edu" 
                required 
                className="h-12 bg-slate-50/50 focus:bg-white rounded-xl border-slate-200 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="h-12 bg-slate-50/50 focus:bg-white rounded-xl border-slate-200 transition-all"
              />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Minimum 8 specialized characters
              </p>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all">
              Initialize Account
            </Button>
          </form>
          
          <div className="text-[10px] text-center text-slate-400 font-bold uppercase leading-relaxed px-6">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline">Terms</Link> &{' '}
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-slate-500 font-medium pb-10">
          <span>Already a member?</span>
          <Link href="/auth/sign-in" className="font-bold text-primary hover:underline underline-offset-4">
            Sign In Here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}