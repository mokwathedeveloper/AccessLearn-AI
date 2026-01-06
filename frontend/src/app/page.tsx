import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Headphones, 
  Mic, 
  Brain, 
  Sparkles,
  Zap,
  ArrowUpRight,
  Play,
  Command,
  Plus
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
        {/* Master Tier Landing Page */}
        <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-56 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-teal-200/10 rounded-full blur-[150px]" />
          </div>
          
          <div className="wide-grid flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100/80 backdrop-blur border border-slate-200 text-[10px] font-black tracking-widest uppercase text-slate-500 animate-in fade-in slide-in-from-top-4 duration-1000 shadow-sm">
              <Command className="w-3 h-3" />
              <span>Universal Education Access v2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-950 leading-[0.9] max-w-4xl mx-auto">
              Intelligence <br/> <span className="text-primary italic">Redefined.</span>
            </h1>
            
            <p className="mx-auto max-w-xl text-base md:text-lg text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              AccessLearn AI decodes inaccessible materials into adaptive formats. 
              Built for students who demand independence.
            </p>
            
            <div className="flex items-center justify-center gap-5 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" className="h-14 px-10 rounded-xl text-sm font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" asChild>
                <Link href="/auth/sign-up">Build Your Account</Link>
              </Button>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all p-0" asChild>
                    <Link href="/auth/sign-in">
                      <Play className="w-5 h-5 text-primary ml-0.5 fill-current" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-widest">Resume Library</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Feature Grid - Elite Density */}
        <section className="bg-slate-50 py-32 lg:py-48 border-y border-slate-100">
          <div className="wide-grid">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              <FeatureItem 
                icon={<Brain className="w-5 h-5" />}
                title="Cognition"
                desc="Simplified text logic for deep comprehension."
              />
              <FeatureItem 
                icon={<Sparkles className="w-5 h-5" />}
                title="Intelligence"
                desc="AI-driven summaries of complex material."
              />
              <FeatureItem 
                icon={<Headphones className="w-5 h-5" />}
                title="Auditory"
                desc="Neural speech synthesis for mobile study."
              />
              <FeatureItem 
                icon={<Mic className="w-5 h-5" />}
                title="Control"
                desc="Voice navigation for hands-free access."
              />
            </div>
          </div>
        </section>

        {/* Closing Master CTA */}
        <section className="bg-slate-950 py-32 lg:py-40 relative overflow-hidden">
           <div className="wide-grid flex flex-col items-center text-center space-y-12 relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-none max-w-2xl">
                 Elevate Your Standard. <br/> <span className="text-primary italic">Join the Elite.</span>
              </h2>
              <div className="flex items-center gap-4">
                 <Button size="lg" className="h-14 px-12 rounded-xl text-sm font-black uppercase tracking-widest bg-white text-slate-950 hover:bg-primary hover:text-white transition-all shadow-2xl" asChild>
                    <Link href="/auth/sign-up text-slate-900">Get Free Access</Link>
                 </Button>
              </div>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-6 hover-lift group">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-600 font-medium text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}