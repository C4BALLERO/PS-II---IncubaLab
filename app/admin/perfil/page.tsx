"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Calendar, Users, FolderKanban, Trash2, Settings } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { EditProfileModal } from "@/components/auth/edit-profile-modal"

export default function AdminPerfilPage() {
  const [user, setUser] = useState<any>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    if (authUser) {
      // Mock admin data
      const userData = {
        email: authUser.email,
        nombre: "Incuvalab",
        apellido: "Oficial",
        username: "IncuvaLabOficial",
        telefono: "+4238-489",
        fecha_nacimiento: "23/07/2001",
        fecha_registro: "26/06/2022",
        fecha_modificacion: "27/06/2022",
        campanas: 0,
        seguidas: 1,
        donadas: 0,
      }
      setUser(userData)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#8D8D8D]">Cargando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <AdminHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32 border-4 border-[#880430]">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-[#880430] text-white text-4xl">
                        {user.nombre[0]}
                        {user.apellido[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl font-serif text-[#880430]">Mi Perfil</CardTitle>
                  <p className="text-[#8D8D8D] font-semibold">{user.username}</p>
                  <p className="text-sm text-[#8D8D8D]">@INCUVALAB</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <Button variant="link" className="text-[#880430] hover:text-[#880430]/80 p-0">
                      Configurar Cuenta
                    </Button>
                    <Button
                      variant="link"
                      className="text-[#880430] hover:text-[#880430]/80 p-0"
                      onClick={() => setEditModalOpen(true)}
                    >
                      Editar Perfil
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#880430]">{user.campanas}</p>
                      <p className="text-sm text-[#8D8D8D]">CAMPAÑAS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#880430]">{user.seguidas}</p>
                      <p className="text-sm text-[#8D8D8D]">SEGUIDAS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#880430]">{user.donadas}</p>
                      <p className="text-sm text-[#8D8D8D]">DONADAS</p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-[#880430] mb-4">Información</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-[#8D8D8D]" />
                      <div>
                        <p className="text-xs text-[#8D8D8D]">Email</p>
                        <p className="text-[#880430]">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-[#8D8D8D]" />
                      <div>
                        <p className="text-xs text-[#8D8D8D]">Número de teléfono</p>
                        <p className="text-[#880430]">{user.telefono}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-[#8D8D8D]" />
                      <div>
                        <p className="text-xs text-[#8D8D8D]">Fecha de Nacimiento</p>
                        <p className="text-[#880430]">{user.fecha_nacimiento}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Admin Control Panel */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader className="bg-[#66B5CB] text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-serif">Menu de Administracion</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-[#66B5CB] text-white p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-6 text-center">Administrar</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Manage Projects */}
                      <button
                        onClick={() => router.push("/admin/proyectos")}
                        className="flex flex-col items-center gap-3 p-6 bg-white text-[#66B5CB] rounded-lg hover:bg-white/90 transition-colors"
                      >
                        <FolderKanban className="h-12 w-12" />
                        <span className="font-semibold text-sm">Gestionar Proyectos</span>
                      </button>

                      {/* Manage Users */}
                      <button
                        onClick={() => router.push("/admin/usuarios")}
                        className="flex flex-col items-center gap-3 p-6 bg-white text-[#66B5CB] rounded-lg hover:bg-white/90 transition-colors"
                      >
                        <Users className="h-12 w-12" />
                        <span className="font-semibold text-sm">Gestionar de Usuarios</span>
                      </button>

                      {/* Manage Campaigns */}
                      <button
                        onClick={() => router.push("/admin/proyectos")}
                        className="flex flex-col items-center gap-3 p-6 bg-white text-[#66B5CB] rounded-lg hover:bg-white/90 transition-colors"
                      >
                        <Settings className="h-12 w-12" />
                        <span className="font-semibold text-sm">Gestión de Proyectos</span>
                      </button>

                      {/* Removed Projects */}
                      <button
                        onClick={() => router.push("/admin/proyectos-removidos")}
                        className="flex flex-col items-center gap-3 p-6 bg-white text-[#66B5CB] rounded-lg hover:bg-white/90 transition-colors"
                      >
                        <Trash2 className="h-12 w-12" />
                        <span className="font-semibold text-sm">Gestión Proyectos</span>
                      </button>
                    </div>
                  </div>

                  {/* My Campaigns Section */}
                  <div className="border-t pt-6">
                    <Button
                      variant="outline"
                      className="w-full text-[#880430] border-[#880430] hover:bg-[#880430] hover:text-white bg-transparent"
                      onClick={() => router.push("/admin/proyectos")}
                    >
                      Mis Campañas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <EditProfileModal open={editModalOpen} onOpenChange={setEditModalOpen} user={user} onSuccess={loadUserData} />
    </div>
  )
}
