import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card } from '@/components/ui/card'
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
      <div className="min-h-screen bg-slate-50/20 pb-32">
        {/* Master Focused Header */}
        <div className="border-b bg-white/80 sticky top-14 z-40 backdrop-blur-xl">
           <div className="wide-container h-16 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <Tooltip>
                    <TooltipTrigger asChild>
                       <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl hover:bg-slate-50 border border-slate-200 shadow-sm">
                         <Link href="/dashboard">
                           <LayoutGrid className="w-5 h-5 text-primary" />
                         </Link>
                       </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Library</TooltipContent>
                 </Tooltip>
                 
                 <div className="hidden md:block space-y-0.5">
                    <div className="flex items-center gap-2 text-primary">
                       <BookOpen className="w-3.5 h-3.5" />
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Source Reading</span>
                    </div>
                    <h2 className="text-sm font-black text-slate-900 truncate max-w-[300px] lg:max-w-xl">{material.title}</h2>
                 </div>
              </div>

              <div className="flex items-center gap-2">
                 <ReaderAction icon={<Share2 className="w-4 h-4" />} label="Share Link" />
                 <ReaderAction icon={<Download className="w-4 h-4" />} label="Export" />
                 <ReaderAction icon={<Printer className="w-4 h-4" />} label="Print" />
                 <div className="hidden sm:flex ml-4 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    {material.status}
                 </div>
              </div>
           </div>
        </div>

        <div className="wide-container py-12">
          <div className="grid gap-12 xl:grid-cols-[1fr_360px]">
            <div className="space-y-12">
              {/* Premium Player Block */}
              {audioUrl ? (
                <section className="space-y-6">
                  <div className="flex items-center justify-between px-1">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                           <FileAudio className="w-4 h-4" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Audio Experience</h2>
                     </div>
                     <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <Card className="border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-slate-950 text-white rounded-[2.5rem] overflow-hidden p-10 lg:p-16">
                     <AudioPlayer src={audioUrl} />
                  </Card>
                </section>
              ) : (
                 <div className="p-20 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                    <Loader2 className="w-12 h-12 text-primary/30 animate-spin" />
                    <div className="space-y-1">
                       <p className="font-black text-slate-900 text-xl tracking-tight uppercase">Neural Processing...</p>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Synthesizing high-fidelity audio stream.</p>
                    </div>
                 </div>
              )}

              {/* High-End Content Viewer */}
              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-14 w-fit justify-start gap-2 mb-10 shadow-inner">
                  <TabsTrigger value="simplified" className="rounded-xl px-10 h-full font-black uppercase text-[10px] tracking-[0.15em] data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all">
                    Simplified View
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="rounded-xl px-10 h-full font-black uppercase text-[10px] tracking-[0.15em] data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all">
                    Key Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="simplified" className="focus-visible:ring-0">
                  <Card className="bg-white border border-slate-200/60 shadow-2xl rounded-[2.5rem] p-10 lg:p-20 min-h-[600px]">
                    <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:text-xl prose-p:leading-[1.8] prose-p:font-medium">
                      {material.simplified_content ? (
                        <p className="whitespace-pre-wrap">
                          {material.simplified_content}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6 opacity-20">
                           <Sparkles className="w-16 h-16" />
                           <p className="text-xs font-black uppercase tracking-[0.3em]">AI weight adaptation in progress</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary" className="focus-visible:ring-0">
                  <Card className="bg-white border border-slate-200/60 shadow-2xl rounded-[2.5rem] p-10 lg:p-20 min-h-[600px]">
                    <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:text-xl prose-p:leading-[1.8] prose-p:font-medium">
                      {material.summary ? (
                        <div className="border-l-[6px] border-primary/20 pl-12 italic">
                           <p className="whitespace-pre-wrap">{material.summary}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6 opacity-20">
                           <Sparkles className="w-16 h-16" />
                           <p className="text-xs font-black uppercase tracking-[0.3em]">Extracting high-level concepts</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Smart Reading Aside */}
            <aside className="space-y-8">
               <div className="bg-primary rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-48 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  <div className="space-y-2 relative z-10">
                     <h3 className="font-black text-2xl tracking-tighter uppercase leading-none">Focus <br/> Engine.</h3>
                     <p className="text-white/60 text-sm font-medium">Personalize your reading flow.</p>
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div className="flex justify-between items-center pb-5 border-b border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Font Size</span>
                        <div className="flex gap-2">
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs">A-</Button>
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg font-black text-xs">A+</Button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Reset Reader</span>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 rounded-lg">
                           <RefreshCw className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
                  <Button variant="secondary" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-white text-primary hover:bg-slate-50 transition-all shadow-xl">
                     Save Profile
                  </Button>
               </div>

               <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-sm space-y-8">
                  <div className="space-y-1">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Source</h3>
                     <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                        <span className="text-sm font-black text-slate-900">DeepSeek V3 High-Memory</span>
                     </div>
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Asset Sync</h3>
                     <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-300" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{new Date(material.created_at).toLocaleDateString()}</span>
                     </div>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function ReaderAction({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white border-transparent hover:border-slate-200 border transition-all text-slate-500">
               {icon}
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-black tracking-tight">{label}</TooltipContent>
      </Tooltip>
   )
}