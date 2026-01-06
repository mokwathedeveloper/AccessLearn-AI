import { requireRole } from '@/lib/auth/server'
import { UploadSection } from './upload-section'
import { MaterialsList } from './materials-list'
import { Suspense } from 'react'
import { Loader2, Plus, Sparkles, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="container mx-auto p-6 md:p-10 space-y-12 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Student Hub
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Learning <span className="text-primary">Library</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Upload your academic materials and let AI transform them into accessible formats.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end px-4 border-r border-slate-200">
                <span className="text-xs font-bold text-muted-foreground uppercase">Platform Status</span>
                <span className="text-sm font-bold text-teal-600 flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> AI Processing Online
                </span>
             </div>
             <Button className="rounded-full shadow-lg shadow-primary/20 h-12 px-6">
                <BookOpen className="w-4 h-4 mr-2" /> Browse Guide
             </Button>
          </div>
        </div>
        
        <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Plus className="w-5 h-5" />
                 </div>
                 <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Transform New Material</h2>
              </div>
              <UploadSection />
            </section>
            
            <section className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                       <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Recent Materials</h2>
                 </div>
                 <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/5">View All</Button>
              </div>
              
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
                  <p className="text-sm font-medium text-slate-400">Loading your materials...</p>
                </div>
              }>
                <MaterialsList />
              </Suspense>
            </section>
          </div>

          <aside className="space-y-8">
             <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-0 group-hover:bg-primary/30 transition-colors" />
                <h3 className="font-black text-xl relative z-10">Accessibility Tip</h3>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                   Try using <strong>"Speak Content"</strong> voice command on any material page to hear the AI summary instantly.
                </p>
                <div className="pt-4 relative z-10">
                   <Button variant="secondary" className="w-full rounded-xl font-bold bg-white/10 hover:bg-white/20 border-white/10 text-white">
                      View Voice Guide
                   </Button>
                </div>
             </div>

             <div className="rounded-3xl border border-slate-200 p-8 space-y-6 bg-white shadow-sm">
                <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">AI Stats</h3>
                <div className="space-y-4 text-sm font-medium">
                   <StatRow label="Processing Speed" value="~15s" />
                   <StatRow label="Supported Formats" value="PDF, TXT" />
                   <StatRow label="Accuracy" value="98.4%" />
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
         <span className="text-slate-500">{label}</span>
         <span className="text-slate-900 font-bold">{value}</span>
      </div>
   )
}