import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Sparkles, Settings, LayoutGrid, Info, Mic, Search, BookOpen } from 'lucide-react'
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
      <div className="min-h-screen bg-slate-50/20 pb-20">
        <div className="wide-grid py-10 lg:py-16 space-y-12">
          {/* Master Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Core Engine Active
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950">Library Center</h1>
              <p className="text-slate-500 text-sm font-medium">Coordinate your neural learning archive.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
               <div className="relative group mr-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search registry..." 
                    className="h-10 w-full md:w-72 pl-9 rounded-xl bg-white border-slate-200 text-xs font-semibold focus-visible:ring-primary/10 shadow-sm"
                  />
               </div>
               
               <div className="flex items-center gap-2.5 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <DashboardAction icon={<Info className="w-4 h-4" />} label="Platform Info" />
                  <DashboardAction icon={<Settings className="w-4 h-4" />} label="Security Settings" />
                  
                  <div className="h-5 w-[1px] bg-slate-200 mx-1" />

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button className="h-8 w-8 rounded-lg shadow-lg shadow-primary/20 p-0 hover:scale-105 active:scale-95 transition-all">
                           <Plus className="w-4 h-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom" className="text-[10px] font-bold">New Material</TooltipContent>
                  </Tooltip>
               </div>
            </div>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="space-y-16">
              {/* Refined Action Module */}
              <section className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -z-0" />
                <UploadSection />
              </section>
              
              {/* Balanced Archive Grid */}
              <section className="space-y-8">
                <div className="flex items-center gap-3 px-1">
                   <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                      <LayoutGrid className="w-5 h-5" />
                   </div>
                   <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Library Archive</h2>
                </div>
                
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center p-32 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Synchronizing Data...</p>
                  </div>
                }>
                  <MaterialsList />
                </Suspense>
              </section>
            </div>

            {/* Sidebar Module */}
            <aside className="space-y-8">
               <div className="bg-slate-950 rounded-2xl p-10 text-white space-y-10 shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0 transition-transform duration-1000" />
                  <div className="space-y-2 relative z-10">
                     <h3 className="font-extrabold text-xl tracking-tight uppercase leading-none">Voice Pilot.</h3>
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-wider opacity-60 italic">Online & Ready</p>
                  </div>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white/5 border-white/10 hover:bg-white hover:text-slate-950 transition-all relative z-10">
                     <Mic className="w-5 h-5" />
                  </Button>
               </div>

               <div className="rounded-2xl border border-slate-200/60 p-10 space-y-8 bg-white shadow-sm">
                  <div className="space-y-6">
                     <DashboardMetric label="Success Rate" value="99.2%" />
                     <DashboardMetric label="Compute Time" value="12ms" />
                     <DashboardMetric label="Storage" value="SOC2" />
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function DashboardAction({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-50">
               <div className="text-slate-400 hover:text-primary transition-colors">{icon}</div>
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-bold">{label}</TooltipContent>
      </Tooltip>
   )
}

function DashboardMetric({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex flex-col gap-1">
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
         <span className="text-2xl font-extrabold tracking-tighter text-slate-900">{value}</span>
      </div>
   )
}
