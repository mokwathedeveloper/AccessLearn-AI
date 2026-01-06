import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Settings, LayoutGrid, Info, Mic, Search, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
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
      <div className="min-h-screen bg-slate-50/20 pb-16">
        <div className="wide-grid py-8 lg:py-12 space-y-8">
          {/* Senior Command Center: Mission Header */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-6 border-b border-slate-200">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">
                <Heart className="w-2.5 h-2.5 fill-current" /> Inclusion Engine Active
              </div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900">Your Study <span className="text-primary italic">Command.</span></h1>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Democratizing knowledge through AI.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
               <div className="relative group mr-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search neural archive..." 
                    className="h-9 w-full md:w-72 pl-9 rounded-lg bg-white border-slate-200 text-xs font-semibold focus-visible:ring-primary/10 shadow-sm"
                  />
               </div>
               
               <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <DashboardAction icon={<Info className="w-4 h-4" />} label="Quick Start Guide" />
                  <Link href="/settings">
                    <DashboardAction icon={<Settings className="w-4 h-4" />} label="Encryption Key" />
                  </Link>
                  
                  <div className="h-4 w-[1px] bg-slate-200 mx-1" />

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button className="h-8 w-8 rounded-md shadow-lg shadow-primary/20 p-0 hover:scale-105 active:scale-95 transition-all">
                           <Plus className="w-4.5 h-4.5" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom" className="text-[10px] font-black tracking-widest">UPLOAD NEW</TooltipContent>
                  </Tooltip>
               </div>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-10">
              {/* Tight Action Module */}
              <section className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 relative overflow-hidden">
                <UploadSection />
              </section>
              
              {/* High-Density Grid */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5 px-1">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                      <LayoutGrid className="w-4 h-4" />
                   </div>
                   <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Archived Intelligence</h2>
                </div>
                
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Syncing...</p>
                  </div>
                }>
                  <MaterialsList />
                </Suspense>
              </section>
            </div>

            {/* Impact Sidebar */}
            <aside className="space-y-6">
               <div className="bg-slate-950 rounded-2xl p-8 text-white space-y-8 shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0" />
                  <div className="space-y-1 relative z-10">
                     <h3 className="font-black text-lg tracking-tight uppercase tracking-widest">Voice Flow.</h3>
                     <p className="text-slate-400 text-xs font-medium leading-relaxed italic opacity-80">Online & Encrypted</p>
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg bg-white/5 border-white/10 hover:bg-white hover:text-slate-950 transition-all relative z-10">
                     <Mic className="w-4.5 h-4.5" />
                  </Button>
               </div>

               <div className="rounded-2xl border border-slate-200/60 p-8 space-y-8 bg-white shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Inclusion Metrics</h3>
                  <div className="space-y-6">
                     <ImpactRow label="Access Score" value="99.2%" />
                     <ImpactRow label="Sync Uptime" value="100%" />
                     <ImpactRow label="Logic Nodes" value="Verified" />
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
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-slate-50">
               <div className="text-slate-400 hover:text-primary transition-colors">{icon}</div>
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-bold tracking-tight uppercase">{label}</TooltipContent>
      </Tooltip>
   )
}

function ImpactRow({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex flex-col gap-1">
         <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-60">{label}</span>
         <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">{value}</span>
      </div>
   )
}