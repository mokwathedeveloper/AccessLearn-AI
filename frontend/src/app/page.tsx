import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Sparkles,
  Zap,
  ArrowUpRight,
  Play,
  Command,
  LayoutGrid,
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
        {/* Senior Precision Landing */}
        <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-56 border-b border-slate-50">
          <div className="app-container">
            <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 animate-in fade-in slide-in-from-top-4 duration-700">
                <Command className="w-3 h-3" />
                <span>Next-Gen Access Protocol v2.0</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.95]">
                Education <span className="text-primary">Decoded.</span>
              </h1>
              
              <p className="max-w-2xl text-base md:text-lg text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                AccessLearn AI transforms inaccessible academic documents into smart, adaptive formats. 
                Built for students who demand independence and high-performance learning.
              </p>
              
              <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <Button size="lg" className="h-12 px-8 rounded-lg text-sm font-bold shadow-lg shadow-primary/10 transition-all" asChild>
                  <Link href="/auth/sign-up">Start Free Trial</Link>
                </Button>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg border-slate-200 bg-white hover:bg-slate-50 transition-all" asChild>
                      <Link href="/auth/sign-in">
                        <Play className="w-4 h-4 text-primary ml-0.5 fill-current" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] font-bold">Sign In</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>

        {/* Dense Professional Grid */}
        <section className="bg-slate-50/50 py-24 lg:py-32">
          <div className="app-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              <GridFeature 
                icon={<LayoutGrid className="w-5 h-5" />}
                title="Intelligence"
                desc="Automatic summarization of dense materials."
              />
              <GridFeature 
                icon={<Sparkles className="w-5 h-5" />}
                title="Clarity"
                desc="Plain English simplification for cognitive focus."
              />
              <GridFeature 
                icon={<Play className="w-5 h-5" />}
                title="Auditory"
                desc="Natural AI voice generation for mobile study."
              />
              <GridFeature 
                icon={<Shield className="w-5 h-5" />}
                title="Security"
                desc="Enterprise isolation for your private documents."
              />
            </div>
          </div>
        </section>

        {/* Professional Footer CTA */}
        <section className="bg-slate-900 py-32 relative overflow-hidden">
           <div className="app-container flex flex-col items-center text-center space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
                 Elevate Your Standard. <br/> <span className="text-primary">Join the Elite.</span>
              </h2>
              <Button size="lg" className="h-14 px-12 rounded-xl text-sm font-black uppercase tracking-widest bg-white text-slate-950 hover:bg-primary hover:text-white transition-all shadow-2xl shadow-white/5" asChild>
                 <Link href="/auth/sign-up">Join 5,000+ Students</Link>
              </Button>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function GridFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-xl bg-white border border-slate-200/60 flex flex-col gap-6 hover:border-primary/20 transition-all group">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-600 font-medium text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
