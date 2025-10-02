"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, FolderOpen } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import Image from "next/image"

export function DashboardHeader() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="bg-[#8D8D8D] text-white py-4 px-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/images/incuvalab-logo.png" alt="Incuvalab" width={150} height={50} className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="hover:text-white/80 transition-colors">
            Inicio
          </Link>
          <Link href="/proyectos" className="hover:text-white/80 transition-colors flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Ver Proyectos
          </Link>
          <Link href="/dashboard/proyectos" className="hover:text-white/80 transition-colors">
            Mis Proyectos
          </Link>
          <Link href="/dashboard/crear-proyecto" className="hover:text-white/80 transition-colors">
            Crear Proyecto
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/perfil">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="ghost" size="icon" className="text-white hover:text-white/80">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  )
}
