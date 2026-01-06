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
      <div className="p-8 bg-red-50/30 rounded-xl border border-red-100 text-red-600 text-center space-y-2">
        <AlertCircle className="w-5 h-5 mx-auto opacity-50" />
        <p className="text-xs font-bold uppercase tracking-widest">Registry Link Failure</p>
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-xl p-16 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
           <FileText className="w-5 h-5 text-slate-200" />
        </div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Vault Empty</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3 items-stretch">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block h-full">
          <Card className="senior-card rounded-xl h-full">
            <CardContent className="p-5 flex flex-col h-full space-y-5">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                   <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <FileText className="w-4.5 h-4.5" />
                   </div>
                   <div className="space-y-0.5 overflow-hidden">
                      <h3 className="font-bold text-slate-900 text-xs truncate leading-tight tracking-tight" title={material.title}>
                        {material.title}
                      </h3>
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                   </div>
                </div>
                <StatusIcon status={material.status} />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                <Indicator active={!!material.audio_url} icon={<Headphones className="w-3 h-3" />} label="Audio" />
                <Indicator active={!!material.summary} icon={<Sparkles className="w-3 h-3" />} label="AI" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                 <span className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center group-hover:gap-1 transition-all">
                    Open <ChevronRight className="w-3 h-3" />
                 </span>
                 <span className="text-[8px] font-mono text-slate-300 opacity-60">#{material.id.substring(0,6)}</span>
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
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${active ? 'bg-primary/5 border-primary/10 text-primary' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-40'} text-[9px] font-bold uppercase tracking-tight`}>
         {icon} {label}
      </div>
   )
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <div className="text-teal-500 bg-teal-50 p-1.5 rounded-md border border-teal-100/50">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      )
    case 'processing':
      return (
        <div className="text-primary bg-primary/5 p-1.5 rounded-md border border-primary/10 animate-pulse">
          <Loader2 className="w-3 h-3 animate-spin" />
        </div>
      )
    case 'failed':
      return (
        <div className="text-red-500 bg-red-50 p-1.5 rounded-md border border-red-100">
          <AlertCircle className="w-3 h-3" />
        </div>
      )
    default:
      return (
        <div className="text-slate-400 bg-slate-50 p-1.5 rounded-md border border-slate-100">
          <Clock className="w-3 h-3" />
        </div>
      )
  }
}
