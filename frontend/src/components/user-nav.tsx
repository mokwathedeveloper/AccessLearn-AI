'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, User, Settings, ShieldCheck, LayoutDashboard } from "lucide-react"

export function UserNav({ email, role }: { email: string, role: string }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={`https://avatar.vercel.sh/${email}.png`} alt={email} />
            <AvatarFallback className="bg-primary/5 text-primary font-bold">
              {email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between">
               <p className="text-sm font-bold leading-none">{email.split('@')[0]}</p>
               {role === 'admin' && (
                 <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-black text-primary uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin
                 </div>
               )}
            </div>
            <p className="text-xs leading-none text-muted-foreground truncate italic">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer py-3">
          <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-3">
          <User className="mr-3 h-4 w-4 text-muted-foreground" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-3">
          <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer py-3 text-destructive focus:bg-destructive/5 focus:text-destructive">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-bold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}