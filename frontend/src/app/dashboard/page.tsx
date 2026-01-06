import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Sparkles, Settings, LayoutGrid, Info, Mic, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/30">
        <div className="wide-container py-8 md:py-12 space-y-10">
          {/* Pro Header & Action Bar */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-8 border-b border-slate-200">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> System Live
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Learning <span className="text-primary">Library.</span></h1>
              <p className="text-slate-500 text-sm font-medium">Manage and enhance your study materials with neural intelligence.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search your library..." 
                    className="h-11 w-full md:w-80 pl-10 rounded-xl bg-white border-slate-200 text-sm font-medium shadow-sm focus-visible:ring-primary/20"
                  />
               </div>
               
               <div className="flex items-center gap-2.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                           <Info className="w-4 h-4 text-slate-500" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>Help Center</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                           <Settings className="w-4 h-4 text-slate-500" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>Settings</TooltipContent>
                  </Tooltip>

                  <div className="h-5 w-[1px] bg-slate-200 mx-1" />

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button className="h-9 w-9 rounded-lg shadow-lg shadow-primary/20 p-0 hover:scale-105 transition-all">
                           <Plus className="w-5 h-5" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>New Document</TooltipContent>
                  </Tooltip>
               </div>
            </div>
          </div>
          
          <div className="grid gap-10 xl:grid-cols-[1fr_340px]">
            <div className="space-y-12">
              {/* Action Piece */}
              <section className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
                <UploadSection />
              </section>
              
              {/* Organized Archive */}
              <section className="space-y-6">
                <div className="flex items-center gap-2.5 px-1">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                      <LayoutGrid className="w-4 h-4" />
                   </div>
                   <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Knowledge Archive</h2>
                </div>
                
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center p-32 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Library...</p>
                  </div>
                }>
                  <MaterialsList />
                </Suspense>
              </section>
            </div>

            {/* OG Sidebar */}
            <aside className="space-y-8">
               <div className="bg-slate-950 rounded-3xl p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-all duration-1000" />
                  <div className="space-y-3 relative z-10">
                     <h3 className="font-black text-xl tracking-tight uppercase tracking-[0.1em]">Voice Pilot</h3>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        Navigate your library hands-free. Command: <br/>
                        <span className="text-primary font-black">&quot;Go to Upload&quot;</span>
                     </p>
                  </div>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white/10 border-white/10 hover:bg-white hover:text-slate-950 transition-all relative z-10">
                     <Mic className="w-5 h-5" />
                  </Button>
               </div>

               <div className="rounded-3xl border border-slate-200/60 p-10 space-y-8 bg-white shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Diagnostics</h3>
                  <div className="space-y-6">
                     <MetricRow label="AI Accuracy" value="99.8%" trend="Optimized" />
                     <MetricRow label="Latency" value="120ms" trend="Low" />
                     <MetricRow label="Security" value="Encrypted" trend="Active" />
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function MetricRow({ label, value, trend }: { label: string, value: string, trend: string }) {
   return (
      <div className="flex flex-col gap-1.5">
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{label}</span>
            <span className="text-[9px] font-black text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase">{trend}</span>
         </div>
         <span className="text-2xl font-black tracking-tighter text-slate-900">{value}</span>
      </div>
   )
}