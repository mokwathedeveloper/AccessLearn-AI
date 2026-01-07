import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Share2, 
  Printer, 
  LayoutGrid
} from 'lucide-react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MaterialContent } from './material-content'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch material metadata with high priority
  const { data: material, error } = await supabase
    .from('materials')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !material) {
    notFound()
  }

  // 2. Dynamic Audio Link Generation
  let audioUrl = null
  if (material.audio_url) {
    try {
      const { data } = await supabase.storage
        .from('lecture-materials')
        .createSignedUrl(material.audio_url, 3600)
      audioUrl = data?.signedUrl
    } catch (err) {
      console.error('[SERVER] Audio Link Generation Failure:', err)
    }
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
          <MaterialContent material={material} audioUrl={audioUrl || null} />
        </div>
      </div>
    </TooltipProvider>
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