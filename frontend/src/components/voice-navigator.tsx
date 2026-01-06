'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Mic, MicOff } from 'lucide-react'
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

    if (cmd.includes('dashboard') || cmd.includes('home')) {
      router.push('/dashboard')
    } else if (cmd.includes('upload')) {
      router.push('/dashboard')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    } else if (cmd.includes('sign out') || cmd.includes('logout')) {
      router.push('/')
    } else if (cmd.includes('back')) {
      router.back()
    } else if (cmd.includes('read') || cmd.includes('speak')) {
      // Find the main content text and read it
      const content = document.getElementById('main-content')?.innerText
      if (content && typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(content.substring(0, 500) + '...')
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
      // 'no-speech' is common and happens if user is quiet, no need to log as error
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {transcript && isListening && (
        <div className="bg-black/80 text-white px-3 py-1 rounded-md text-sm mb-2 animate-in fade-in slide-in-from-bottom-2">
          {transcript}...
        </div>
      )}
      <Button
        onClick={toggleListening}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        )}
        title="Voice Navigation (Try: 'Go to Dashboard', 'Upload', 'Back')"
      >
        {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
      </Button>
    </div>
  )
}
