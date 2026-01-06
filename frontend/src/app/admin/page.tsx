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
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function AdminPage() {
  await requireRole('admin')

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto p-6 md:p-10 space-y-10 max-w-7xl">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
               <div className="p-1.5 rounded-lg bg-primary text-white">
                  <ShieldAlert className="w-4 h-4" />
               </div>
               <span className="text-xs font-black uppercase tracking-wider text-primary">System Administrator</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900">Control <span className="text-primary/80">Center</span></h1>
            <p className="text-muted-foreground font-medium">Monitor platform activity, manage users, and oversee AI processing.</p>
          </div>
          
          <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-xl font-bold bg-white">
                <Database className="w-4 h-4 mr-2" /> View Logs
             </Button>
             <Button className="rounded-xl font-bold shadow-lg shadow-primary/20 px-6">
                System Refresh
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard icon={<Users className="text-blue-600" />} label="Total Students" value="1,284" trend="+12% this week" />
          <AdminStatCard icon={<FileStack className="text-teal-600" />} label="Materials Processed" value="8,492" trend="+450 today" />
          <AdminStatCard icon={<Activity className="text-purple-600" />} label="AI Success Rate" value="99.2%" trend="Stable" />
          <AdminStatCard icon={<Server className="text-amber-600" />} label="Storage Usage" value="42.8 GB" trend="64% of quota" />
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
           {/* Activity Feed */}
           <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <CardTitle className="text-xl font-black uppercase tracking-tight">Recent Activity</CardTitle>
                       <CardDescription className="font-medium">Live document processing stream</CardDescription>
                    </div>
                    <div className="relative w-64">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input placeholder="Search materials..." className="pl-10 rounded-xl bg-slate-50 border-none h-10 text-sm" />
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-50">
                    <ActivityRow name="Lecture_Note_01.pdf" user="alex.j@edu.com" status="completed" time="2m ago" />
                    <ActivityRow name="Bio_Lab_Manual.txt" user="sarah.k@uni.edu" status="processing" time="5m ago" />
                    <ActivityRow name="Economics_Final.pdf" user="admin@access.ai" status="completed" time="12m ago" />
                    <ActivityRow name="Intro_to_Physics.pdf" user="mike.r@school.org" status="failed" time="1h ago" />
                    <ActivityRow name="History_Summary.txt" user="jane.d@edu.com" status="completed" time="3h ago" />
                 </div>
                 <div className="p-6 bg-slate-50/50 flex justify-center">
                    <Button variant="ghost" className="text-primary font-bold text-sm">View All Activity</Button>
                 </div>
              </CardContent>
           </Card>

           {/* Quick Actions */}
           <div className="space-y-6">
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-3xl p-8 space-y-6">
                 <h3 className="font-black text-lg uppercase tracking-tight">Platform Health</h3>
                 <div className="space-y-4">
                    <HealthBar label="API Response" percent={98} />
                    <HealthBar label="AI Throughput" percent={85} />
                    <HealthBar label="DB Connectivity" percent={100} />
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-12">
                       Full Diagnostic
                    </Button>
                 </div>
              </Card>

              <Card className="border-none shadow-xl bg-white rounded-3xl p-8 space-y-6">
                 <h3 className="font-black text-lg uppercase tracking-tight text-slate-800">Support Requests</h3>
                 <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Users className="w-5 h-5" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">New User Verification</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">4 Pending</p>
                       </div>
                       <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </div>
  )
}

function AdminStatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
   return (
      <Card className="border-none shadow-lg bg-white p-6 rounded-3xl space-y-4">
         <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-slate-50">{icon}</div>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px]">{trend}</Badge>
         </div>
         <div className="space-y-1">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
         </div>
      </Card>
   )
}

function ActivityRow({ name, user, status, time }: { name: string, user: string, status: string, time: string }) {
   return (
      <div className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
         <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-teal-500' : status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`} />
            <div>
               <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{name}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase">{user}</p>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <Badge variant="outline" className={`capitalize font-bold text-[10px] border-none ${status === 'completed' ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-500'}`}>
               {status}
            </Badge>
            <span className="text-xs font-bold text-slate-300 w-16 text-right">{time}</span>
            <ChevronRight className="w-4 h-4 text-slate-200" />
         </div>
      </div>
   )
}

function HealthBar({ label, percent }: { label: string, percent: number }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60 text-white">
            <span>{label}</span>
            <span>{percent}%</span>
         </div>
         <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${percent}%` }} />
         </div>
      </div>
   )
}