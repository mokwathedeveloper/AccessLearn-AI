'use client'

import React, { useState } from 'react'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    const supabase = createClient()

    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Unauthorized')

      // 2. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('lecture-materials')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 3. Insert into materials table
      const { error: dbError } = await supabase
        .from('materials')
        .insert({
          title: file.name,
          file_url: uploadData.path,
          file_type: file.type,
          uploaded_by: user.id,
          status: 'pending'
        })

      if (dbError) throw dbError

      setFile(null)
      router.refresh() // Refresh the page to show new materials in the list (once implemented)
      alert('File uploaded successfully! Processing will begin shortly.')
    } catch (error: any) {
      console.error('Upload failed:', error)
      alert(`Upload failed: ${error.message || 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Lecture Material</CardTitle>
        <CardDescription>
          Upload your lecture slides or notes (PDF/TXT) to convert them into accessible formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUpload 
          onFileSelect={setFile} 
          loading={uploading}
        />
        <Button 
          className="w-full" 
          disabled={!file || uploading}
          onClick={handleUpload}
        >
          {uploading ? 'Uploading...' : 'Start Conversion'}
        </Button>
      </CardContent>
    </Card>
  )
}
