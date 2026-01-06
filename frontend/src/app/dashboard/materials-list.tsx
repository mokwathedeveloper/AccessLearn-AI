import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      <div className="flex flex-col items-center justify-center p-12 bg-red-50/50 rounded-3xl border border-red-100 text-red-600 space-y-3">
        <AlertCircle className="w-8 h-8" />
        <p className="font-bold">Failed to load materials</p>
        <p className="text-sm">Please refresh the page or try again later.</p>
      </div>
    )
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-20 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
           <FileText className="w-10 h-10 text-slate-300" />
        </div>
        <div className="space-y-2 max-w-sm">
           <p className="text-slate-900 font-bold text-lg">No materials found</p>
           <p className="text-slate-500 text-sm">Upload your first academic document above to start the AI transformation process.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {materials.map((material) => (
        <Link key={material.id} href={`/dashboard/material/${material.id}`} className="group block outline-none">
          <Card className="overflow-hidden border-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20 group-hover:-translate-y-1 bg-white relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/10 group-hover:bg-primary transition-colors" />
            
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary transition-colors group-hover:bg-primary/10">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors" title={material.title}>
                        {material.title}
                      </h3>
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <Calendar className="w-3 h-3 mr-1" />
                         {new Date(material.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                   </div>
                </div>
                <StatusBadge status={material.status} />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <FeatureIndicator active={!!material.audio_url} icon={<Headphones className="w-3.5 h-3.5" />} label="Audio" />
                <FeatureIndicator active={!!material.summary} icon={<Sparkles className="w-3.5 h-3.5" />} label="AI Insights" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                 <span className="text-xs font-bold text-primary flex items-center group-hover:translate-x-1 transition-transform">
                    Review Content <ChevronRight className="w-3 h-3 ml-1" />
                 </span>
                 <span className="text-[10px] text-slate-300 font-medium">ID: {material.id.substring(0,8)}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function FeatureIndicator({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) {
   if (!active) return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-slate-200 text-slate-300 text-[10px] font-bold uppercase grayscale">
         {icon} {label}
      </div>
   )
   return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-teal-600 text-[10px] font-bold uppercase">
         {icon} {label}
      </div>
   )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="success" className="bg-teal-100/50 text-teal-700 border-teal-200 shadow-none px-3 py-1">
          <CheckCircle2 className="w-3 h-3 mr-1.5" />
          Ready
        </Badge>
      )
    case 'processing':
      return (
        <Badge variant="processing" className="bg-blue-50 text-blue-700 border-blue-100 shadow-none px-3 py-1">
          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
          Analyzing
        </Badge>
      )
    case 'failed':
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-100 shadow-none px-3 py-1">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Failed
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 shadow-none px-3 py-1 font-bold">
          <Clock className="w-3 h-3 mr-1.5" />
          Queued
        </Badge>
      )
  }
}