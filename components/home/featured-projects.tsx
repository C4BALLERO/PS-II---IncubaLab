import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Energía Solar Comunitaria",
    description:
      "Proyecto de instalación de paneles solares en comunidades rurales para generar energía limpia y sostenible.",
    image: "/solar-panels-in-rural-community.jpg",
    category: "Energía Renovable",
  },
  {
    id: 2,
    title: "Reciclaje Urbano",
    description: "Iniciativa de reciclaje y gestión de residuos en zonas urbanas para reducir la contaminación.",
    image: "/urban-recycling-program.jpg",
    category: "Gestión de Residuos",
  },
  {
    id: 3,
    title: "Reforestación Amazónica",
    description: "Programa de reforestación en la Amazonía para recuperar áreas deforestadas.",
    image: "/amazon-reforestation.png",
    category: "Conservación",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-[#880430] mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-[#8D8D8D] max-w-2xl mx-auto">
            Explora los proyectos más innovadores y sostenibles que están marcando la diferencia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
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
                <div className="inline-block bg-[#66B5CB] text-white text-xs px-3 py-1 rounded-full mb-3">
                  {project.category}
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

        <div className="text-center">
          <Link href="/proyectos">
            <Button
              size="lg"
              variant="outline"
              className="border-[#880430] text-[#880430] hover:bg-[#880430]/10 bg-transparent"
            >
              Ver Todos los Proyectos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
