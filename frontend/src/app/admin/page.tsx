import { requireRole } from '@/lib/auth/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  Users, 
  FileStack, 
  ShieldAlert, 
  Database, 
  Search,
  ArrowUpRight,
  RefreshCw,
  LayoutDashboard,
  Zap,
  HardDrive
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'

export default async function AdminPage() {
  await requireRole('admin')

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/30 pb-20">
        <div className="wide-grid py-10 lg:py-16 space-y-12">
          {/* Master Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Override Active</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Command <span className="text-primary italic">Root.</span></h1>
            </div>
            
            <div className="flex items-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                        <Database className="w-5 h-5 text-slate-500" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Platform Logs</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                        <RefreshCw className="w-5 h-5 text-slate-500" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Registry Sync</TooltipContent>
               </Tooltip>

               <div className="h-6 w-[1px] bg-slate-200 mx-1" />

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button className="h-10 w-10 rounded-xl shadow-lg shadow-primary/20 p-0 hover:scale-105 active:scale-95 transition-all" asChild>
                        <Link href="/dashboard">
                           <LayoutDashboard className="w-5 h-5" />
                        </Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Return to User View</TooltipContent>
               </Tooltip>
            </div>
          </div>

          {/* Wide Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AdminMiniCard icon={<Users className="w-5 h-5" />} label="Total Users" value="1,284" color="text-blue-600" />
            <AdminMiniCard icon={<FileStack className="w-5 h-5" />} label="Assets Stored" value="8,492" color="text-teal-600" />
            <AdminMiniCard icon={<Zap className="w-5 h-5" />} label="Sync Success" value="99.2%" color="text-primary" />
            <AdminMiniCard icon={<HardDrive className="w-5 h-5" />} label="Data Volume" value="42GB" color="text-amber-600" />
          </div>

          <div className="grid gap-12 xl:grid-cols-3">
             {/* Wide Intelligence Stream */}
             <Card className="xl:col-span-2 border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50 space-y-6">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                         <CardTitle className="text-xl font-black uppercase tracking-tight">Intelligence Stream</CardTitle>
                         <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Real-time lifecycle monitoring</CardDescription>
                      </div>
                      <div className="relative group">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                         <Input placeholder="Filter registry..." className="h-11 pl-10 w-full md:w-72 rounded-xl bg-slate-50 border-none text-xs font-black uppercase" />
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y divide-slate-50">
                      <MasterActivityRow name="Core_Syllabus_Bio.pdf" status="synced" time="2m ago" />
                      <MasterActivityRow name="Lab_Report_Final.txt" status="live" time="5m ago" />
                      <MasterActivityRow name="Prep_Notes_Eco.pdf" status="synced" time="12m ago" />
                   </div>
                   <div className="p-8 bg-slate-50/50 flex justify-center border-t border-slate-50">
                      <Button variant="ghost" size="sm" className="text-primary font-black text-[10px] uppercase tracking-[0.2em] h-10 px-10 rounded-full hover:bg-white hover:shadow-md transition-all">Full Intelligence Archive</Button>
                   </div>
                </CardContent>
             </Card>

             {/* System Diagnostics Module */}
             <div className="space-y-8">
                <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white space-y-10 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-all duration-1000" />
                   <div className="space-y-2 relative z-10">
                      <h3 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">System Diagnostics</h3>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[200px]">Real-time performance metrics across all neural nodes.</p>
                   </div>
                   <div className="space-y-8 relative z-10">
                      <MasterHealth label="Gateway Response" percent={98} />
                      <MasterHealth label="Neural Throughput" percent={85} />
                   </div>
                   <Button className="w-full bg-white text-slate-950 hover:bg-primary hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 transition-all shadow-xl active:scale-95">
                      Diagnostic Sweep
                   </Button>
                </div>

                <Card className="rounded-[2.5rem] border-slate-200/60 p-10 space-y-8 bg-white shadow-sm">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Security Verification</h3>
                   <div className="space-y-5">
                      <MasterVerification label="Identity Protocol" status="Secured" />
                      <MasterVerification label="Bucket Isolation" status="Active" />
                      <MasterVerification label="Encryption Flow" status="Verified" />
                   </div>
                </Card>
             </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function AdminMiniCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
   return (
      <Card className="border-slate-200/60 shadow-sm p-8 rounded-[2rem] bg-white space-y-6 transition-all hover:shadow-md group">
         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">{icon}</div>
         <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className={`text-3xl font-black tracking-tighter ${color}`}>{value}</p>
         </div>
      </Card>
   )
}

function MasterActivityRow({ name, status, time }: { name: string, status: string, time: string }) {
   return (
      <div className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
         <div className="flex items-center gap-6">
            <div className={`w-2 h-2 rounded-full ${status === 'synced' ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]'}`} />
            <div>
               <p className="text-base font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{name}</p>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Hash Registry Match</p>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{time}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
         </div>
      </div>
   )
}

function MasterHealth({ label, percent }: { label: string, percent: number }) {
   return (
      <div className="space-y-3">
         <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
            <span>{label}</span>
            <span>{percent}%</span>
         </div>
         <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] transition-all duration-1000" style={{ width: `${percent}%` }} />
         </div>
      </div>
   )
}

function MasterVerification({ label, status }: { label: string, status: string }) {
   return (
      <div className="flex items-center justify-between group cursor-pointer">
         <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">{label}</span>
         <span className="text-[9px] font-black uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100/50">{status}</span>
      </div>
   )
}
