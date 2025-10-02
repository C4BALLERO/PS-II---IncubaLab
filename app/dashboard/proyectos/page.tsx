import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function MisProyectosPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // TODO: Fetch user's projects from database
  const userProjects: any[] = []

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif text-[#880430] mb-2">Mis Proyectos</h1>
              <p className="text-lg text-[#8D8D8D]">Gestiona y monitorea tus proyectos</p>
            </div>
            <Link href="/dashboard/crear-proyecto">
              <Button className="bg-[#880430] text-white hover:bg-[#880430]/90">Crear Nuevo Proyecto</Button>
            </Link>
          </div>

          {userProjects.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-serif text-[#880430] mb-4">No tienes proyectos aún</h3>
                  <p className="text-[#8D8D8D] mb-6">Comienza creando tu primer proyecto sostenible</p>
                  <Link href="/dashboard/crear-proyecto">
                    <Button className="bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90">Crear Proyecto</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <Image
                      src={project.imagen || "/placeholder.svg"}
                      alt={project.nombre}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="inline-block bg-[#66B5CB] text-white text-xs px-3 py-1 rounded-full mb-3">
                      {project.estado}
                    </div>
                    <h3 className="text-xl font-serif text-[#880430] mb-2">{project.nombre}</h3>
                    <p className="text-sm text-[#8D8D8D] line-clamp-2">{project.descripcion_corta}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Link href={`/dashboard/proyectos/${project.id}`} className="flex-1">
                      <Button className="w-full bg-[#880430] text-white hover:bg-[#880430]/90">Ver</Button>
                    </Link>
                    <Link href={`/dashboard/proyectos/${project.id}/editar`} className="flex-1">
                      <Button variant="outline" className="w-full border-[#880430] text-[#880430] bg-transparent">
                        Editar
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
