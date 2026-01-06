'use client'

import React, { useState } from 'react'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Sparkles, Zap, ShieldCheck } from 'lucide-react'

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
      if (!user) throw new Error('Unauthorized')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('lecture-materials')
        .upload(filePath, file)

      if (uploadError) throw uploadError

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

      // Trigger AI Processing
      const materialData = await supabase
        .from('materials')
        .select('id')
        .eq('file_url', uploadData.path)
        .single()
      
      if (materialData.data) {
        fetch('/api/materials/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ materialId: materialData.data.id }),
        }).catch(err => console.error('Failed to trigger processing:', err))
      }

      setFile(null)
      router.refresh()
    } catch (error) {
      console.error('Upload failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Upload failed: ${errorMessage}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="w-full bg-white border-none shadow-2xl rounded-[2rem] overflow-hidden group">
      <div className="bg-primary/5 p-4 border-b border-primary/10 flex items-center justify-between px-8">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Secure Channel Ready</span>
         </div>
         <ShieldCheck className="w-4 h-4 text-primary/40" />
      </div>
      <CardContent className="p-10 space-y-8">
        <FileUpload 
          onFileSelect={setFile} 
          loading={uploading}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
           <Button 
             className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 group" 
             disabled={!file || uploading}
             onClick={handleUpload}
           >
             {uploading ? (
               <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 animate-bounce fill-current" /> Initializing AI...
               </span>
             ) : (
               <span className="flex items-center gap-2">
                  Start AI Transformation <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
               </span>
             )}
           </Button>
           {file && !uploading && (
             <Button variant="ghost" className="h-14 px-8 rounded-2xl font-bold text-slate-400 hover:text-slate-600" onClick={() => setFile(null)}>
                Cancel
             </Button>
           )}
        </div>

        <div className="flex items-center justify-center gap-8 pt-2">
           <HelperIcon icon={<Zap className="w-4 h-4" />} label="Instant Processing" />
           <div className="w-1 h-1 rounded-full bg-slate-200" />
           <HelperIcon icon={<ShieldCheck className="w-4 h-4" />} label="Private & Encrypted" />
        </div>
      </CardContent>
    </Card>
  )
}

function HelperIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
         {icon} {label}
      </div>
   )
}