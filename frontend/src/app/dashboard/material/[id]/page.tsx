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
  LayoutGrid,
  Settings2,
  Maximize2
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
        {/* Focused Reader Toolbar */}
        <div className="border-b bg-white/80 sticky top-14 z-40 backdrop-blur-md">
           <div className="app-container h-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <Tooltip>
                    <TooltipTrigger asChild>
                       <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-md">
                         <Link href="/dashboard">
                           <LayoutGrid className="w-4 h-4 text-slate-500 hover:text-primary transition-colors" />
                         </Link>
                       </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[10px] font-bold">Library</TooltipContent>
                 </Tooltip>
                 <div className="h-4 w-[1px] bg-slate-200" />
                 <h2 className="text-xs font-bold text-slate-900 truncate max-w-xs">{material.title}</h2>
              </div>

              <div className="flex items-center gap-1.5">
                 <ActionBtn icon={<Share2 className="w-3.5 h-3.5" />} label="Share" />
                 <ActionBtn icon={<Download className="w-3.5 h-3.5" />} label="Export" />
                 <ActionBtn icon={<Printer className="w-3.5 h-3.5" />} label="Print" />
                 <div className="h-4 w-[1px] bg-slate-200 mx-1" />
                 <ActionBtn icon={<Settings2 className="w-3.5 h-3.5" />} label="View Options" />
              </div>
           </div>
        </div>

        <div className="app-container py-8 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="space-y-8 min-w-0">
              {/* Reader Module */}
              <section className="space-y-4">
                {audioUrl ? (
                  <div className="bg-slate-950 rounded-xl p-6 lg:p-8 shadow-xl">
                     <AudioPlayer src={audioUrl} />
                  </div>
                ) : (
                   <div className="p-12 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
                      <Loader2 className="w-5 h-5 text-primary/30 animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processing Audio...</p>
                   </div>
                )}
              </section>

              <Tabs defaultValue="simplified" className="w-full">
                <TabsList className="bg-slate-100/50 p-1 rounded-lg h-9 w-fit gap-1 mb-6 border border-slate-200/50">
                  <TabsTrigger value="simplified" className="rounded-md px-6 h-full font-bold uppercase text-[9px] tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    Simplified
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="rounded-md px-6 h-full font-bold uppercase text-[9px] tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="simplified">
                  <Card className="senior-card border-none shadow-sm rounded-xl p-8 lg:p-12 min-h-[500px]">
                    <div className="prose prose-slate max-w-none">
                      {material.simplified_content ? (
                        <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap font-medium">
                          {material.simplified_content}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20">
                           <Sparkles className="w-8 h-8 mb-2" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Neural mapping active</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="summary">
                  <Card className="senior-card border-none shadow-sm rounded-xl p-8 lg:p-12 min-h-[500px]">
                    <div className="prose prose-slate max-w-none">
                      {material.summary ? (
                        <div className="border-l-2 border-primary/20 pl-8 italic">
                           <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap font-medium">{material.summary}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20">
                           <Sparkles className="w-8 h-8 mb-2" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Logic extraction active</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="space-y-6">
               <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Settings</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Scale</span>
                        <div className="flex gap-1.5">
                           <Button size="icon" variant="secondary" className="h-7 w-7 rounded-md font-bold text-[10px]">A-</Button>
                           <Button size="icon" variant="secondary" className="h-7 w-7 rounded-md font-bold text-[10px]">A+</Button>
                        </div>
                     </div>
                     <Button variant="default" className="w-full h-10 rounded-lg text-xs font-bold uppercase tracking-widest bg-slate-900 hover:bg-slate-800">
                        Save Preferences
                     </Button>
                  </div>
               </div>

               <div className="rounded-xl border border-slate-200 p-6 space-y-4 bg-white/50">
                  <div className="space-y-3">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Intelligence</p>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> DeepSeek V3
                        </p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Asset Sync</p>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5 text-slate-400" /> {new Date(material.created_at).toLocaleDateString()}
                        </p>
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

function ActionBtn({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-slate-500 hover:text-primary transition-colors">
               {icon}
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-bold">{label}</TooltipContent>
      </Tooltip>
   )
}