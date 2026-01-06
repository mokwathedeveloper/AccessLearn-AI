'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

// Add type definition for Web Speech API
interface IWindow extends Window {
  webkitSpeechRecognition: any
  SpeechRecognition: any
}

export function VoiceNavigator() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported, setSupported] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSupported(true)
    }
  }, [])

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase()
    console.log('Voice Command:', cmd)

    if (cmd.includes('dashboard') || cmd.includes('home')) {
      router.push('/dashboard')
    } else if (cmd.includes('upload')) {
      // Logic to scroll to upload section could go here
      router.push('/dashboard')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    } else if (cmd.includes('sign out') || cmd.includes('logout')) {
      // In a real app, trigger logout action
      router.push('/')
    } else if (cmd.includes('back')) {
      router.back()
    }
  }, [router])

  const toggleListening = () => {
    if (!supported) return

    const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow
    const SpeechRecognitionAPI = SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognitionAPI()

    recognition.continuous = false
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    if (!isListening) {
      recognition.start()
      setIsListening(true)

      recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1]
        const text = lastResult[0].transcript
        setTranscript(text)
        handleCommand(text)
        setIsListening(false)
      }

      recognition.onspeechend = () => {
        recognition.stop()
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
      }
    } else {
      // We can't easily "stop" and keep listening logic clean without a ref in this simple component,
      // but for toggle, we just let it stop naturally or user waits.
      // Re-implementing full toggle logic requires keeping the instance in a ref.
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
