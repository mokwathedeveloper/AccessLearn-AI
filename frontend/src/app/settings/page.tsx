import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Bell, 
  Shield, 
  Volume2, 
  Eye, 
  ArrowLeft,
  Smartphone,
  Globe,
  Save
} from 'lucide-react'
import Link from 'next/link'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/sign-in')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        <div className="wide-grid py-12 lg:py-20 space-y-10">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Button variant="ghost" size="sm" asChild className="mb-4 h-8 rounded-full bg-white shadow-sm border border-slate-200">
                <Link href={profile?.role === 'admin' ? '/admin' : '/dashboard'}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900">Control <span className="text-primary italic">Center.</span></h1>
            </div>
            
            <Button className="h-10 px-6 rounded-xl shadow-lg shadow-primary/20 font-bold text-xs uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="space-y-2">
               <SettingsNavButton icon={<Eye className="w-4 h-4" />} label="Appearance" active />
               <SettingsNavButton icon={<Volume2 className="w-4 h-4" />} label="Audio & Voice" />
               <SettingsNavButton icon={<Bell className="w-4 h-4" />} label="Notifications" />
               <SettingsNavButton icon={<Shield className="w-4 h-4" />} label="Privacy & Security" />
               <SettingsNavButton icon={<Globe className="w-4 h-4" />} label="Language" />
            </aside>

            {/* Content Area */}
            <div className="space-y-8">
               <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="p-10 border-b border-slate-50">
                     <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Accessibility Preferences</CardTitle>
                     <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Tailor your learning experience</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 space-y-10">
                     
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Visual Interface</h4>
                        <div className="grid gap-6 md:grid-cols-2">
                           <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-700">Contrast Mode</Label>
                              <div className="flex gap-2">
                                 <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold border-slate-200 bg-slate-50 text-slate-900">Standard</Button>
                                 <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold border-slate-200">High Contrast</Button>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-700">Text Size</Label>
                              <div className="flex gap-2">
                                 <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold border-slate-200">Default</Button>
                                 <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold border-slate-200">Large</Button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="h-[1px] bg-slate-100 w-full" />

                     <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Audio Processing</h4>
                        <div className="grid gap-6 md:grid-cols-2">
                           <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-700">Voice Synthesis Speed</Label>
                              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                 <span className="text-[10px] font-black text-slate-400 uppercase">1.0x</span>
                                 <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[40%]" />
                                 </div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase">2.0x</span>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-700">Voice Recognition</Label>
                              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                 <span className="text-xs font-bold text-slate-600">Continuous Listening</span>
                                 <div className="w-10 h-5 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  </CardContent>
               </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function SettingsNavButton({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
   return (
      <Button 
        variant="ghost" 
        className={`w-full justify-start h-12 rounded-xl px-4 gap-3 transition-all ${
          active ? 'bg-white shadow-sm border border-slate-200 text-primary' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:border-slate-200'
        }`}
      >
         <div className={`${active ? 'text-primary' : 'text-slate-400'}`}>{icon}</div>
         <span className={`text-xs font-bold ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
      </Button>
   )
}
