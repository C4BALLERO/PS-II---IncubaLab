"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { Facebook, Instagram } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#8D8D8D] text-white py-4 px-6">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-xl font-serif">
            Incuva Lav
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Inicio
            </Link>
            <Link href="/proyectos" className="hover:text-white/80 transition-colors">
              Catálogo de Proyectos
            </Link>
            <Link href="/preguntas" className="hover:text-white/80 transition-colors">
              Preguntas frecuentes
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-white text-[#880430] rounded hover:bg-white/90 transition-colors"
              >
                Iniciar Sesión
              </button>
              <button className="px-4 py-2 bg-[#880430] text-white rounded hover:bg-[#880430]/90 transition-colors">
                Registrarse
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left side - Registration form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-[#880430] via-[#880430] to-[#66B5CB]">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-serif text-[#880430] text-center mb-6">Registro</h2>
              <RegisterForm onLogin={() => router.push("/login")} />
            </div>
          </div>
        </div>

        {/* Right side - Welcome message */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#66B5CB] items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#880430] rounded-full translate-y-1/2 -translate-x-1/3" />
          <div className="relative z-10 text-center text-white max-w-md">
            <h1 className="text-5xl font-serif mb-6">¡Bienvenido!</h1>
            <p className="text-lg mb-8">Estamos a tu disposición para ayudarte</p>
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 bg-white text-[#880430] rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#8D8D8D] text-white py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Nuestra Sección</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/nosotros" className="hover:text-white/80">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/servicios" className="hover:text-white/80">
                    Nuestros Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-white/80">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/afiliados" className="hover:text-white/80">
                    Programas De Afiliados
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Te Ayudamos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/preguntas" className="hover:text-white/80">
                    Preguntas y Respuestas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Visita También</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/oficial" className="hover:text-white/80">
                    Incuvalab Oficial
                  </Link>
                </li>
                <li>
                  <Link href="/estudiante" className="hover:text-white/80">
                    ¿Eres un estudiante nuevo?
                  </Link>
                </li>
                <li>
                  <Link href="/mas" className="hover:text-white/80">
                    Mas Sobre Incuvalab
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
            <p className="text-sm">Síguenos En Nuestras Redes</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white/80">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/80">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/80">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
