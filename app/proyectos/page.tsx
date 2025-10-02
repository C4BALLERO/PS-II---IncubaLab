import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allProjects = [
  {
    id: 1,
    title: "Energía Solar Comunitaria",
    description:
      "Proyecto de instalación de paneles solares en comunidades rurales para generar energía limpia y sostenible.",
    image: "/solar-panels-in-rural-community.jpg",
    category: "Energía Renovable",
    status: "Activo",
  },
  {
    id: 2,
    title: "Reciclaje Urbano",
    description: "Iniciativa de reciclaje y gestión de residuos en zonas urbanas para reducir la contaminación.",
    image: "/urban-recycling-program.jpg",
    category: "Gestión de Residuos",
    status: "Activo",
  },
  {
    id: 3,
    title: "Reforestación Amazónica",
    description: "Programa de reforestación en la Amazonía para recuperar áreas deforestadas.",
    image: "/amazon-reforestation.png",
    category: "Conservación",
    status: "Activo",
  },
  {
    id: 4,
    title: "Agricultura Sostenible",
    description: "Implementación de técnicas agrícolas sostenibles en comunidades rurales.",
    image: "/sustainable-agriculture-farming.jpg",
    category: "Agricultura",
    status: "Activo",
  },
  {
    id: 5,
    title: "Agua Limpia para Todos",
    description: "Instalación de sistemas de purificación de agua en zonas sin acceso a agua potable.",
    image: "/clean-water-purification-system.jpg",
    category: "Agua",
    status: "Activo",
  },
  {
    id: 6,
    title: "Educación Ambiental",
    description: "Programas educativos sobre medio ambiente y sostenibilidad para escuelas.",
    image: "/environmental-education-children.jpg",
    category: "Educación",
    status: "Activo",
  },
]

export default function ProyectosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#880430] mb-4">Catálogo de Proyectos</h1>
            <p className="text-lg text-[#8D8D8D] mb-6">Explora todos nuestros proyectos renovables y sostenibles</p>

            <div className="flex gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8D8D8D]" />
                <Input placeholder="Buscar proyectos..." className="pl-10" />
              </div>
              <Button className="bg-[#880430] text-white hover:bg-[#880430]/90">Buscar</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-[#66B5CB] text-white text-xs px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-[#880430] mb-2">{project.title}</h3>
                  <p className="text-sm text-[#8D8D8D] line-clamp-3">{project.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/proyectos/${project.id}`} className="w-full">
                    <Button className="w-full bg-[#880430] text-white hover:bg-[#880430]/90">Ver Detalles</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
