import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'
import { ArrowLeft, Download, FileText, FileAudio } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch material
  const { data: material, error } = await supabase
    .from('materials')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !material) {
    notFound()
  }

  // Generate public URL for audio if it exists (assuming bucket is private, we need signed URL)
  // For simplicity in this demo, we'll assume we can get a signed URL valid for 1 hour.
  let audioUrl = null
  if (material.audio_url) {
    const { data } = await supabase.storage
      .from('lecture-materials')
      .createSignedUrl(material.audio_url, 3600)
    audioUrl = data?.signedUrl
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <Badge variant="outline" className="text-sm">
          {material.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{material.title}</h1>
        <p className="text-muted-foreground">
          Uploaded on {new Date(material.created_at).toLocaleDateString()}
        </p>
      </div>

      {audioUrl ? (
        <Card className="border-blue-100 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <FileAudio className="w-5 h-5 mr-2" />
              Audio Version
            </CardTitle>
          </CardHeader>
          <CardContent>
             <AudioPlayer src={audioUrl} />
          </CardContent>
        </Card>
      ) : (
         <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
            Audio generation is pending or failed.
         </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Simplified Content
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            {material.simplified_content ? (
              <p className="whitespace-pre-wrap leading-relaxed">{material.simplified_content}</p>
            ) : (
              <p className="text-muted-foreground italic">Simplification not available yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              Key Insights (Summary)
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
             {material.summary ? (
              <p className="whitespace-pre-wrap leading-relaxed">{material.summary}</p>
            ) : (
              <p className="text-muted-foreground italic">Summary not available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
