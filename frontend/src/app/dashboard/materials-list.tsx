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
      <div className="flex flex-col items-center justify-center p-12 bg-red-50/20 rounded-2xl border border-red-100/50 text-red-600 text-center space-y-2">
        <AlertCircle className="w-6 h-6 mx-auto" />
        <p className="font-bold text-xs uppercase tracking-widest">Network Interrupted</p>
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-20 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
           <FileText className="w-6 h-6 text-slate-200" />
        </div>
        <div className="space-y-1">
           <p className="text-slate-900 font-bold text-sm uppercase tracking-widest">Archive Depleted</p>
           <p className="text-slate-400 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">Execute your first neural conversion to populate the archive.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3 items-stretch">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block outline-none h-full">
          <Card className="hover-lift h-full border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
            <CardContent className="p-6 flex flex-col h-full space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                   <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div className="space-y-0.5 overflow-hidden">
                      <h3 className="font-bold text-slate-900 text-xs truncate leading-none tracking-tight uppercase" title={material.title}>
                        {material.title}
                      </h3>
                      <div className="flex items-center text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                         <Calendar className="w-2.5 h-2.5 mr-1" />
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                   </div>
                </div>
                <StatusIcon status={material.status} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 pt-1">
                  <FeatureIndicator active={!!material.audio_url} icon={<Headphones className="w-3 h-3" />} label="Audio" />
                  <FeatureIndicator active={!!material.summary} icon={<Sparkles className="w-3 h-3" />} label="Neural" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                 <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] flex items-center group-hover:translate-x-0.5 transition-transform">
                    Initialize Reader <ChevronRight className="w-3 h-3 ml-0.5" />
                 </span>
                 <span className="text-[8px] font-mono text-slate-300 font-bold">SHA:{material.id.substring(0,6).toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function FeatureIndicator({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
   return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${active ? 'bg-primary/5 border-primary/10 text-primary' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-60'} text-[9px] font-black uppercase tracking-wider`}>
         {icon} {label}
      </div>
   )
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <div className="text-teal-500 bg-teal-50 p-1.5 rounded-lg border border-teal-100/50">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      )
    case 'processing':
      return (
        <div className="text-primary bg-primary/5 p-1.5 rounded-lg border border-primary/10 animate-pulse">
          <Loader2 className="w-3 h-3 animate-spin" />
        </div>
      )
    case 'failed':
      return (
        <div className="text-red-500 bg-red-50 p-1.5 rounded-lg border border-red-100">
          <AlertCircle className="w-3 h-3" />
        </div>
      )
    default:
      return (
        <div className="text-slate-400 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
          <Clock className="w-3 h-3" />
        </div>
      )
  }
}