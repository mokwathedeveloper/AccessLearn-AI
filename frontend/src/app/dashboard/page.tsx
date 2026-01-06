import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! Manage your lecture materials and access AI-powered accessibility tools.
        </p>
      </div>
      
      <div className="grid gap-12">
        <section>
          <UploadSection />
        </section>
        
        <section>
          <Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          }>
            <MaterialsList />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
