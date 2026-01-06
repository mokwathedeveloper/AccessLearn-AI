import { requireRole } from '@/lib/auth/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileStack, 
  Activity, 
  ShieldAlert, 
  Database, 
  Server,
  ChevronRight,
  Search,
  ArrowUpRight,
  RefreshCw,
  LayoutDashboard,
  Zap,
  Box,
  Binary
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
      <div className="min-h-screen pb-20">
        <div className="container mx-auto p-6 md:p-12 space-y-16 max-w-7xl">
          {/* Master Admin Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                <ShieldAlert className="w-3 h-3 text-primary" /> Root Administrator
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
                System <br/> <span className="text-primary italic">Command.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/50 shadow-2xl">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full hover:bg-primary/5">
                        <Database className="w-6 h-6 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>System Logs</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full hover:bg-primary/5">
                        <Binary className="w-6 h-6 text-slate-400" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Registry</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 p-0 active:scale-90 transition-all">
                        <RefreshCw className="w-7 h-7" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset State</TooltipContent>
               </Tooltip>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <AdminStat icon={<Users className="w-8 h-8 text-primary" />} label="Users" value="1.2k" />
            <AdminStat icon={<FileStack className="w-8 h-8 text-primary" />} label="Assets" value="8.4k" />
            <AdminStat icon={<Zap className="w-8 h-8 text-primary" />} label="Compute" value="99.2%" />
            <AdminStat icon={<Server className="w-8 h-8 text-primary" />} label="Storage" value="42GB" />
          </div>

          <div className="grid gap-20 lg:grid-cols-3">
             {/* Activity Stream */}
             <Card className="lg:col-span-2 glass-card rounded-[3rem] border-none shadow-2xl overflow-hidden">
                <CardHeader className="p-10 border-b border-slate-100">
                   <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Intelligence Stream</h3>
                      <Tooltip>
                         <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                               <Search className="w-6 h-6 text-slate-400" />
                            </Button>
                         </TooltipTrigger>
                         <TooltipContent>Search Stream</TooltipContent>
                      </Tooltip>
                   </div>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y divide-slate-50">
                      <ActivityRow name="Core_Syllabus.pdf" status="active" />
                      <ActivityRow name="Lab_Report_V2.txt" status="active" />
                      <ActivityRow name="Final_Exam_Prep.pdf" status="active" />
                   </div>
                   <div className="p-10 flex justify-center bg-slate-50/30">
                      <Tooltip>
                         <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white hover:shadow-lg">
                               <ChevronRight className="w-8 h-8 text-primary" />
                            </Button>
                         </TooltipTrigger>
                         <TooltipContent>Expand Stream</TooltipContent>
                      </Tooltip>
                   </div>
                </CardContent>
             </Card>

             {/* Quick Controls */}
             <div className="space-y-10">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-10 shadow-2xl">
                   <h3 className="font-black text-xl uppercase tracking-[0.2em] opacity-40">Diagnostics</h3>
                   <div className="space-y-8">
                      <DiagnosticItem label="API Latency" percent={98} />
                      <DiagnosticItem label="AI Throughput" percent={85} />
                   </div>
                   <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs">
                      Run Full Scan
                   </Button>
                </div>

                <div className="glass-card rounded-[3rem] p-10 border-none space-y-8">
                   <h3 className="font-black text-xl uppercase tracking-tight">Security</h3>
                   <div className="flex items-center gap-6">
                      <Tooltip>
                         <TooltipTrigger asChild>
                            <Button size="icon" className="h-16 w-16 rounded-2xl bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white border-none transition-all">
                               <ShieldAlert className="w-8 h-8" />
                            </Button>
                         </TooltipTrigger>
                         <TooltipContent>Verify RLS Policies</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                         <TooltipTrigger asChild>
                            <Button size="icon" className="h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white border-none transition-all">
                               <Box className="w-8 h-8" />
                            </Button>
                         </TooltipTrigger>
                         <TooltipContent>Clear CDN Cache</TooltipContent>
                      </Tooltip>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function AdminStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
   return (
      <Card className="glass-card rounded-[2.5rem] border-none p-10 space-y-6 hover:shadow-2xl transition-all group">
         <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
         <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
         </div>
      </Card>
   )
}

function ActivityRow({ name, status }: { name: string, status: string }) {
   return (
      <div className="p-8 flex items-center justify-between group hover:bg-white/50 transition-all">
         <div className="flex items-center gap-6">
            <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
            <div>
               <p className="text-lg font-black text-slate-800 tracking-tight">{name}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: {status}</p>
            </div>
         </div>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-slate-300 hover:text-primary">
                  <ArrowUpRight className="w-6 h-6" />
               </Button>
            </TooltipTrigger>
            <TooltipContent>View Metadata</TooltipContent>
         </Tooltip>
      </div>
   )
}

function DiagnosticItem({ label, percent }: { label: string, percent: number }) {
   return (
      <div className="space-y-3">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            <span>{label}</span>
            <span>{percent}%</span>
         </div>
         <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ width: `${percent}%` }} />
         </div>
      </div>
   )
}