import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Sparkles,
  ArrowUpRight,
  Play,
  LayoutGrid,
  Shield,
  Brain,
  Headphones,
  Mic,
  Activity,
  Globe,
  Lock,
  Cpu
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
        {/* Master Hero: Split Intelligence Layout */}
        <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-40 border-b border-slate-100">
          <div className="app-container">
            <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 animate-in fade-in slide-in-from-top-4 duration-700">
                  <Cpu className="w-3 h-3 text-primary" />
                  <span>Access Protocol v2.0 Live</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.95] max-w-3xl">
                  Educational Content <br/> <span className="text-primary italic">Decoded by AI.</span>
                </h1>
                
                <p className="max-w-xl text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  The world&apos;s most advanced accessibility engine. We transform static materials into adaptive, neural-synced formats for high-performance learning.
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <Button size="lg" className="h-11 px-8 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/10 transition-all" asChild>
                    <Link href="/auth/sign-up">Initialize Account</Link>
                  </Button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg border-slate-200 bg-white hover:bg-slate-50 transition-all" asChild>
                        <Link href="/auth/sign-in">
                          <Play className="w-4 h-4 text-primary ml-0.5 fill-current" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[10px] font-bold">Resume Session</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Sidebar Stats: High-Density Info */}
              <div className="hidden lg:block space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Network Status</h3>
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
                    <HeroStat label="Active Students" value="12.4k" trend="+14%" />
                    <HeroStat label="Documents Synced" value="842k" trend="Live" />
                    <HeroStat label="AI Throughput" value="99.8%" trend="Stable" />
                 </div>
                 <div className="flex items-center gap-3 px-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Neural Nodes Online</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Grid: Schematic Design */}
        <section className="bg-slate-50/50 py-24 border-b border-slate-100">
          <div className="app-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SchematicCard 
                icon={<Brain className="w-5 h-5" />}
                title="Cognition"
                label="Simplification"
                desc="Converts academic jargon into high-comprehension logic."
              />
              <SchematicCard 
                icon={<Sparkles className="w-5 h-5" />}
                title="Intelligence"
                label="Summarization"
                desc="Extracts core concepts from dense materials instantly."
              />
              <SchematicCard 
                icon={<Headphones className="w-5 h-5" />}
                title="Auditory"
                label="Neural TTS"
                desc="Studio-quality voice generation for eyes-free study."
              />
              <SchematicCard 
                icon={<Mic className="w-5 h-5" />}
                title="Control"
                label="Voice Pilot"
                desc="Complete platform navigation using neural commands."
              />
            </div>
          </div>
        </section>

        {/* Security & Infrastructure: High Density */}
        <section className="py-24 lg:py-32 bg-white">
           <div className="app-container">
              <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                 <div className="flex-1 space-y-8">
                    <h2 className="text-3xl font-bold tracking-tighter text-slate-900 uppercase">Built for Privacy.</h2>
                    <p className="text-slate-500 max-w-lg leading-relaxed">Our infrastructure uses enterprise-grade encryption and Row-Level Security to ensure your academic vault remains private.</p>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                       <InfrasItem icon={<Lock className="w-4 h-4" />} title="AES-256 Encryption" />
                       <InfrasItem icon={<Shield className="w-4 h-4" />} title="RLS Data Isolation" />
                       <InfrasItem icon={<Globe className="w-4 h-4" />} title="Edge Optimized" />
                       <InfrasItem icon={<Activity className="w-4 h-4" />} title="SOC2 Compliant" />
                    </div>
                 </div>
                 <div className="w-full lg:w-[450px] aspect-square bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
                    <div className="space-y-2 relative z-10">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Core</span>
                       <h3 className="text-4xl font-bold leading-none tracking-tighter">Verified Architecture.</h3>
                    </div>
                    <div className="space-y-6 relative z-10">
                       <div className="h-[1px] bg-white/10 w-full" />
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-widest opacity-60">Status</span>
                          <span className="text-xs font-bold text-teal-400">100% Secure</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Terminal CTA */}
        <section className="bg-slate-950 py-32 relative overflow-hidden border-t border-white/5">
           <div className="app-container flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="space-y-3">
                 <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                    Initialize Your <br/> <span className="text-primary italic">Learning Flow.</span>
                 </h2>
                 <p className="text-slate-500 font-medium">Join 5,000+ elite students mastering their education.</p>
              </div>
              <Button size="lg" className="h-14 px-12 rounded-xl text-xs font-black uppercase tracking-widest bg-white text-slate-950 hover:bg-primary hover:text-white transition-all shadow-2xl" asChild>
                 <Link href="/auth/sign-up">Start Neural Sync</Link>
              </Button>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function SchematicCard({ icon, title, label, desc }: { icon: React.ReactNode, title: string, label: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-8 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group relative">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">{title}</h3>
           <p className="text-lg font-bold text-slate-900 tracking-tight">{label}</p>
        </div>
        <p className="text-slate-500 font-medium text-xs leading-relaxed">{desc}</p>
      </div>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowUpRight className="w-4 h-4 text-primary" />
      </div>
    </div>
  )
}

function HeroStat({ label, value, trend }: { label: string, value: string, trend: string }) {
   return (
      <div className="flex items-center justify-between group">
         <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
            <p className="text-xl font-bold text-slate-900 tracking-tight">{value}</p>
         </div>
         <span className="text-[9px] font-black text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase">{trend}</span>
      </div>
   )
}

function InfrasItem({ icon, title }: { icon: React.ReactNode, title: string }) {
   return (
      <div className="flex items-center gap-3 group cursor-default">
         <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">{icon}</div>
         <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{title}</span>
      </div>
   )
}