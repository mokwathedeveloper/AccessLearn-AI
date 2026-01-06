'use client'

import React, { useCallback, useState } from 'react'
import { Upload, File, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  loading?: boolean
}

export function FileUpload({
  onFileSelect,
  accept = '.pdf,.txt',
  maxSize = 10,
  loading = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size exceeds ${maxSize}MB limit.`)
        return
      }

      setError(null)
      setSelectedFile(file)
      onFileSelect(file)
    },
    [maxSize, onFileSelect]
  )

  const clearFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  return (
    <div className="w-full space-y-4">
      {!selectedFile ? (
        <label
          className={cn(
            'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors',
            error ? 'border-red-300' : 'border-gray-300'
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF or TXT (Max {maxSize}MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      ) : (
        <Card className="p-4 flex items-center justify-between border-blue-100 bg-blue-50">
          <div className="flex items-center space-x-3 overflow-hidden">
            <File className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFile}
            disabled={loading}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </Button>
        </Card>
      )}

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Uploading material...</span>
        </div>
      )}
    </div>
  )
}
