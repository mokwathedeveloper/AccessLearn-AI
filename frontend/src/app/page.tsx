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
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-40 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto max-w-5xl space-y-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="w-4 h-4" />
            <span>AccessLearn AI v2.0 • Inclusive Education</span>
          </div>
          
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
            Learning without <span className="text-primary underline decoration-primary/30 underline-offset-8">Boundaries</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            AccessLearn AI transforms inaccessible academic materials into adaptive formats. 
            Empowering students with disabilities to learn independently through AI audio, 
            summaries, and simplified text.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group" asChild>
              <Link href="/auth/sign-up">
                Start Learning Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-2 hover:bg-secondary transition-all" asChild>
              <Link href="/auth/sign-in">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-secondary/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="99%" label="Accessibility Score" />
            <StatItem value="10k+" label="Documents Processed" />
            <StatItem value="24/7" label="AI Support" />
            <StatItem value="FREE" label="For Students" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-32 space-y-24">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">The Platform Built for <span className="text-primary">Inclusion</span></h2>
          <p className="text-muted-foreground text-lg">
            We've combined the latest LLMs with accessibility standards to create a seamless learning experience for every student.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-primary" />}
            title="Smart Summaries"
            description="Instantly condense long readings into key concepts and digestible summaries."
            delay="0"
          />
          <FeatureCard 
            icon={<Brain className="w-10 h-10 text-primary" />}
            title="Text Simplification"
            description="Transform complex academic language into plain, easy-to-understand text."
            delay="100"
          />
          <FeatureCard 
            icon={<Headphones className="w-10 h-10 text-primary" />}
            title="Text-to-Speech"
            description="Listen to your course materials on the go with natural-sounding AI voices."
            delay="200"
          />
          <FeatureCard 
            icon={<Mic className="w-10 h-10 text-primary" />}
            title="Voice Navigation"
            description="Navigate the platform entirely using voice commands for hands-free access."
            delay="300"
          />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] -z-0" />
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">Secure, Compliant, and Scalable</h2>
            <ul className="space-y-4">
              <TrustPoint text="Row-Level Security (RLS) for data privacy" />
              <TrustPoint text="GDPR & FERPA compliant architecture" />
              <TrustPoint text="High-contrast UI for visual accessibility" />
              <TrustPoint text="Instant processing with DeepSeek AI" />
            </ul>
            <Button variant="secondary" size="lg" className="rounded-full h-12" asChild>
              <Link href="/auth/sign-up">Get Started Today</Link>
            </Button>
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-md shadow-2xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                   <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h3 className="font-bold text-xl">Enterprise-Grade Security</h3>
                   <p className="text-white/60 text-sm">Built on Supabase & Radix UI</p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                   <div className="h-full bg-primary w-full animate-in slide-in-from-left duration-1000" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <div className="h-20 bg-white/5 rounded-2xl" />
                   <div className="h-20 bg-white/5 rounded-2xl" />
                   <div className="h-20 bg-white/5 rounded-2xl" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your Learning?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Join thousands of students using AccessLearn AI to make education more inclusive and effective.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full group" asChild>
              <Link href="/auth/sign-up">
                Create Free Account <Zap className="ml-2 w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <Card 
      className="group relative overflow-hidden border-none shadow-xl bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDuration: '1000ms', animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
      <CardContent className="p-8 space-y-4 pt-10">
        <div className="mb-6 inline-block p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl font-black text-primary">{value}</div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  )
}

function TrustPoint({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-primary" />
      <span className="text-white/80 font-medium">{text}</span>
    </li>
  )
}
