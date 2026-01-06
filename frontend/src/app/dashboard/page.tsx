import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Sparkles, Settings, LayoutGrid, Info, Mic, Search, Clock, ShieldCheck } from 'lucide-react'
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
      <div className="min-h-screen bg-slate-50/50 pb-20">
        <div className="app-container py-8 space-y-8">
          {/* Senior Control Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" />
                Library Center
              </h1>
              <p className="text-xs font-medium text-slate-500">Manage and transform academic materials with AI.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
               <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Quick search..." 
                    className="h-8 w-full md:w-64 pl-8 rounded-md bg-white border-slate-200 text-xs font-medium focus-visible:ring-primary/10 shadow-none"
                  />
               </div>
               
               <div className="h-4 w-[1px] bg-slate-200 mx-1" />

               <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200">
                  <DashboardButton icon={<Info className="w-3.5 h-3.5" />} label="Guide" />
                  <DashboardButton icon={<Settings className="w-3.5 h-3.5" />} label="Config" />
                  <DashboardButton icon={<Plus className="w-3.5 h-3.5" />} label="Add" primary />
               </div>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-[280px_1fr_300px] items-start">
            {/* Left Rail: Status & Filters */}
            <aside className="space-y-6 hidden lg:block">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">System State</h3>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                     <StatusItem label="Neural Engine" value="Online" active />
                     <StatusItem label="Storage Cloud" value="Connected" active />
                     <StatusItem label="Encryption" value="Active" active />
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <MiniStat label="Assets" value="12" />
                     <MiniStat label="Minutes" value="124" />
                  </div>
               </div>
            </aside>

            {/* Main Area: Upload & Feed */}
            <main className="space-y-8 min-w-0">
              <section className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 relative overflow-hidden">
                <UploadSection />
              </section>
              
              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                   <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registry Feed</h2>
                </div>
                
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-slate-100 space-y-4">
                    <Loader2 className="w-6 h-6 animate-spin text-primary/20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Synchronizing...</p>
                  </div>
                }>
                  <MaterialsList />
                </Suspense>
              </section>
            </main>

            {/* Right Rail: Intelligence & Tips */}
            <aside className="space-y-6">
               <div className="bg-slate-900 rounded-xl p-6 text-white space-y-6 shadow-lg border border-slate-800">
                  <div className="space-y-1">
                     <h3 className="font-bold text-sm leading-tight flex items-center gap-2">
                        <Mic className="w-4 h-4 text-primary" />
                        Voice Pilot
                     </h3>
                     <p className="text-slate-400 text-xs leading-relaxed">
                        Say <span className="text-white font-bold">&quot;Read&quot;</span> to narrate.
                     </p>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-1/3" />
                  </div>
               </div>

               <div className="rounded-xl border border-slate-200 p-6 space-y-6 bg-white shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Config</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Auto-Sync</span>
                        <div className="w-8 h-4 bg-primary/10 rounded-full relative">
                           <div className="absolute right-1 top-1 w-2 h-2 bg-primary rounded-full" />
                        </div>
                     </div>
                     <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Neural Cache</span>
                        <span className="font-bold text-slate-900">4.2MB</span>
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

function DashboardButton({ icon, label, primary }: { icon: React.ReactNode, label: string, primary?: boolean }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button variant={primary ? "default" : "ghost"} size="icon" className="h-8 w-8 rounded-md transition-all">
               {icon}
            </Button>
         </TooltipTrigger>
         <TooltipContent side="bottom" className="text-[10px] font-bold">{label}</TooltipContent>
      </Tooltip>
   )
}

function StatusItem({ label, value, active }: { label: string, value: string, active: boolean }) {
   return (
      <div className="flex items-center justify-between">
         <span className="text-xs text-slate-500 font-medium">{label}</span>
         <div className="flex items-center gap-1.5">
            {active && <div className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />}
            <span className="text-xs font-bold text-slate-900">{value}</span>
         </div>
      </div>
   )
}

function MiniStat({ label, value }: { label: string, value: string }) {
   return (
      <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-0.5">
         <p className="text-[9px] font-bold text-slate-400 uppercase">{label}</p>
         <p className="text-lg font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
   )
}