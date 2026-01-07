'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  Users, 
  FileStack, 
  Search,
  Zap,
  HardDrive,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PerformanceLogs } from './performance-logs'

interface Stats {
  totalUsers: number
  assetsStored: number
  syncSuccess: string
  dataVolume: string
  health: {
    gatewayResponse: number
    neuralThroughput: number
  }
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [sweeping, setSweeping] = useState(false)

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/admin/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSweep = async () => {
    setSweeping(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/registry/sync`, {
        method: 'POST',
      })
      if (response.ok) {
        await fetchStats() // Refresh stats after sync
      }
    } catch (error) {
      console.error('Sweep failed:', error)
    } finally {
      setSweeping(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-300">Syncing Command Center...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Wide Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMiniCard 
          icon={<Users className="w-5 h-5" />} 
          label="Total Users" 
          value={stats?.totalUsers.toLocaleString() || '0'} 
          color="text-blue-600" 
        />
        <AdminMiniCard 
          icon={<FileStack className="w-5 h-5" />} 
          label="Assets Stored" 
          value={stats?.assetsStored.toLocaleString() || '0'} 
          color="text-teal-600" 
        />
        <AdminMiniCard 
          icon={<Zap className="w-5 h-5" />} 
          label="Sync Success" 
          value={stats?.syncSuccess || '100%'} 
          color="text-primary" 
        />
        <AdminMiniCard 
          icon={<HardDrive className="w-5 h-5" />} 
          label="Data Volume" 
          value={stats?.dataVolume || '0GB'} 
          color="text-amber-600" 
        />
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
               <PerformanceLogs />
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
                  <MasterHealth label="Gateway Response" percent={stats?.health.gatewayResponse || 100} />
                  <MasterHealth label="Neural Throughput" percent={stats?.health.neuralThroughput || 0} />
               </div>
               <Button 
                 onClick={handleSweep}
                 disabled={sweeping}
                 className="w-full bg-white text-slate-950 hover:bg-primary hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 transition-all shadow-xl active:scale-95"
               >
                  {sweeping ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Diagnostic Sweep'}
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
