import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AudioPlayer } from '@/components/audio-player'
import { ArrowLeft, FileText, FileAudio, Sparkles, BookOpen, Clock, Download, Share2, Loader2, Printer, RefreshCw } from 'lucide-react'
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
      <div className="min-h-screen bg-slate-50/30">
        <div className="container mx-auto p-6 md:p-10 max-w-6xl space-y-10">
          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent group">
              <Link href="/dashboard" className="flex items-center text-slate-500 font-bold uppercase text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-primary" />
                Library
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200">
                        <Share2 className="w-4 h-4 text-slate-600" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share Material</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200">
                        <Download className="w-4 h-4 text-slate-600" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download Original</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200">
                        <Printer className="w-4 h-4 text-slate-600" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Print Summary</TooltipContent>
               </Tooltip>

               <Badge variant={material.status === 'completed' ? 'success' : 'processing'} className="rounded-xl px-4 py-1 uppercase text-[10px] font-black ml-2 shadow-sm">
                  {material.status}
               </Badge>
            </div>
          </div>

          {/* Hero Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
               <BookOpen className="w-5 h-5" />
               <span className="text-xs font-black uppercase tracking-tighter">Academic Content</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {material.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm font-medium">
               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Uploaded {new Date(material.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-slate-300" />
               <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{material.file_type.split('/')[1].toUpperCase()} Document</span>
               </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-10">
              {/* Audio Section */}
              {audioUrl ? (
                <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                             <FileAudio className="w-5 h-5 text-white" />
                          </div>
                          <div>
                             <CardTitle className="text-lg font-black tracking-tight">Audio Transcription</CardTitle>
                             <CardDescription className="text-slate-400 text-xs font-medium">AI Natural Voice • 1.0x Speed</CardDescription>
                          </div>
                       </div>
                       <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-4">
                     <AudioPlayer src={audioUrl} className="bg-white/5 border border-white/10 p-6 rounded-2xl" />
                  </CardContent>
                </Card>
              ) : (
                 <div className="p-12 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="font-bold text-slate-900 text-lg tracking-tight">Generating Audio Version...</p>
                    <p className="text-slate-400 text-sm max-w-xs leading-relaxed font-medium italic">Our AI is currently converting this document into an accessible audio stream.</p>
                 </div>
              )}

              {/* Content Tabs */}
              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-14 w-full justify-start gap-2 mb-6">
                  <TabsTrigger value="simplified" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary">
                    Simplified Version
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="rounded-xl px-8 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary">
                    Key Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="simplified">
                  <Card className="border-none shadow-xl bg-white rounded-3xl p-10 min-h-[400px]">
                    <div className="prose prose-slate max-w-none">
                      {material.simplified_content ? (
                        <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                          {material.simplified_content}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-20 space-y-4">
                           <Sparkles className="w-10 h-10 text-slate-200" />
                           <p className="text-slate-400 font-bold italic tracking-tight">Processing simplified content...</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary">
                  <Card className="border-none shadow-xl bg-white rounded-3xl p-10 min-h-[400px]">
                    <div className="prose prose-slate max-w-none">
                      {material.summary ? (
                        <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium border-l-4 border-primary/20 pl-8 italic">
                          {material.summary}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-20 space-y-4">
                           <Sparkles className="w-10 h-10 text-slate-200" />
                           <p className="text-slate-400 font-bold italic tracking-tight">AI Insights are being generated...</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="space-y-8">
               <Card className="border-none shadow-xl bg-teal-600 text-white rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                                  <h3 className="font-black text-xl relative z-10 uppercase tracking-tighter">Reader Settings</h3>
                                  <div className="space-y-4 relative z-10">
                                     <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                        <span className="text-xs font-bold uppercase opacity-60">Text Size</span>
                                        <div className="flex items-center gap-2">
                                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 text-white font-bold">A-</Button>
                                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 text-white font-bold">A+</Button>
                                        </div>
                                     </div>
                                     <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                        <span className="text-xs font-bold uppercase opacity-60">Dyslexic Font</span>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 text-white">
                                           <RefreshCw className="w-4 h-4" />
                                        </Button>
                                     </div>
                                  </div>
                                  <Button variant="secondary" className="w-full rounded-xl h-12 font-bold bg-white text-teal-700 hover:bg-slate-100 group">
                                     <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> Sync Settings
                                  </Button>
                               </Card>
               <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                  <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Material Info</h3>
                  <div className="space-y-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Security Hash</span>
                        <span className="text-xs font-mono text-slate-600 break-all">{material.id}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Processing Engine</span>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> DeepSeek V3 AI
                        </span>
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
