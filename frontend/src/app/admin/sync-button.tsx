'use client'

import { useState } from 'react'
import { RefreshCw, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SyncButton() {
  const [syncing, setSyncing] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSync = async () => {
    setSyncing(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/registry/sync`, {
        method: 'POST',
      })
      
      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setSyncing(false)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-10 w-10 rounded-xl transition-all ${success ? 'text-emerald-500 bg-emerald-50' : 'text-slate-500'}`}
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : success ? (
            <Check className="w-5 h-5" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {syncing ? 'Synchronizing...' : success ? 'Sync Complete' : 'Registry Sync'}
      </TooltipContent>
    </Tooltip>
  )
}
