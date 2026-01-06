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
        <p className="font-bold text-sm uppercase tracking-tight">Access Link Broken</p>
        <p className="text-[10px] font-bold uppercase opacity-60">Database connection failed</p>
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-24 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
           <FileText className="w-8 h-8 text-slate-200" />
        </div>
        <div className="space-y-1">
           <p className="text-slate-900 font-black text-lg uppercase tracking-tight">No Material Found</p>
           <p className="text-slate-400 text-xs font-medium max-w-[200px] mx-auto">Upload documents to populate your intelligence archive.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block outline-none">
          <Card className="overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 bg-white relative">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div className="space-y-0.5">
                      <h3 className="font-black text-slate-900 text-sm line-clamp-1 leading-tight tracking-tight uppercase" title={material.title}>
                        {material.title}
                      </h3>
                      <div className="flex items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                         <Calendar className="w-2.5 h-2.5 mr-1" />
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                   </div>
                </div>
                <StatusIcon status={material.status} />
              </div>

              <div className="flex items-center gap-2">
                <FeatureTag active={!!material.audio_url} icon={<Headphones className="w-3 h-3" />} label="Audio" />
                <FeatureTag active={!!material.summary} icon={<Sparkles className="w-3 h-3" />} label="Neural" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em] flex items-center group-hover:translate-x-1 transition-transform">
                    Initialize Reader <ChevronRight className="w-3 h-3 ml-1" />
                 </span>
                 <span className="text-[9px] font-mono text-slate-300">ID:{material.id.substring(0,6).toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function FeatureTag({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
   return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md border ${active ? 'bg-primary/5 border-primary/10 text-primary' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-60'} text-[9px] font-black uppercase tracking-wider`}>
         {icon} {label}
      </div>
   )
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <div className="text-teal-500 bg-teal-50 p-1.5 rounded-lg border border-teal-100">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      )
    case 'processing':
      return (
        <div className="text-primary bg-primary/5 p-1.5 rounded-lg border border-primary/10 animate-pulse">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        </div>
      )
    case 'failed':
      return (
        <div className="text-red-500 bg-red-50 p-1.5 rounded-lg border border-red-100">
          <AlertCircle className="w-3.5 h-3.5" />
        </div>
      )
    default:
      return (
        <div className="text-slate-400 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
          <Clock className="w-3.5 h-3.5" />
        </div>
      )
  }
}