import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Mail, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  IdCard, 
  ArrowLeft,
  Settings,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/sign-in')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <p className="text-slate-500 font-medium">Profile data not found.</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        <div className="wide-grid py-12 lg:py-20 space-y-10">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Button variant="ghost" size="sm" asChild className="mb-4 h-8 rounded-full bg-white shadow-sm border border-slate-200">
                <Link href={profile.role === 'admin' ? '/admin' : '/dashboard'}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Back to {profile.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900">Account <span className="text-primary italic">Intelligence.</span></h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white" asChild>
                    <Link href="/settings">
                      <Settings className="w-4.5 h-4.5 text-slate-500" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1 border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
              <div className="h-32 bg-slate-900 relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-[1.8rem] bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="pt-16 pb-10 text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">{profile.full_name}</h2>
                  <div className="flex justify-center">
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                      profile.role === 'admin' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'
                    }`}>
                      {profile.role === 'admin' ? <Shield className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                      {profile.role}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium italic opacity-70">Secured via Neural RLS Protocols</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="p-10 border-b border-slate-50">
                <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Identity Registry</CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Verified institutional data</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  <ProfileInfoRow 
                    icon={<Mail className="w-4 h-4" />} 
                    label="Digital Identity" 
                    value={profile.email} 
                  />
                  <ProfileInfoRow 
                    icon={<Building2 className="w-4 h-4" />} 
                    label="Institution" 
                    value={profile.institution} 
                  />
                  {profile.role === 'student' ? (
                    <ProfileInfoRow 
                      icon={<IdCard className="w-4 h-4" />} 
                      label="Admission ID" 
                      value={profile.admission_number} 
                    />
                  ) : (
                    <ProfileInfoRow 
                      icon={<ShieldCheck className="w-4 h-4" />} 
                      label="Staff Token" 
                      value={profile.staff_number} 
                    />
                  )}
                </div>
                <div className="p-10 bg-slate-50/50">
                   <div className="p-6 rounded-2xl border border-dashed border-slate-200 bg-white/50 flex items-center justify-between">
                      <div className="space-y-1">
                         <p className="text-xs font-black uppercase tracking-widest text-slate-900">Security Level</p>
                         <p className="text-[10px] font-medium text-slate-500">End-to-end encrypted studyship</p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-teal-500" />
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function ProfileInfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-8 flex items-center gap-6 group hover:bg-slate-50/50 transition-all">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
        <p className="text-base font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  )
}
