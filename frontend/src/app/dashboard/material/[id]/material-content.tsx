'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, RefreshCw, FileAudio, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

import { getBackendUrl } from '@/lib/config'

interface Material {
  id: string;
  title: string;
  status: string;
  summary: string | null;
  simplified_content: string | null;
  audio_url: string | null;
  created_at: string;
}

interface MaterialContentProps {
  material: Material;
  audioUrl: string | null;
}

export function MaterialContent({ material: initialMaterial, audioUrl: initialAudioUrl }: MaterialContentProps) {
  const [material, setMaterial] = useState<Material>(initialMaterial)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(initialAudioUrl)
  const [fontSize, setFontSize] = useState(18)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showSyncWarning, setShowSyncWarning] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()

  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.max(12, Math.min(32, prev + delta)))
  }

  const triggerReprocess = async () => {
    setIsSyncing(true)
    setShowSyncWarning(false)
    try {
      const backendUrl = getBackendUrl()
      console.log('[DEBUG] Triggering AI Engine re-sync at:', backendUrl)
      
      const res = await fetch(`${backendUrl}/materials/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialId: material.id }),
      })
      if (res.ok) {
        setMaterial(prev => ({ ...prev, status: 'processing' }))
      } else {
        console.error('Failed to trigger reprocess:', res.status)
        alert('Engine sync failed. Our nodes might be temporarily overloaded.')
      }
    } catch (err) {
      console.error('Error triggering reprocess:', err)
      alert('Connection error. Could not reach the AI Engine.')
    } finally {
      setIsSyncing(false)
    }
  }

  // Handle Real-time updates
  useEffect(() => {
    if (material.status === 'completed') {
      setShowSyncWarning(false)
      return
    }

    // Set a warning timer if it stays in non-completed state for too long
    const warningTimer = setTimeout(() => {
      if (material.status !== 'completed') {
        setShowSyncWarning(true)
      }
    }, 45000)

    const fetchLatest = async () => {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('id', material.id)
        .single()
      
      if (data && !error) {
        setMaterial(data)
        
        if (data.audio_url && !currentAudioUrl) {
          const { data: urlData } = await supabase.storage
            .from('lecture-materials')
            .createSignedUrl(data.audio_url, 3600)
          setCurrentAudioUrl(urlData?.signedUrl || null)
        }
      }
    }

    const channel = supabase
      .channel(`material-sync-${material.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'materials', filter: `id=eq.${material.id}` },
        () => {
          fetchLatest()
          router.refresh()
        }
      )
      .subscribe()

    const interval = setInterval(fetchLatest, 5000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
      clearTimeout(warningTimer)
    }
  }, [material.id, material.status, supabase, currentAudioUrl, router])

  if (material.status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-red-100 shadow-xl space-y-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Neural Processing Failure</h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm font-medium">
            Our AI engine encountered an error while decoding this document. This usually happens with complex layouts or encrypted files.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl h-12 px-8 font-bold border-red-200 text-red-600 hover:bg-red-50" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Sync
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
      <div className="space-y-12">
        {/* High-End Player Module */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
                <FileAudio className="w-4 h-4 text-primary" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Neural Playback</h2>
             </div>
             <Sparkles className={`w-3.5 h-3.5 text-primary ${material.status !== 'completed' ? 'animate-pulse' : ''}`} />
          </div>
          {currentAudioUrl ? (
            <Card className="border-none shadow-2xl bg-slate-950 text-white rounded-2xl overflow-hidden p-10 lg:p-14">
               <AudioPlayer src={currentAudioUrl} />
            </Card>
          ) : material.status === 'completed' ? (
            <div className="p-16 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
               <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <FileAudio className="w-6 h-6" />
               </div>
               <p className="font-bold text-slate-400 text-xs uppercase tracking-widest">Audio Module Inactive</p>
            </div>
          ) : (
             <div className="p-16 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                   <Loader2 className="w-12 h-12 text-primary/30 animate-spin" />
                   <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                   <p className="font-bold text-slate-900 text-sm uppercase tracking-widest opacity-60">
                     {material.status === 'processing' ? 'Neural Mapping in progress...' : 'Synthesizing stream...'}
                   </p>
                   {showSyncWarning && (
                     <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight max-w-xs animate-in fade-in slide-in-from-top-2 duration-700">
                       Wait time is longer than usual. The neural link might be weak.
                     </p>
                   )}
                </div>
                {showSyncWarning && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl font-bold uppercase text-[9px] tracking-widest h-10 px-6 border-red-100 text-red-600 hover:bg-red-50"
                    onClick={triggerReprocess}
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`w-3 h-3 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                    Force Engine Sync
                  </Button>
                )}
             </div>
          )}
        </section>

        {/* Master Content Tabs */}
        <Tabs defaultValue="simplified" className="w-full">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl h-11 w-full md:w-fit justify-start gap-1 mb-10 shadow-inner">
            <TabsTrigger value="simplified" className="rounded-lg px-8 h-full font-bold uppercase text-[9px] tracking-[0.15em] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">
              Adaptive Text
            </TabsTrigger>
            <TabsTrigger value="summary" className="rounded-lg px-8 h-full font-bold uppercase text-[9px] tracking-[0.15em] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">
              Key Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="simplified" className="focus-visible:ring-0">
            <Card className="bg-white border border-slate-200/60 shadow-2xl rounded-2xl p-10 lg:p-16 min-h-[500px]">
              <div 
                className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:font-medium transition-all duration-200"
                style={{ fontSize: `${fontSize}px` }}
              >
                {material.simplified_content ? (
                  <p className="whitespace-pre-wrap">{material.simplified_content}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
                     <Sparkles className="w-12 h-12 animate-pulse" />
                     <p className="text-[9px] font-black uppercase tracking-[0.3em]">AI mapping active... rendering</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="focus-visible:ring-0">
            <Card className="bg-white border border-slate-200/60 shadow-2xl rounded-2xl p-10 lg:p-16 min-h-[500px]">
              <div 
                className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:font-medium transition-all duration-200"
                style={{ fontSize: `${fontSize}px` }}
              >
                {material.summary ? (
                  <div className="border-l-4 border-primary/20 pl-10 italic">
                     <p className="whitespace-pre-wrap">{material.summary}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
                     <Sparkles className="w-12 h-12 animate-pulse" />
                     <p className="text-[9px] font-black uppercase tracking-[0.3em]">Neural summary initializing</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Sidebar */}
      <aside className="space-y-8">
         <div className="bg-primary rounded-2xl p-10 text-white space-y-10 shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-48 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="space-y-1 relative z-10">
               <h3 className="font-extrabold text-2xl tracking-tighter uppercase leading-none">Focus.</h3>
               <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Personalize Flow</p>
            </div>
            <div className="space-y-6 relative z-10">
               <div className="flex justify-between items-center pb-5 border-b border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Scale</span>
                  <div className="flex gap-2">
                     <Button 
                       size="icon" 
                       variant="ghost" 
                       onClick={() => adjustFontSize(-2)}
                       className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs"
                       aria-label="Decrease text size"
                     >
                       A-
                     </Button>
                     <Button 
                       size="icon" 
                       variant="ghost" 
                       onClick={() => adjustFontSize(2)}
                       className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs"
                       aria-label="Increase text size"
                     >
                       A+
                     </Button>
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Engine</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 hover:bg-white/10 rounded-lg" 
                    onClick={triggerReprocess}
                    disabled={isSyncing || material.status === 'completed'}
                  >
                     <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  </Button>
               </div>
            </div>
            <Button variant="secondary" className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] bg-white text-primary hover:bg-slate-50 transition-all shadow-xl" onClick={() => window.print()}>
               Print View
            </Button>
         </div>

         <div className="bg-white rounded-2xl border border-slate-200/60 p-10 shadow-sm space-y-8">
            <div className="space-y-4">
               <div className="space-y-1">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Source Engine</h3>
                  <span className="text-xs font-black text-slate-900 tracking-tight">DeepSeek Neural v3</span>
               </div>
               <div className="space-y-1">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Timestamp</h3>
                  <span className="text-xs font-black text-slate-900 tracking-tight">{new Date(material.created_at).toLocaleDateString()}</span>
               </div>
            </div>
         </div>
      </aside>
    </div>
  )
}
