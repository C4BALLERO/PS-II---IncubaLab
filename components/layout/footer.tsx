import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#8D8D8D] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Nuestra Sección</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="hover:text-white/80 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white/80 transition-colors">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-white/80 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/afiliados" className="hover:text-white/80 transition-colors">
                  Programas De Afiliados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Te Ayudamos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/preguntas" className="hover:text-white/80 transition-colors">
                  Preguntas y Respuestas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Visita También</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/oficial" className="hover:text-white/80 transition-colors">
                  Incuvalab Oficial
                </Link>
              </li>
              <li>
                <Link href="/estudiante" className="hover:text-white/80 transition-colors">
                  ¿Eres un estudiante nuevo?
                </Link>
              </li>
              <li>
                <Link href="/mas" className="hover:text-white/80 transition-colors">
                  Mas Sobre Incuvalab
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">Síguenos En Nuestras Redes</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/80 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-white/80 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-white/80 transition-colors" aria-label="TikTok">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
