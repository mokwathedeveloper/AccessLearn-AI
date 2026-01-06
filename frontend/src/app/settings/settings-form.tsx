'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  Bell, 
  Shield, 
  Volume2, 
  Eye, 
  Globe,
  Save,
  Check,
  Mail,
  Smartphone,
  ShieldCheck,
  History,
  Trash2
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'

type ContrastMode = 'standard' | 'high-contrast'
type TextSize = 'default' | 'large'

export function SettingsForm() {
  const [contrastMode, setContrastMode] = useState<ContrastMode>('standard')
  const [textSize, setTextSize] = useState<TextSize>('default')
  const [voiceSpeed, setVoiceSpeed] = useState([1.0])
  const [continuousListening, setContinuousListening] = useState(false)
  const [activeTab, setActiveTab] = useState('appearance')
  const [isSaving, setIsSaving] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [studyReminders, setStudyReminders] = useState(true)
  const [materialsAlerts, setMaterialsAlerts] = useState(true)

  // Privacy states
  const [twoFactor, setTwoFactor] = useState(false)
  const [dataEncryption, setDataEncryption] = useState(true)

  // Language state
  const [language, setLanguage] = useState('English (US)')

  // Load settings on mount
  useEffect(() => {
    const savedContrast = localStorage.getItem('accesslearn_contrast') as ContrastMode
    const savedTextSize = localStorage.getItem('accesslearn_text_size') as TextSize
    const savedVoiceSpeed = localStorage.getItem('accesslearn_voice_speed')
    const savedListening = localStorage.getItem('accesslearn_listening')
    
    // Notifications
    const savedEmail = localStorage.getItem('accesslearn_email_notif')
    const savedReminders = localStorage.getItem('accesslearn_reminders')
    const savedAlerts = localStorage.getItem('accesslearn_alerts')

    // Privacy
    const saved2fa = localStorage.getItem('accesslearn_2fa')
    const savedLang = localStorage.getItem('accesslearn_lang')

    if (savedContrast) setContrastMode(savedContrast)
    if (savedTextSize) setTextSize(savedTextSize)
    if (savedVoiceSpeed) setVoiceSpeed([parseFloat(savedVoiceSpeed)])
    if (savedListening) setContinuousListening(savedListening === 'true')
    
    if (savedEmail !== null) setEmailNotifications(savedEmail === 'true')
    if (savedReminders !== null) setStudyReminders(savedReminders === 'true')
    if (savedAlerts !== null) setMaterialsAlerts(savedAlerts === 'true')
    
    if (saved2fa !== null) setTwoFactor(saved2fa === 'true')
    if (savedLang) setLanguage(savedLang)
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    
    setTimeout(() => {
      localStorage.setItem('accesslearn_contrast', contrastMode)
      localStorage.setItem('accesslearn_text_size', textSize)
      localStorage.setItem('accesslearn_voice_speed', voiceSpeed[0].toString())
      localStorage.setItem('accesslearn_listening', continuousListening.toString())
      
      localStorage.setItem('accesslearn_email_notif', emailNotifications.toString())
      localStorage.setItem('accesslearn_reminders', studyReminders.toString())
      localStorage.setItem('accesslearn_alerts', materialsAlerts.toString())
      
      localStorage.setItem('accesslearn_2fa', twoFactor.toString())
      localStorage.setItem('accesslearn_lang', language)
      
      applySettings()
      
      setIsSaving(false)
      setHasSaved(true)
      setTimeout(() => setHasSaved(false), 2000)
    }, 800)
  }

  const applySettings = () => {
    const root = document.documentElement
    if (contrastMode === 'high-contrast') {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    if (textSize === 'large') {
      root.style.fontSize = '18px'
    } else {
      root.style.fontSize = '16px'
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">Control <span className="text-primary italic">Center.</span></h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Manage your accessibility environment</p>
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="h-10 px-6 rounded-xl shadow-lg shadow-primary/20 font-bold text-xs uppercase tracking-widest min-w-[140px]"
        >
          {isSaving ? (
            "Saving..."
          ) : hasSaved ? (
            <><Check className="w-4 h-4 mr-2" /> Saved</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
          )}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
           <SettingsNavButton 
             icon={<Eye className="w-4 h-4" />} 
             label="Appearance" 
             active={activeTab === 'appearance'} 
             onClick={() => setActiveTab('appearance')}
           />
           <SettingsNavButton 
             icon={<Volume2 className="w-4 h-4" />} 
             label="Audio & Voice" 
             active={activeTab === 'audio'} 
             onClick={() => setActiveTab('audio')}
           />
           <SettingsNavButton 
             icon={<Bell className="w-4 h-4" />} 
             label="Notifications" 
             active={activeTab === 'notifications'} 
             onClick={() => setActiveTab('notifications')}
           />
           <SettingsNavButton 
             icon={<Shield className="w-4 h-4" />} 
             label="Privacy & Security" 
             active={activeTab === 'security'} 
             onClick={() => setActiveTab('security')}
           />
           <SettingsNavButton 
             icon={<Globe className="w-4 h-4" />} 
             label="Language" 
             active={activeTab === 'language'} 
             onClick={() => setActiveTab('language')}
           />
        </aside>

        <div className="space-y-8">
           {activeTab === 'appearance' && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Visual Interface</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Tailor your viewing experience</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                   <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                         <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Contrast Mode</Label>
                         <div className="flex gap-2">
                            <Button 
                              variant={contrastMode === 'standard' ? 'default' : 'outline'} 
                              onClick={() => setContrastMode('standard')}
                              className="flex-1 rounded-xl h-12 font-bold transition-all"
                            >
                              Standard
                            </Button>
                            <Button 
                              variant={contrastMode === 'high-contrast' ? 'default' : 'outline'} 
                              onClick={() => setContrastMode('high-contrast')}
                              className="flex-1 rounded-xl h-12 font-bold transition-all"
                            >
                              High Contrast
                            </Button>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Text Size</Label>
                         <div className="flex gap-2">
                            <Button 
                              variant={textSize === 'default' ? 'default' : 'outline'} 
                              onClick={() => setTextSize('default')}
                              className="flex-1 rounded-xl h-12 font-bold transition-all"
                            >
                              Default
                            </Button>
                            <Button 
                              variant={textSize === 'large' ? 'default' : 'outline'} 
                              onClick={() => setTextSize('large')}
                              className="flex-1 rounded-xl h-12 font-bold transition-all"
                            >
                              Large
                            </Button>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
           )}

           {activeTab === 'audio' && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Audio Processing</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Configure neural speech synthesis</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                   <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Voice Synthesis Speed</Label>
                        <span className="text-lg font-black text-primary">{voiceSpeed[0].toFixed(1)}x</span>
                      </div>
                      <Slider
                        value={voiceSpeed}
                        onValueChange={setVoiceSpeed}
                        max={2.0}
                        min={0.5}
                        step={0.1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase">
                        <span>Slow</span>
                        <span>Natural</span>
                        <span>Fast</span>
                      </div>
                   </div>

                   <div className="h-[1px] bg-slate-100 w-full" />

                   <ToggleItem 
                     title="Continuous Listening"
                     description="Keep mic active for hands-free study sessions"
                     active={continuousListening}
                     onToggle={() => setContinuousListening(!continuousListening)}
                   />
                </CardContent>
             </Card>
           )}

           {activeTab === 'notifications' && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Notifications</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Stay informed about your progress</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-6">
                   <ToggleItem 
                     icon={<Mail className="w-4 h-4 text-slate-400" />}
                     title="Email Notifications"
                     description="Receive weekly summaries and account updates"
                     active={emailNotifications}
                     onToggle={() => setEmailNotifications(!emailNotifications)}
                   />
                   <ToggleItem 
                     icon={<Smartphone className="w-4 h-4 text-slate-400" />}
                     title="Study Reminders"
                     description="Periodic alerts to help you stay on track"
                     active={studyReminders}
                     onToggle={() => setStudyReminders(!studyReminders)}
                   />
                   <ToggleItem 
                     icon={<Bell className="w-4 h-4 text-slate-400" />}
                     title="Materials Processed"
                     description="Alert when AI finishes decoding your documents"
                     active={materialsAlerts}
                     onToggle={() => setMaterialsAlerts(!materialsAlerts)}
                   />
                </CardContent>
             </Card>
           )}

           {activeTab === 'security' && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Privacy & Security</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Manage your data and access</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-6">
                   <ToggleItem 
                     icon={<ShieldCheck className="w-4 h-4 text-slate-400" />}
                     title="Two-Factor Authentication"
                     description="Add an extra layer of security to your account"
                     active={twoFactor}
                     onToggle={() => setTwoFactor(!twoFactor)}
                   />
                   
                   <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                            <Shield className="w-5 h-5 text-teal-500" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-900">Neural Data Encryption</p>
                            <p className="text-xs text-slate-500 font-medium">All academic materials are end-to-end encrypted</p>
                         </div>
                      </div>
                      <span className="text-[10px] font-black uppercase text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">Active</span>
                   </div>

                   <div className="h-[1px] bg-slate-100 w-full my-4" />

                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Account Management</h4>
                      <div className="flex flex-wrap gap-3">
                         <Button variant="outline" className="rounded-xl h-11 px-6 font-bold text-xs border-slate-200 hover:bg-slate-50">
                            <History className="w-4 h-4 mr-2" /> View Audit Logs
                         </Button>
                         <Button variant="outline" className="rounded-xl h-11 px-6 font-bold text-xs border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200">
                            <Trash2 className="w-4 h-4 mr-2" /> Clear Session History
                         </Button>
                      </div>
                   </div>
                </CardContent>
             </Card>
           )}

           {activeTab === 'language' && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-10 border-b border-slate-50">
                   <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-900">Language & Region</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Customize your linguistic interface</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                   <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Interface Language</Label>
                      <div className="grid gap-3 sm:grid-cols-2">
                         {['English (US)', 'Spanish (ES)', 'French (FR)', 'Arabic (AR)', 'Swahili (KE)'].map((lang) => (
                            <Button 
                              key={lang}
                              variant={language === lang ? 'default' : 'outline'}
                              onClick={() => setLanguage(lang)}
                              className="h-14 rounded-2xl font-bold justify-start px-6 gap-3 transition-all"
                            >
                               <Globe className={`w-4 h-4 ${language === lang ? 'text-white' : 'text-slate-400'}`} />
                               {lang}
                            </Button>
                         ))}
                      </div>
                   </div>
                </CardContent>
             </Card>
           )}
        </div>
      </div>
    </div>
  )
}

function SettingsNavButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
   return (
      <Button 
        variant="ghost" 
        onClick={onClick}
        className={`w-full justify-start h-12 rounded-xl px-4 gap-3 transition-all ${
          active ? 'bg-white shadow-sm border border-slate-200 text-primary' : 'text-slate-500 hover:bg-white hover:shadow-sm hover:border-slate-200'
        }`}
      >
         <div className={`${active ? 'text-primary' : 'text-slate-400'}`}>{icon}</div>
         <span className={`text-xs font-bold ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
      </Button>
   )
}

function ToggleItem({ icon, title, description, active, onToggle }: { icon?: React.ReactNode, title: string, description: string, active: boolean, onToggle: () => void }) {
   return (
      <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
         <div className="flex items-center gap-4">
            {icon && (
               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:border-primary/20 transition-all">
                  {icon}
               </div>
            )}
            <div className="space-y-1">
               <p className="text-sm font-bold text-slate-900">{title}</p>
               <p className="text-xs text-slate-500 font-medium">{description}</p>
            </div>
         </div>
         <button 
           onClick={onToggle}
           className={`w-12 h-6 rounded-full transition-all relative p-1 shrink-0 ${active ? 'bg-primary' : 'bg-slate-300'}`}
         >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${active ? 'ml-6' : 'ml-0'}`} />
         </button>
      </div>
   )
}