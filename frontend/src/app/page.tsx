import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Headphones, Mic, Brain, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
            Education Made <span className="text-blue-600">Accessible</span> for Everyone
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl leading-relaxed">
            Convert lecture materials into inclusive formats instantly. 
            Summarize texts, generate audio, and simplify complex concepts with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href="/auth/sign-up">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
              <Link href="/auth/sign-in">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-blue-500" />}
            title="Smart Summaries"
            description="Instantly condense long readings into key concepts and digestible summaries."
          />
          <FeatureCard 
            icon={<Brain className="w-10 h-10 text-purple-500" />}
            title="Text Simplification"
            description="Transform complex academic language into plain, easy-to-understand text."
          />
          <FeatureCard 
            icon={<Headphones className="w-10 h-10 text-green-500" />}
            title="Text-to-Speech"
            description="Listen to your course materials on the go with natural-sounding AI voices."
          />
          <FeatureCard 
            icon={<Mic className="w-10 h-10 text-red-500" />}
            title="Voice Navigation"
            description="Navigate the platform entirely using voice commands for hands-free access."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-24">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Transform Your Learning?</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Join thousands of students using AccessLearn AI to make education more inclusive and effective.
          </p>
          <Button size="lg" variant="secondary" className="h-12 px-8 text-lg group" asChild>
            <Link href="/auth/sign-up">
              Create Your Account <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg bg-white/50 hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="mb-4 inline-block p-3 bg-gray-50 rounded-2xl">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}