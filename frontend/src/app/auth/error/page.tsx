'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl overflow-hidden bg-white">
      <div className="h-2 bg-red-500 w-full" />
      <CardHeader className="space-y-1 text-center pt-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-50 rounded-2xl">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Auth Failure</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8 pt-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm font-medium text-slate-600 leading-relaxed italic text-center">
            {message ? decodeURIComponent(message).replace(/-/g, ' ') : 'An unexpected security error occurred during your session.'}
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full h-12 rounded-xl font-bold transition-all active:scale-[0.98]">
            <Link href="/auth/sign-in">Return to Login</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full h-12 rounded-xl font-bold text-slate-400 hover:text-slate-600">
            <Link href="/auth/sign-up">Try Different Account</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px)] bg-slate-50/50 px-4">
      <Suspense fallback={
        <Card className="w-full max-w-md p-20 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 animate-pulse text-slate-200" />
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  )
}