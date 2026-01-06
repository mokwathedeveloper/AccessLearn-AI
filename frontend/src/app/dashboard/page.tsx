import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Sparkles, HelpCircle, Settings, BookOpen, ChevronRight, LayoutGrid, Info, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <TooltipProvider>
      <div className="min-h-screen pb-20">
        <div className="container mx-auto p-6 md:p-12 space-y-16 max-w-7xl">
          {/* Master Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-primary/10">
                <Sparkles className="w-3 h-3" /> Intelligence Active
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
                Your <br/> <span className="text-primary italic">Library.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/50 shadow-2xl">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full hover:bg-primary/5">
                        <Info className="w-6 h-6 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Platform Info</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full hover:bg-primary/5">
                        <Settings className="w-6 h-6 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 p-0 active:scale-90 transition-all">
                        <Plus className="w-7 h-7" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create New</TooltipContent>
               </Tooltip>
            </div>
          </div>
          
          <div className="grid gap-20 lg:grid-cols-[1fr_380px]">
            <div className="space-y-20">
              {/* Giant Upload Piece */}
              <section className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[100px] -z-10" />
                <UploadSection />
              </section>
              
              {/* Materials Grid */}
              <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                         <LayoutGrid className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-slate-800">Archive</h2>
                   </div>
                   
                   <Tooltip>
                      <TooltipTrigger asChild>
                         <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-primary">
                            <ChevronRight className="w-6 h-6" />
                         </Button>
                      </TooltipTrigger>
                      <TooltipContent>Show All</TooltipContent>
                   </Tooltip>
                </div>
                
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center p-32 bg-white/50 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-sm space-y-6">
                    <Loader2 className="w-12 h-12 animate-spin text-primary/30" />
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Synchronizing Library...</p>
                  </div>
                }>
                  <MaterialsList />
                </Suspense>
              </section>
            </div>

            {/* Premium Sidebar */}
            <aside className="space-y-10">
               <div className="glass-card rounded-[3rem] p-10 space-y-8 border-none relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-1000" />
                  <div className="space-y-2 relative z-10">
                     <h3 className="font-black text-2xl tracking-tight uppercase">Voice Control</h3>
                     <p className="text-slate-500 font-medium text-sm leading-relaxed">
                        Say <span className="text-primary font-black">&quot;Speak&quot;</span> while viewing any document to activate AI narration.
                     </p>
                  </div>
                  <div className="pt-4 relative z-10">
                     <Button variant="outline" size="icon" className="h-16 w-16 rounded-[1.5rem] bg-white border-none shadow-xl hover:scale-105 transition-all">
                        <Mic className="w-6 h-6 text-primary" />
                     </Button>
                  </div>
               </div>

               <div className="glass-card rounded-[3rem] p-10 space-y-8 border-none bg-slate-900 text-white">
                  <h3 className="font-black text-lg uppercase tracking-widest opacity-50">Deep Metrics</h3>
                  <div className="space-y-6">
                     <Metric label="AI Accuracy" value="99.8%" color="text-teal-400" />
                     <Metric label="Latency" value="120ms" color="text-primary" />
                     <Metric label="Security" value="SOC2" color="text-white" />
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function Metric({ label, value, color }: { label: string, value: string, color: string }) {
   return (
      <div className="flex flex-col gap-1">
         <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
         <span className={`text-2xl font-black tracking-tighter ${color}`}>{value}</span>
      </div>
   )
}