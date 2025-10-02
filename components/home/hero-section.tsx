"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-br from-[#66B5CB] to-[#66B5CB]/80 py-20 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#880430] rounded-full -translate-y-1/3 translate-x-1/3 opacity-90" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-balance">¿Listo para empezar?</h1>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Únete hoy mismo a miles de personas.</h2>
            <p className="text-lg mb-8 text-white/90">
              Descubre proyectos innovadores y sostenibles que están transformando el futuro. Contribuye y sé parte del
              cambio.
            </p>
            <Button
              onClick={() => router.push("/proyectos")}
              size="lg"
              className="bg-[#880430] text-white hover:bg-[#880430]/90 text-lg px-8 py-6"
            >
              Iniciar Campaña
            </Button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <Image
                src="/people-working-together-on-sustainable-projects.jpg"
                alt="Personas colaborando en proyectos"
                width={500}
                height={400}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
