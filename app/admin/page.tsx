import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderOpen, Trash2, Activity } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // TODO: Check if user is admin

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 py-12 px-6 bg-gradient-to-br from-[#66B5CB]/10 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#880430] mb-2">Panel de Administración</h1>
            <p className="text-lg text-[#8D8D8D]">Gestiona usuarios, proyectos y contenido</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <Users className="h-5 w-5" />
                  Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB]">0</p>
                <p className="text-sm text-[#8D8D8D]">Total de usuarios</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <FolderOpen className="h-5 w-5" />
                  Proyectos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB]">0</p>
                <p className="text-sm text-[#8D8D8D]">Proyectos activos</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <Trash2 className="h-5 w-5" />
                  Removidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB]">0</p>
                <p className="text-sm text-[#8D8D8D]">Proyectos eliminados</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#880430]">
                  <Activity className="h-5 w-5" />
                  Actividad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#66B5CB]">0</p>
                <p className="text-sm text-[#8D8D8D]">Acciones hoy</p>
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
