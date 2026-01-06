import { requireRole } from '@/lib/auth/server'
import { 
  ShieldAlert, 
  Database, 
  LayoutDashboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { SyncButton } from './sync-button'
import { AdminDashboard } from './admin-dashboard'

export default async function AdminPage() {
  await requireRole('admin')

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50/30 pb-20">
        <div className="wide-grid py-10 lg:py-16 space-y-12">
          {/* Master Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Override Active</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Command <span className="text-primary italic">Root.</span></h1>
            </div>
            
            <div className="flex items-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                        <Database className="w-5 h-5 text-slate-500" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Platform Logs</TooltipContent>
               </Tooltip>

               <SyncButton />

               <div className="h-6 w-[1px] bg-slate-200 mx-1" />

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button className="h-10 w-10 rounded-xl shadow-lg shadow-primary/20 p-0 hover:scale-105 active:scale-95 transition-all" asChild>
                        <Link href="/dashboard">
                           <LayoutDashboard className="w-5 h-5" />
                        </Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Return to User View</TooltipContent>
               </Tooltip>
            </div>
          </div>

          <AdminDashboard />
        </div>
      </div>
    </TooltipProvider>
  )
}
