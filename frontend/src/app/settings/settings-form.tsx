'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Bell, 
  Shield, 
  Volume2, 
  Eye, 
  Smartphone,
  Globe,
  Save,
  Check
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

  // Load settings on mount
  useEffect(() => {
    const savedContrast = localStorage.getItem('accesslearn_contrast') as ContrastMode
    const savedTextSize = localStorage.getItem('accesslearn_text_size') as TextSize
    const savedVoiceSpeed = localStorage.getItem('accesslearn_voice_speed')
    const savedListening = localStorage.getItem('accesslearn_listening')

    if (savedContrast) setContrastMode(savedContrast)
    if (savedTextSize) setTextSize(savedTextSize)
    if (savedVoiceSpeed) setVoiceSpeed([parseFloat(savedVoiceSpeed)])
    if (savedListening) setContinuousListening(savedListening === 'true')
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    
    // Simulate API call or just save to localStorage
    setTimeout(() => {
      localStorage.setItem('accesslearn_contrast', contrastMode)
      localStorage.setItem('accesslearn_text_size', textSize)
      localStorage.setItem('accesslearn_voice_speed', voiceSpeed[0].toString())
      localStorage.setItem('accesslearn_listening', continuousListening.toString())
      
      // Apply changes to document
      applySettings()
      
      setIsSaving(false)
      setHasSaved(true)
      setTimeout(() => setHasSaved(false), 2000)
    }, 800)
  }

  const applySettings = () => {
    const root = document.documentElement
    
    // Contrast
    if (contrastMode === 'high-contrast') {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Text Size
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
        {/* Sidebar Navigation */}
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

        {/* Content Area */}
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

                   <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="space-y-1">
                         <p className="text-sm font-bold text-slate-900">Continuous Listening</p>
                         <p className="text-xs text-slate-500 font-medium">Keep mic active for hands-free study sessions</p>
                      </div>
                      <button 
                        onClick={() => setContinuousListening(!continuousListening)}
                        className={`w-12 h-6 rounded-full transition-all relative p-1 ${continuousListening ? 'bg-primary' : 'bg-slate-300'}`}
                      >
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${continuousListening ? 'ml-6' : 'ml-0'}`} />
                      </button>
                   </div>
                </CardContent>
             </Card>
           )}

           {(activeTab !== 'appearance' && activeTab !== 'audio') && (
             <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
                <CardContent className="p-20 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                      <Shield className="w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{activeTab} module</h3>
                      <p className="text-xs text-slate-500 font-medium">This module is currently locked under development.</p>
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
