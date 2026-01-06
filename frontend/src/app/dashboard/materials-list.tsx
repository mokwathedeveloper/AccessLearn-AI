import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Headphones, FileJson, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export async function MaterialsList() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: materials, error } = await supabase
    .from('materials')
    .select('*')
    .eq('uploaded_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error loading materials. Please try again later.
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-12 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">Your uploaded materials will appear here.</p>
        <p className="text-gray-400 text-sm">Upload your first document to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Materials</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <Card key={material.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <FileText className="w-8 h-8 text-blue-500" />
                <StatusBadge status={material.status} />
              </div>
              <CardTitle className="text-lg mt-2 truncate" title={material.title}>
                {material.title}
              </CardTitle>
              <CardDescription className="text-xs">
                Uploaded on {new Date(material.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                {material.audio_url && (
                  <div title="Audio available" className="flex items-center text-green-600">
                    <Headphones className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Audio</span>
                  </div>
                )}
                {material.summary && (
                  <div title="Summary available" className="flex items-center text-purple-600">
                    <FileJson className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">AI Insights</span>
                  </div>
                )}
              </div>
              <Link 
                href={`/dashboard/material/${material.id}`}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full mt-4"
              >
                View Content
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="success">
          <CheckCircle className="w-3 h-3 mr-1" />
          Ready
        </Badge>
      )
    case 'processing':
      return (
        <Badge variant="processing">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Processing
        </Badge>
      )
    case 'failed':
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Failed
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
  }
}
