'use client'

import React, { useState } from 'react'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Sparkles, Zap, ShieldCheck, Fingerprint, Cpu } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { getBackendUrl } from '@/lib/config'

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Authentication required for upload.')

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // 1. Upload to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('lecture-materials')
        .upload(filePath, file)

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`)
      }

      // 2. Register in Database
      const { data: materialRecord, error: dbError } = await supabase
        .from('materials')
        .insert({
          title: file.name,
          file_url: uploadData.path,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
          status: 'pending'
        })
        .select()
        .single()

      if (dbError) throw new Error(`Database registration failed: ${dbError.message}`)

      // 3. Trigger AI Processing via Backend
      const backendUrl = getBackendUrl()
      
      // We don't await the process trigger to allow the UI to refresh immediately,
      // but we log any failure to reach the backend.
      fetch(`${backendUrl}/materials/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialId: materialRecord.id }),
      }).then(res => {
        if (!res.ok) console.error('Backend trigger returned error status:', res.status)
      }).catch(err => {
        console.error('Failed to reach AI Processing Backend:', err)
      })

      setFile(null)
      router.refresh()
    } catch (error) {
      console.error('Upload system failure:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown system error'
      alert(`SYSTEM ERROR: ${errorMessage}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <TooltipProvider>
      <Card className="glass-card w-full border-none shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden group">
        <div className="bg-primary p-6 flex items-center justify-between px-12">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">AI Core v3</span>
                 <span className="text-xs font-bold text-white tracking-tight">Neural Processing Unit Ready</span>
              </div>
           </div>
           <Fingerprint className="w-6 h-6 text-white/30" />
        </div>
        <CardContent className="p-12 space-y-12">
          <FileUpload 
            onFileSelect={setFile} 
            loading={uploading}
          />
          
          <div className="flex items-center justify-center">
             <Tooltip>
                <TooltipTrigger asChild>
                   <Button 
                     className="h-24 w-24 rounded-[2rem] shadow-2xl shadow-primary/40 active:scale-90 transition-all p-0" 
                     disabled={!file || uploading}
                     onClick={handleUpload}
                     aria-label={uploading ? "Neural processing in progress" : "Initialize AI Transformation for selected file"}
                   >
                     {uploading ? (
                        <Cpu className="w-10 h-10 animate-spin fill-current" aria-hidden="true" />
                     ) : (
                        <Zap className="w-10 h-10 fill-current" aria-hidden="true" />
                     )}
                   </Button>
                </TooltipTrigger>
                <TooltipContent className="font-black uppercase tracking-widest text-[10px] py-2 px-4">Initialize AI Transformation</TooltipContent>
             </Tooltip>
          </div>

          <div className="flex items-center justify-center gap-12 pt-4">
             <HelperItem icon={<Sparkles className="w-4 h-4" />} label="Smart Summary" />
             <div className="w-1 h-1 rounded-full bg-slate-200" />
             <HelperItem icon={<Cpu className="w-4 h-4" />} label="Deep Logic" />
             <div className="w-1 h-1 rounded-full bg-slate-200" />
             <HelperItem icon={<ShieldCheck className="w-4 h-4" />} label="AES-256" />
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

function HelperItem({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <div className="flex flex-col items-center gap-3">
         <div className="text-slate-300">{icon}</div>
         <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{label}</span>
      </div>
   )
}
