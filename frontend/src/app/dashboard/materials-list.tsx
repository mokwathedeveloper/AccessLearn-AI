'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Headphones, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Loader2,
  ChevronRight,
  DatabaseZap
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Material {
  id: string;
  title: string;
  status: string;
  audio_url: string | null;
  summary: string | null;
  created_at: string;
}

export function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('uploaded_by', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Fetch error:', error)
        setError(true)
      } else {
        setMaterials(data || [])
      }
      setLoading(false)
    }

    fetchMaterials()

    // Real-time subscription for status updates
    const channel = supabase
      .channel('materials-status-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'materials' },
        () => {
          fetchMaterials()
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Syncing Intelligence...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50/30 rounded-xl border border-red-100 text-red-600 text-center space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto opacity-50" />
        <p className="text-xs font-bold uppercase tracking-widest text-red-700">Registry Link Failure</p>
        <p className="text-[10px] font-medium opacity-70 uppercase">Check your connection to the neural grid</p>
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] p-24 border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 shadow-sm group">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary/5 group-hover:scale-110">
           <DatabaseZap className="w-8 h-8 text-slate-200 group-hover:text-primary/30" />
        </div>
        <div className="space-y-1">
          <p className="text-slate-900 text-sm font-black uppercase tracking-widest">Vault Empty</p>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter opacity-60">Upload your first lecture to begin analysis</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3 items-stretch">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block h-full">
          <Card className="senior-card rounded-[2rem] h-full border-slate-200/60 shadow-sm bg-white overflow-hidden relative transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col h-full space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                   <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div className="space-y-0.5 overflow-hidden">
                      <h3 className="font-black text-slate-900 text-[13px] truncate leading-tight tracking-tight uppercase" title={material.title}>
                        {material.title}
                      </h3>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60 flex items-center gap-2">
                         <Clock className="w-2.5 h-2.5" />
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                   </div>
                </div>
                <StatusBadge status={material.status} />
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <Indicator active={!!material.audio_url} icon={<Headphones className="w-3 h-3" />} label="Audio" />
                <Indicator active={!!material.summary} icon={<Sparkles className="w-3 h-3" />} label="Neural" />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-4">
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Access Intelligence <ChevronRight className="w-3 h-3" />
                 </span>
                 <span className="text-[8px] font-mono text-slate-300 opacity-40 tracking-tighter">HEX_{material.id.substring(0,6).toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function Indicator({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
   return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${active ? 'bg-primary/5 border-primary/10 text-primary font-bold' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-40 font-medium'} text-[9px] uppercase tracking-tight`}>
         {icon} {label}
      </div>
   )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <div className="text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Ready
        </div>
      )
    case 'processing':
      return (
        <div className="text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 animate-pulse shadow-sm">
          <Loader2 className="w-2.5 h-2.5 animate-spin" />
          Syncing
        </div>
      )
    case 'failed':
      return (
        <div className="text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
          <AlertCircle className="w-2.5 h-2.5" />
          Error
        </div>
      )
    default:
      return (
        <div className="text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
          <Clock className="w-2.5 h-2.5" />
          Pending
        </div>
      )
  }
}
