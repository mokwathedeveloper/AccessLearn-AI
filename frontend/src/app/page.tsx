import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Headphones, 
  Mic, 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowUpRight,
  Shield,
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
      <div className="flex flex-col min-h-screen">
        {/* Master Hero Section */}
        <section className="relative px-6 py-32 md:py-56 overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/10 rounded-full blur-[200px]" />
          </div>
          
          <div className="container mx-auto max-w-6xl space-y-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-primary text-sm font-black tracking-widest uppercase animate-in fade-in slide-in-from-top-4 duration-1000 shadow-xl">
              <Sparkles className="w-5 h-5" />
              <span>The Gold Standard of Accessibility</span>
            </div>
            
            <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-slate-900 leading-[0.9]">
              AI for <br/> <span className="text-primary italic">Every</span> Learner
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl text-slate-500/80 md:text-2xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              AccessLearn AI breaks the silence of inaccessible academic materials. 
              Turn static text into dynamic, multisensory learning experiences instantly.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="h-24 w-24 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(var(--primary),0.4)] hover:scale-110 active:scale-95 transition-all group p-0" asChild>
                    <Link href="/auth/sign-up">
                      <Zap className="w-10 h-10 fill-current" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-bold">Start Your Journey</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-24 w-24 rounded-[2.5rem] border-4 border-white shadow-2xl bg-white/50 backdrop-blur-md hover:bg-white transition-all group" asChild>
                    <Link href="/auth/sign-in">
                      <Play className="w-10 h-10 text-primary ml-1 fill-current" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-bold">Resume Learning</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Master Features Grid */}
        <section className="container mx-auto px-6 py-40">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard 
              icon={<FileText className="w-12 h-12" />}
              title="Smart Insights"
              description="Summarize thousand-page readings into key core concepts in seconds."
              delay="0"
            />
            <FeatureCard 
              icon={<Brain className="w-12 h-12" />}
              title="Cognitive Ease"
              description="Simplifies academic jargon into high-comprehension plain English."
              delay="100"
            />
            <FeatureCard 
              icon={<Headphones className="w-12 h-12" />}
              title="Adaptive Audio"
              description="Natural AI speech synthesis tuned for academic focus."
              delay="200"
            />
            <FeatureCard 
              icon={<Mic className="w-12 h-12" />}
              title="Hands-Free"
              description="Full platform control using high-accuracy voice recognition."
              delay="300"
            />
          </div>
        </section>

        {/* Floating CTA Icon Section */}
        <section className="bg-slate-900 py-40 relative overflow-hidden">
           <div className="container mx-auto px-6 flex flex-col items-center space-y-16">
              <div className="max-w-2xl text-center space-y-6">
                 <h2 className="text-5xl font-black text-white tracking-tight">Ready to Win?</h2>
                 <p className="text-slate-400 text-xl font-medium">Join the elite students using AI to master their education.</p>
              </div>
              
              <Tooltip>
                 <TooltipTrigger asChild>
                    <Button className="h-32 w-32 rounded-[3.5rem] bg-white text-slate-900 hover:bg-primary hover:text-white transition-all duration-500 group" asChild>
                       <Link href="/auth/sign-up">
                          <ArrowUpRight className="w-16 h-16 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                       </Link>
                    </Button>
                 </TooltipTrigger>
                 <TooltipContent side="top" className="text-lg font-black">Create Free Account</TooltipContent>
              </Tooltip>
           </div>
        </section>
      </div>
    </TooltipProvider>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <Card 
      className="glass-card group p-10 space-y-8 animate-in fade-in slide-in-from-bottom-12 transition-all duration-500 hover:-translate-y-4 hover:rotate-1"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-4 flex justify-end">
         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-5 h-5 text-primary" />
         </div>
      </div>
    </Card>
  )
}