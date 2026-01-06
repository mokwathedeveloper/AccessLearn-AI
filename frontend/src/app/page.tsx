import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  FileText, 
  Headphones, 
  Mic, 
  Brain, 
  Sparkles,
  Zap,
  ArrowUpRight,
  Play
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
        {/* Master Tier Hero */}
        <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-56 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/10 rounded-full blur-[150px]" />
          </div>
          
          <div className="wide-container">
            <div className="flex flex-col items-center text-center space-y-12">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-black tracking-[0.25em] uppercase text-primary animate-in fade-in slide-in-from-top-4 duration-1000 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen Access Protocol</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 leading-[0.85] text-center max-w-5xl">
                Intelligence <br/> <span className="text-primary italic font-serif">Simplified.</span>
              </h1>
              
              <p className="mx-auto max-w-3xl text-lg text-slate-500/80 md:text-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                Break the barriers of static learning. Transform your lecture materials into neural-synced audio and adaptive insights instantly.
              </p>
              
              <div className="flex items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="h-20 w-20 rounded-[2.25rem] shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all duration-500 group p-0" asChild>
                      <Link href="/auth/sign-up">
                        <Zap className="w-9 h-9 fill-current" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold uppercase text-[10px] tracking-widest px-4 py-2">Initialize Account</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-20 w-20 rounded-[2.25rem] border-2 border-slate-200 bg-white/50 backdrop-blur-md hover:bg-white hover:border-primary/20 transition-all duration-500 p-0 shadow-xl" asChild>
                      <Link href="/auth/sign-in">
                        <Play className="w-9 h-9 text-primary ml-1 fill-current" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold uppercase text-[10px] tracking-widest px-4 py-2">Sync Dashboard</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        {/* Master Tier Features Grid */}
        <section className="bg-slate-50/50 py-32 lg:py-48 border-y border-slate-100/50">
          <div className="wide-container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              <PremiumFeatureCard 
                icon={<FileText className="w-10 h-10" />}
                title="Intelligence"
                desc="Automatic summarization of complex academic materials."
              />
              <PremiumFeatureCard 
                icon={<Brain className="w-10 h-10" />}
                title="Cognition"
                desc="Simplified text formats for better mental processing."
              />
              <PremiumFeatureCard 
                icon={<Headphones className="w-10 h-10" />}
                title="Auditory"
                desc="Neural text-to-speech engine for mobile learning."
              />
              <PremiumFeatureCard 
                icon={<Mic className="w-10 h-10" />}
                title="Control"
                desc="Full-platform navigation using neural voice commands."
              />
            </div>
          </div>
        </section>

        {/* Master CTA */}
        <section className="bg-slate-950 py-40 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/10 blur-[150px]" />
           <div className="wide-container flex flex-col items-center space-y-16 relative z-10">
              <div className="text-center space-y-6">
                 <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                    Lead the <span className="text-primary italic">Standard.</span>
                 </h2>
                 <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto">Master your education with the elite accessibility engine.</p>
              </div>
              <Tooltip>
                 <TooltipTrigger asChild>
                    <Button className="h-28 w-28 rounded-[3rem] bg-white text-slate-950 hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl hover:scale-110" asChild>
                       <Link href="/auth/sign-up">
                          <ArrowUpRight className="w-12 h-12 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                       </Link>
                    </Button>
                 </TooltipTrigger>
                 <TooltipContent side="top" className="font-bold uppercase tracking-widest text-[10px]">Create Account</TooltipContent>
              </Tooltip>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function PremiumFeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="master-card p-10 space-y-8 rounded-[2.5rem] bg-white group cursor-default h-full flex flex-col justify-between">
      <div className="space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 group-hover:scale-110 shadow-inner">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-slate-500 font-medium text-base leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="pt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0">
         <ArrowUpRight className="w-5 h-5 text-primary" />
      </div>
    </Card>
  )
}
