import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome! Manage your lecture materials and access AI-powered accessibility tools.
        </p>
      </div>
      
      <div className="grid gap-8">
        <UploadSection />
        
        {/* Placeholder for Materials List */}
        <div className="bg-gray-50 rounded-xl p-12 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 font-medium">Your uploaded materials will appear here.</p>
          <p className="text-gray-400 text-sm">Upload your first document to get started.</p>
        </div>
      </div>
    </div>
  )
}
