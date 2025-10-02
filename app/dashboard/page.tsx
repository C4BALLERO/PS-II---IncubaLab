import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Plus, Users } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 py-12 px-6 bg-gradient-to-br from-[#66B5CB]/10 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#880430] mb-2">Bienvenido al Dashboard</h1>
            <p className="text-lg text-[#8D8D8D]">Gestiona tus proyectos y contribuciones</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <FolderOpen className="h-5 w-5" />
                  Mis Proyectos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB] mb-2">0</p>
                <p className="text-sm text-[#8D8D8D] mb-4">Proyectos activos</p>
                <Link href="/dashboard/proyectos">
                  <Button className="w-full bg-[#880430] text-white hover:bg-[#880430]/90">Ver Proyectos</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <Plus className="h-5 w-5" />
                  Crear Proyecto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8D8D8D] mb-6">Inicia un nuevo proyecto sostenible</p>
                <Link href="/dashboard/crear-proyecto">
                  <Button className="w-full bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90">Nuevo Proyecto</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <Users className="h-5 w-5" />
                  Contribuciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB] mb-2">0</p>
                <p className="text-sm text-[#8D8D8D] mb-4">Proyectos apoyados</p>
                <Button variant="outline" className="w-full border-[#880430] text-[#880430] bg-transparent">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#880430]">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8D8D8D] text-center py-8">No hay actividad reciente</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
