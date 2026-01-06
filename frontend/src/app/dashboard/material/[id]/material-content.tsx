'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, RefreshCw, FileAudio, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'

interface MaterialContentProps {
  material: any
  audioUrl: string | null
}

export function MaterialContent({ material, audioUrl }: MaterialContentProps) {
  const [fontSize, setFontSize] = useState(18) // Default base font size in pixels

  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => Math.max(12, Math.min(32, prev + delta)))
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
             <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          </div>
          {audioUrl ? (
            <Card className="border-none shadow-2xl bg-slate-950 text-white rounded-2xl overflow-hidden p-10 lg:p-14">
               <AudioPlayer src={audioUrl} />
            </Card>
          ) : (
             <div className="p-16 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-10 h-10 text-primary/30 animate-spin" />
                <p className="font-bold text-slate-900 text-sm uppercase tracking-widest opacity-60">Synthesizing stream...</p>
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
                     <Sparkles className="w-12 h-12" />
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
                     <Sparkles className="w-12 h-12" />
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
                     >
                       A-
                     </Button>
                     <Button 
                       size="icon" 
                       variant="ghost" 
                       onClick={() => adjustFontSize(2)}
                       className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs"
                     >
                       A+
                     </Button>
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Sync</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg" onClick={() => window.location.reload()}>
                     <RefreshCw className="w-3.5 h-3.5" />
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
