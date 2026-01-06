import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'
import { 
  FileAudio, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Download, 
  Share2, 
  Loader2, 
  Printer, 
  RefreshCw, 
  LayoutGrid
} from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: material, error } = await supabase
    .from('materials')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !material) {
    notFound()
  }

  let audioUrl = null
  if (material.audio_url) {
    const { data } = await supabase.storage
      .from('lecture-materials')
      .createSignedUrl(material.audio_url, 3600)
    audioUrl = data?.signedUrl
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/30 pb-32">
        {/* Master Controlled Header */}
        <div className="border-b bg-white/80 sticky top-14 z-40 backdrop-blur-xl">
           <div className="wide-grid h-14 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <Tooltip>
                    <TooltipTrigger asChild>
                       <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-lg hover:bg-slate-50 border border-slate-200 shadow-sm">
                         <Link href="/dashboard">
                           <LayoutGrid className="w-4 h-4 text-primary" />
                         </Link>
                       </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[10px] font-bold">Exit to Library</TooltipContent>
                 </Tooltip>
                 
                 <div className="hidden md:block">
                    <h2 className="text-xs font-black text-slate-900 truncate max-w-sm uppercase tracking-tight">{material.title}</h2>
                 </div>
              </div>

              <div className="flex items-center gap-2">
                 <ReaderAction icon={<Share2 className="w-3.5 h-3.5" />} label="Share Link" />
                 <ReaderAction icon={<Download className="w-3.5 h-3.5" />} label="Export Data" />
                 <ReaderAction icon={<Printer className="w-3.5 h-3.5" />} label="Print View" />
                 <div className="hidden sm:flex ml-4 px-3 py-1 rounded-md bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest">
                    {material.status}
                 </div>
              </div>
           </div>
        </div>

        <div className="wide-grid py-12">
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
                    <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:text-lg prose-p:leading-[1.8] prose-p:font-medium">
                      {material.simplified_content ? (
                        <p className="whitespace-pre-wrap">{material.simplified_content}</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
                           <Sparkles className="w-12 h-12" />
                           <p className="text-[9px] font-black uppercase tracking-[0.3em]">AI mapping complete... rendering</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary" className="focus-visible:ring-0">
                  <Card className="bg-white border border-slate-200/60 shadow-2xl rounded-2xl p-10 lg:p-16 min-h-[500px]">
                    <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:text-lg prose-p:leading-[1.8] prose-p:font-medium">
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
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs">A-</Button>
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs">A+</Button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Sync</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg">
                           <RefreshCw className="w-3.5 h-3.5" />
                        </Button>
                     </div>
                  </div>
                  <Button variant="secondary" className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] bg-white text-primary hover:bg-slate-50 transition-all shadow-xl">
                     Update Reader
                  </Button>
               </div>

               <div className="bg-white rounded-2xl border border-slate-200/60 p-10 shadow-sm space-y-8">
                  <div className="space-y-4">
                     <ReaderMeta label="Source Engine" value="DeepSeek V3 Neural" />
                     <ReaderMeta label="Timestamp" value={new Date(material.created_at).toLocaleDateString()} />
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function ReaderMeta({ label, value }: { label: string, value: string }) {
   return (
      <div className="space-y-1">
         <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</h3>
         <span className="text-xs font-black text-slate-900 tracking-tight">{value}</span>
      </div>
   )
}

function ReaderAction({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white border-transparent hover:border-slate-200 border transition-all text-slate-500">
               {icon}
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-black tracking-tight">{label}</TooltipContent>
      </Tooltip>
   )
}
