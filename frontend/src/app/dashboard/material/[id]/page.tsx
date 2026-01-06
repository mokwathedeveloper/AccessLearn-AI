import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'
import { ArrowLeft, FileText, FileAudio, Sparkles, BookOpen, Clock, Download, Share2, Loader2, Printer, RefreshCw, MoreVertical, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
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
      <div className="min-h-screen pb-32">
        <div className="container mx-auto p-6 md:p-12 max-w-7xl space-y-16">
          {/* Master Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="h-14 w-14 rounded-full bg-white/50 backdrop-blur-md border border-white hover:bg-white shadow-sm">
                    <Link href="/dashboard">
                      <LayoutGrid className="w-6 h-6 text-primary" />
                    </Link>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Back to Library</TooltipContent>
            </Tooltip>
            
            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/50 shadow-2xl">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                        <Share2 className="w-5 h-5 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share Access</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                        <Download className="w-5 h-5 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export PDF</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                        <Printer className="w-5 h-5 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Print Material</TooltipContent>
               </Tooltip>

               <div className="px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                  {material.status}
               </div>
            </div>
          </div>

          {/* Hero Header */}
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-3 text-primary">
               <BookOpen className="w-6 h-6" />
               <span className="text-sm font-black uppercase tracking-[0.3em]">Knowledge Base</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {material.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-slate-400 text-xs font-black uppercase tracking-widest pt-4">
               <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>Sync: {new Date(material.created_at).toLocaleDateString()}</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
               <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Format: {material.file_type.split('/')[1].toUpperCase()}</span>
               </div>
            </div>
          </div>

          <div className="grid gap-20 lg:grid-cols-[1fr_400px]">
            <div className="space-y-20">
              {/* Audio Block */}
              {audioUrl ? (
                <Card className="glass-card border-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-slate-900 text-white rounded-[3.5rem] overflow-hidden">
                  <CardHeader className="p-12 pb-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                             <FileAudio className="w-8 h-8 text-white" />
                          </div>
                          <div>
                             <CardTitle className="text-2xl font-black tracking-tight uppercase">Neural Voice</CardTitle>
                             <CardDescription className="text-slate-400 text-sm font-bold uppercase tracking-widest">Optimized for Comprehension</CardDescription>
                          </div>
                       </div>
                       <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-12 pt-6">
                     <AudioPlayer src={audioUrl} />
                  </CardContent>
                </Card>
              ) : (
                 <div className="p-20 glass-card rounded-[3.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-8">
                    <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
                    <div className="space-y-2">
                       <p className="font-black text-slate-900 text-2xl tracking-tighter uppercase">Processing Stream...</p>
                       <p className="text-slate-400 text-sm max-w-xs leading-relaxed font-bold uppercase tracking-widest">Neural weights are currently initializing for audio synthesis.</p>
                    </div>
                 </div>
              )}

              {/* Content Tabs */}
              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="bg-slate-100/50 p-2 rounded-[2rem] h-20 w-full md:w-fit justify-start gap-4 mb-12 shadow-sm">
                  <TabsTrigger value="simplified" className="rounded-2xl px-12 h-full font-black uppercase text-xs tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-primary transition-all">
                    Adaptive Text
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="rounded-2xl px-12 h-full font-black uppercase text-xs tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-primary transition-all">
                    Core Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="simplified">
                  <Card className="glass-card border-none shadow-2xl rounded-[3rem] p-16 min-h-[500px]">
                    <div className="prose prose-slate max-w-none">
                      {material.simplified_content ? (
                        <p className="text-slate-700 text-xl leading-[1.6] whitespace-pre-wrap font-medium">
                          {material.simplified_content}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-32 space-y-6 grayscale opacity-20">
                           <Sparkles className="w-16 h-16" />
                           <p className="text-xs font-black uppercase tracking-[0.3em]">Neural Simplification in Progress</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary">
                  <Card className="glass-card border-none shadow-2xl rounded-[3rem] p-16 min-h-[500px]">
                    <div className="prose prose-slate max-w-none">
                      {material.summary ? (
                        <p className="text-slate-700 text-xl leading-[1.6] whitespace-pre-wrap font-medium border-l-[6px] border-primary/20 pl-12 italic">
                          {material.summary}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-32 space-y-6 grayscale opacity-20">
                           <Sparkles className="w-16 h-16" />
                           <p className="text-xs font-black uppercase tracking-[0.3em]">Extracting Core Insights</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="space-y-12">
               <div className="bg-primary rounded-[3rem] p-12 text-white space-y-10 shadow-2xl shadow-primary/30 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-48 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  <h3 className="font-black text-2xl relative z-10 uppercase tracking-tight">Interface</h3>
                  <div className="space-y-6 relative z-10">
                     <div className="flex justify-between items-center pb-6 border-b border-white/10">
                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Typography</span>
                        <div className="flex gap-3">
                           <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-white/10 rounded-xl font-black">A-</Button>
                           <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-white/10 rounded-xl font-black">A+</Button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center pb-6 border-b border-white/10">
                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Contrast</span>
                        <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-white/10 rounded-xl">
                           <RefreshCw className="w-5 h-5" />
                        </Button>
                     </div>
                  </div>
                  <Button variant="secondary" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-white text-primary hover:bg-slate-50 transition-all shadow-xl shadow-black/5">
                     Save Config
                  </Button>
               </div>

               <div className="glass-card rounded-[3rem] p-12 border-none shadow-sm space-y-10">
                  <h3 className="font-black text-lg text-slate-800 uppercase tracking-[0.2em] opacity-40">Intelligence</h3>
                  <div className="space-y-8">
                     <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Logic Engine</span>
                        <span className="text-sm font-black text-slate-900 flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.5)]" /> DeepSeek V3 Neural
                        </span>
                     </div>
                     <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Material Hash</span>
                        <span className="text-[10px] font-mono text-slate-400 break-all leading-relaxed">{material.id}</span>
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