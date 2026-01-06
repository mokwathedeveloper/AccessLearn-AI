import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Sparkles,
  Play,
  Brain,
  Headphones,
  Mic,
  Activity,
  Globe,
  Lock,
  Cpu,
  Zap,
  ArrowUpRight,
  Shield
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
      <div className="flex flex-col min-h-screen bg-white">
        {/* Master Hero: High-Impact & Tight Spacing */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-50">
          <div className="app-container">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/5 text-[9px] font-black uppercase tracking-[0.2em] text-primary border border-primary/10">
                  <Sparkles className="w-3 h-3" />
                  <span>The New Standard in Inclusive Ed-Tech</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 leading-[0.95] tracking-tighter">
                  Knowledge <br/> <span className="text-primary italic">Without Barriers.</span>
                </h1>
                
                <p className="max-w-xl text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  Democratizing education through AI. AccessLearn AI decodes complex academic materials into adaptive audio and simplified logic, empowering every student to learn independently.
                </p>
                
                <div className="flex items-center gap-4 pt-2">
                  <Button size="lg" className="h-11 px-8 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" asChild>
                    <Link href="/auth/sign-up">Start Free Account</Link>
                  </Button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg border-slate-200" asChild>
                        <Link href="/auth/sign-in">
                          <Play className="w-4 h-4 text-primary ml-0.5 fill-current" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-[10px] font-bold uppercase">Open Dashboard</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="hidden lg:block space-y-4">
                 <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Live Impact Metrics</h3>
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
                    <HeroStat label="Active Learners" value="12,482" trend="+14% Growth" />
                    <HeroStat label="Neural Extractions" value="842,102" trend="Live" />
                    <HeroStat label="Inclusion Score" value="99.8%" trend="Stable" />
                 </div>
                 <div className="flex items-center gap-2 px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Access Active</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Feature Grid: Balanced & Functional */}
        <section className="bg-slate-50/50 py-16 lg:py-24 border-b border-slate-100">
          <div className="app-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SchematicCard 
                icon={<Brain className="w-5 h-5" />}
                title="Cognitive Support"
                label="Text Simplification"
                desc="Neutralizes academic jargon into high-comprehension, plain English logic."
              />
              <SchematicCard 
                icon={<Sparkles className="w-5 h-5" />}
                title="Neural Analysis"
                label="Smart Insights"
                desc="Instantly extracts core academic concepts and critical takeaways from dense readings."
              />
              <SchematicCard 
                icon={<Headphones className="w-5 h-5" />}
                title="Auditory Path"
                label="Neural TTS"
                desc="High-fidelity voice synthesis designed for focused, eyes-free academic consumption."
              />
              <SchematicCard 
                icon={<Mic className="w-5 h-5" />}
                title="Voice Interface"
                label="Total Control"
                desc="Full hands-free navigation using high-accuracy neural voice recognition."
              />
            </div>
          </div>
        </section>

        {/* Mission-Driven Section */}
        <section className="py-16 lg:py-24 bg-white">
           <div className="app-container">
              <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                 <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">Built for <span className="text-primary italic">Independence.</span></h2>
                    <p className="text-slate-500 max-w-lg leading-relaxed text-sm font-medium">AccessLearn AI isn&apos;t just a tool—it&apos;s a mission to ensure no student is left behind by inaccessible formats. Our architecture is built on privacy, empathy, and speed.</p>
                    <div className="grid grid-cols-2 gap-6 pt-2">
                       <InfrasItem icon={<Lock className="w-4 h-4" />} title="Private Vaults" />
                       <InfrasItem icon={<Shield className="w-4 h-4" />} title="Secure RLS" />
                       <InfrasItem icon={<Globe className="w-4 h-4" />} title="Global Edge" />
                       <InfrasItem icon={<Activity className="w-4 h-4" />} title="99% Uptime" />
                    </div>
                 </div>
                 <div className="w-full lg:w-[400px] aspect-video bg-slate-900 rounded-3xl p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
                    <div className="space-y-1 relative z-10">
                       <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Core Protocol</span>
                       <h3 className="text-2xl font-bold tracking-tighter">Verified Inclusion.</h3>
                    </div>
                    <div className="space-y-4 relative z-10">
                       <div className="h-[1px] bg-white/10 w-full" />
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status</span>
                          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Master Verified</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Catchy CTA */}
        <section className="bg-slate-950 py-20 relative overflow-hidden">
           <div className="app-container flex flex-col items-center text-center space-y-8 relative z-10">
              <div className="space-y-2">
                 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                    Transform Your <span className="text-primary italic">Learning Flow.</span>
                 </h2>
                 <p className="text-slate-500 font-medium text-sm">Join the next generation of independent learners.</p>
              </div>
              <Button size="lg" className="h-12 px-10 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] bg-white text-slate-950 hover:bg-primary hover:text-white transition-all shadow-2xl" asChild>
                 <Link href="/auth/sign-up">Start Independent Learning</Link>
              </Button>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function SchematicCard({ icon, title, label, desc }: { icon: React.ReactNode, title: string, label: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-6 hover:border-primary/30 hover:shadow-lg transition-all duration-500 group relative">
      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
        {icon}
      </div>
      <div className="space-y-3">
        <div className="space-y-0.5">
           <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{title}</h3>
           <p className="text-base font-bold text-slate-900 tracking-tight">{label}</p>
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
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</p>
            <p className="text-lg font-bold text-slate-900 tracking-tight">{value}</p>
         </div>
         <span className="text-[8px] font-black text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">{trend}</span>
      </div>
   )
}

function InfrasItem({ icon, title }: { icon: React.ReactNode, title: string }) {
   return (
      <div className="flex items-center gap-3 group cursor-default">
         <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">{icon}</div>
         <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{title}</span>
      </div>
   )
}
