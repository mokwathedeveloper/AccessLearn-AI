'use client'

import React, { useState } from 'react'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    // Placeholder for actual upload logic to Supabase
    console.log('Uploading file:', file.name)
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setUploading(false)
    setFile(null)
    alert('This is a placeholder. Supabase storage integration is coming in the next task!')
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
          {uploading ? 'Processing...' : 'Start Conversion'}
        </Button>
      </CardContent>
    </Card>
  )
}
