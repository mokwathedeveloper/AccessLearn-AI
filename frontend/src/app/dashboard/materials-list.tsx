import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Headphones, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Calendar,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export async function MaterialsList() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: materials, error } = await supabase
    .from('materials')
    .select('*')
    .eq('uploaded_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50/30 rounded-3xl border border-red-100 text-red-600 text-center space-y-3">
        <AlertCircle className="w-8 h-8 opacity-50" />
        <p className="font-bold text-sm tracking-tight uppercase">Registry Timeout</p>
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-24 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
           <FileText className="w-8 h-8 text-slate-200" />
        </div>
        <div className="space-y-1">
           <p className="text-slate-900 font-bold text-lg uppercase tracking-tight">Vault Empty</p>
           <p className="text-slate-400 text-xs font-medium max-w-[200px] mx-auto">Upload a document to initialize your neural archive.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 items-stretch">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block outline-none h-full">
          <Card className="master-card rounded-2xl">
            <CardContent className="p-7 flex flex-col h-full space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div className="space-y-1 overflow-hidden">
                      <h3 className="font-bold text-slate-900 text-sm truncate leading-none tracking-tight uppercase" title={material.title}>
                        {material.title}
                      </h3>
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <Calendar className="w-3 h-3 mr-1.5 opacity-60" />
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                   </div>
                </div>
                <StatusIndicator status={material.status} />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <FeaturePill active={!!material.audio_url} icon={<Headphones className="w-3.5 h-3.5" />} label="Audio" />
                  <FeaturePill active={!!material.summary} icon={<Sparkles className="w-3.5 h-3.5" />} label="Neural" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em] flex items-center group-hover:gap-2 transition-all">
                    Open Reader <ChevronRight className="w-3.5 h-3.5" />
                 </span>
                 <span className="text-[9px] font-mono text-slate-300 font-bold">ID:{material.id.substring(0,6).toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function FeaturePill({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
   return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${active ? 'bg-primary/5 border-primary/10 text-primary shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-60'} text-[10px] font-black uppercase tracking-wider transition-colors`}>
         {icon} {label}
      </div>
   )
}

function StatusIndicator({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <div className="text-teal-500 bg-teal-50 p-2 rounded-xl border border-teal-100/50 shadow-sm" title="Ready">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )
    case 'processing':
      return (
        <div className="text-primary bg-primary/5 p-2 rounded-xl border border-primary/10 animate-pulse shadow-sm" title="Processing">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )
    case 'failed':
      return (
        <div className="text-red-500 bg-red-50 p-2 rounded-xl border border-red-100 shadow-sm" title="Error">
          <AlertCircle className="w-4 h-4" />
        </div>
      )
    default:
      return (
        <div className="text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-100" title="Queued">
          <Clock className="w-4 h-4" />
        </div>
      )
  }
}
