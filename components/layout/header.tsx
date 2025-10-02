"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import Image from "next/image"

export function Header() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<number | null>(null)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: userData } = await supabase
          .from("usuario")
          .select("id_rol")
          .eq("correo", session.user.email)
          .single()

        if (userData) {
          setUserRole(userData.id_rol)
        }
      }

      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: userData } = await supabase
          .from("usuario")
          .select("id_rol")
          .eq("correo", session.user.email)
          .single()

        if (userData) {
          setUserRole(userData.id_rol)
        }
      } else {
        setUserRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserRole(null)
    router.push("/")
    router.refresh()
  }

  const getDashboardLink = () => {
    if (userRole === 1) return "/admin"
    return "/dashboard"
  }

  return (
    <header className="bg-[#8D8D8D] text-white py-4 px-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/incuvalab-logo.png" alt="Incuvalab" width={150} height={50} className="h-10 w-auto" />
          <span className="text-2xl font-serif">Incuva Lav</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Inicio
          </Link>
          <Link href="/proyectos" className="hover:text-white/80 transition-colors">
            Catálogo de Proyectos
          </Link>
          <Link href="/preguntas" className="hover:text-white/80 transition-colors">
            Preguntas frecuentes
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <>
                  <Button
                    onClick={() => router.push(getDashboardLink())}
                    className="bg-white text-[#880430] hover:bg-white/90 transition-colors"
                  >
                    {userRole === 1 ? "Panel Admin" : "Mi Perfil"}
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    className="bg-[#880430] text-white hover:bg-[#880430]/90 transition-colors"
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => router.push("/login")}
                    className="bg-white text-[#880430] hover:bg-white/90 transition-colors"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    className="bg-[#880430] text-white hover:bg-[#880430]/90 transition-colors"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
