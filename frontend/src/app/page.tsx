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
      <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
        {/* Master OG Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
          <div className="wide-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-[10px] font-black tracking-widest uppercase text-primary border border-primary/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Version 2.0 Master Release</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Academic Content <br/>
                  <span className="text-primary italic font-serif">Redefined.</span>
                </h1>
                
                <p className="max-w-xl text-lg text-slate-500 font-medium leading-relaxed">
                  The world&apos;s first unified accessibility engine. Convert documents into audio, summaries, and simplified text with neural precision.
                </p>
                
                <div className="flex items-center gap-4 pt-4">
                  <Button size="lg" className="rounded-xl h-14 px-8 font-bold shadow-xl shadow-primary/20" asChild>
                    <Link href="/auth/sign-up">Start Learning Free</Link>
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-slate-200" asChild>
                        <Link href="/auth/sign-in">
                          <Play className="w-5 h-5 text-primary ml-0.5 fill-current" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Login to Dashboard</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 pt-12">
                    <FeatureBox icon={<Brain className="w-6 h-6" />} title="Simplification" />
                    <FeatureBox icon={<FileText className="w-6 h-6" />} title="Analysis" />
                  </div>
                  <div className="space-y-6">
                    <FeatureBox icon={<Headphones className="w-6 h-6" />} title="Neural TTS" />
                    <FeatureBox icon={<Mic className="w-6 h-6" />} title="Voice Flow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dense Features Grid */}
        <section className="bg-slate-50 py-24 lg:py-32">
          <div className="wide-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <PremiumFeature 
                icon={<Sparkles className="w-5 h-5" />}
                title="Deep Intelligence"
                desc="Summarize materials using DeepSeek V3 neural weights."
              />
              <PremiumFeature 
                icon={<Zap className="w-5 h-5" />}
                title="Instant Flow"
                desc="Real-time document processing and synchronization."
              />
              <PremiumFeature 
                icon={<Headphones className="w-5 h-5" />}
                title="High Fidelity"
                desc="Crystal clear AI voice generation for better focus."
              />
              <PremiumFeature 
                icon={<ArrowUpRight className="w-5 h-5" />}
                title="Growth Ready"
                desc="Built on Supabase for enterprise-grade scalability."
              />
            </div>
          </div>
        </section>

        {/* Master CTA */}
        <section className="py-24 lg:py-40 bg-slate-900 text-white">
          <div className="wide-container flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to Master Your <br/> Education?</h2>
              <p className="text-slate-400 text-lg font-medium">Join 5,000+ students today.</p>
            </div>
            <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-slate-950 hover:bg-primary hover:text-white transition-all text-lg font-black uppercase tracking-widest" asChild>
              <Link href="/auth/sign-up text-slate-900">Create Account</Link>
            </Button>
          </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function FeatureBox({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-4 items-start group hover:border-primary/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">{icon}</div>
      <span className="text-sm font-black uppercase tracking-widest text-slate-400">{title}</span>
    </div>
  )
}

function PremiumFeature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-slate-200/60 flex flex-col gap-4 hover:shadow-lg transition-all">
      <div className="text-primary">{icon}</div>
      <div className="space-y-1">
        <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-500 text-xs font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}