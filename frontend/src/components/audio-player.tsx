'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface AudioPlayerProps {
  src: string
  className?: string
}

export function AudioPlayer({ src, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Reset state and apply speed when src changes
  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    
    const savedVoiceSpeed = localStorage.getItem('accesslearn_voice_speed')
    if (savedVoiceSpeed && audioRef.current) {
      audioRef.current.playbackRate = parseFloat(savedVoiceSpeed)
    }
  }, [src])

  const togglePlay = () => {
    if (audioRef.current && src) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.error('[AUDIO] Playback failed for source:', src)
          console.error('[AUDIO] Error details:', err)
          setIsPlaying(false)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const dur = audioRef.current.duration
      setCurrentTime(current)
      setProgress((current / dur) * 100)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      audioRef.current.currentTime = (value[0] / 100) * dur
      setProgress(value[0])
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      {src ? (
        <audio
          key={src}
          ref={audioRef}
          src={src}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
      ) : null}
      
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => {
               if(audioRef.current) {
                 audioRef.current.currentTime -= 10
                 setCurrentTime(audioRef.current.currentTime)
               }
            }}>
               <RotateCcw className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={togglePlay} 
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 scale-110 active:scale-95 transition-all"
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </Button>

            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => {
               if(audioRef.current) {
                 audioRef.current.currentTime += 10
                 setCurrentTime(audioRef.current.currentTime)
               }
            }}>
               <FastForward className="w-5 h-5" />
            </Button>
         </div>

         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" onClick={toggleMute}>
               {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
         </div>
      </div>

      <div className="space-y-2 pt-2">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
          aria-label="Seek audio"
        />
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
           <span>{formatTime(currentTime)}</span>
           <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}