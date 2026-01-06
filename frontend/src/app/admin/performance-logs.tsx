'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Activity, Clock, Globe, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PerformanceLog {
  id: string
  method: string
  route: string
  status_code: number
  duration_ms: number
  created_at: string
}

export function PerformanceLogs() {
  const [logs, setLogs] = useState<PerformanceLog[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('performance_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (!error && data) {
        setLogs(data)
      }
      setLoading(false)
    }

    fetchLogs()

    // Subscribe to new logs
    const channel = supabase
      .channel('performance_logs_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'performance_logs' },
        (payload) => {
          setLogs((prev) => [payload.new as PerformanceLog, ...prev.slice(0, 9)])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Syncing Intelligence Stream...</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-50">
      {logs.length === 0 ? (
        <div className="p-12 text-center space-y-2">
          <Activity className="w-8 h-8 text-slate-200 mx-auto" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No performance data yet</p>
        </div>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${
                log.status_code >= 400 ? 'bg-red-50 border-red-100 text-red-500' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <span className="text-[10px] font-black">{log.method}</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-primary transition-colors">{log.route}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {log.duration_ms}ms
                  </div>
                  <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                    log.status_code < 300 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    HTTP {log.status_code}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
