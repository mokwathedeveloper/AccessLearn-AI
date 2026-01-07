'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Mic, MicOff, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

// --- Web Speech API Types ---
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onspeechend: () => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onstart?: () => void
  onend?: () => void
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

interface IWindow extends Window {
  webkitSpeechRecognition?: SpeechRecognitionConstructor
  SpeechRecognition?: SpeechRecognitionConstructor
}

export function VoiceNavigator() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported, setSupported] = useState(false)
  const recognitionRef = React.useRef<SpeechRecognition | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as IWindow
      if (win.webkitSpeechRecognition || win.SpeechRecognition) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSupported(true)
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase()
    console.log('Voice Command:', cmd)

    if (cmd.includes('dashboard') || cmd.includes('home') || cmd.includes('library')) {
      router.push('/dashboard')
    } else if (cmd.includes('upload') || cmd.includes('add')) {
      router.push('/dashboard')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    } else if (cmd.includes('sign out') || cmd.includes('logout') || cmd.includes('exit')) {
      router.push('/')
    } else if (cmd.includes('back') || cmd.includes('return')) {
      router.back()
    } else if (cmd.includes('stop') || cmd.includes('pause') || cmd.includes('shut up')) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    } else if (cmd.includes('read') || cmd.includes('speak') || cmd.includes('listen')) {
      const contentElement = (document.querySelector('[role="main"]') || document.getElementById('main-content') || document.body) as HTMLElement
      // Filter out nav/footer/sidebar for cleaner reading
      const textToRead = contentElement.innerText.substring(0, 5000)
      
      if (textToRead && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(textToRead)
        
        const savedSpeed = localStorage.getItem('accesslearn_voice_speed')
        if (savedSpeed) {
          utterance.rate = parseFloat(savedSpeed)
        }
        
        window.speechSynthesis.speak(utterance)
      }
    }
  }, [router])

  const toggleListening = () => {
    if (!supported) return

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
      return
    }

    const win = window as unknown as IWindow
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()
    recognitionRef.current = recognition

    recognition.continuous = false
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const lastResult = event.results[event.results.length - 1]
      const text = lastResult[0].transcript
      setTranscript(text)
      handleCommand(text)
    }

    recognition.onspeechend = () => {
      recognition.stop()
      setIsListening(false)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== 'no-speech') {
        console.error('Speech recognition error', event.error)
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    try {
      recognition.start()
    } catch (e) {
      console.error('Failed to start recognition:', e)
      setIsListening(false)
    }
  }

  if (!supported) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
      {transcript && isListening && (
        <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl text-sm mb-2 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-bold tracking-tight">
          <div className="flex items-center gap-3">
             <Sparkles className="w-4 h-4 text-primary animate-pulse" />
             <span>{transcript}...</span>
          </div>
        </div>
      )}
      <Button
        onClick={toggleListening}
        size="icon"
        className={cn(
          "h-16 w-16 rounded-3xl shadow-2xl transition-all duration-500 active:scale-90",
          isListening 
            ? "bg-red-500 hover:bg-red-600 ring-8 ring-red-500/20" 
            : "bg-primary hover:bg-primary/90 ring-8 ring-primary/10 shadow-primary/40"
        )}
        title="Voice Navigation (Try: 'Go to Dashboard', 'Read Content', 'Back')"
      >
        {isListening ? <Mic className="h-7 w-7 animate-bounce" /> : <MicOff className="h-7 w-7" />}
      </Button>
    </div>
  )
}