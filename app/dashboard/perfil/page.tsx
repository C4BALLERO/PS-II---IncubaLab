"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Calendar } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditProfileModal } from "@/components/auth/edit-profile-modal"

export default function PerfilUsuarioPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        console.log("[v0] Auth user:", authUser)

        // Fetch user data from database
        const { data: userData, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("correo", authUser.email)
          .single()

        console.log("[v0] User data from DB:", userData)

        if (error) {
          console.error("[v0] Error fetching user data:", error)
          // Use auth metadata if database query fails
          setUser({
            email: authUser.email,
            nombre: authUser.user_metadata?.nombre || "Usuario",
            apellido: authUser.user_metadata?.apellido || "",
            username: authUser.user_metadata?.nombre_usuario || authUser.email?.split("@")[0],
            telefono: "",
            fecha_nacimiento: "",
            fecha_registro: new Date(authUser.created_at).toLocaleDateString("es-ES"),
            fecha_modificacion: new Date(authUser.updated_at || authUser.created_at).toLocaleDateString("es-ES"),
            campanas: 0,
            seguidas: 0,
            donadas: 0,
          })
        } else {
          // Count user's projects and contributions
          const { count: projectCount } = await supabase
            .from("proyecto")
            .select("*", { count: "exact", head: true })
            .eq("modificado_por", userData.id_user)

          const { count: followCount } = await supabase
            .from("usuario_proyecto")
            .select("*", { count: "exact", head: true })
            .eq("id_user", userData.id_user)

          setUser({
            email: userData.correo,
            nombre: userData.nombre,
            apellido: userData.apellido,
            username: userData.nombre_usuario,
            telefono: userData.telefono || "",
            fecha_nacimiento: userData.fecha_nacimiento || "",
            fecha_registro: new Date(userData.fecha_creacion).toLocaleDateString("es-ES"),
            fecha_modificacion: new Date(userData.fecha_modificacion).toLocaleDateString("es-ES"),
            campanas: projectCount || 0,
            seguidas: followCount || 0,
            donadas: 0,
            imagen_perfil: userData.imagen_perfil,
          })
        }
      }
    } catch (err) {
      console.error("[v0] Error loading user data:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#8D8D8D]">Cargando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#8D8D8D]">No se pudo cargar el perfil</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <DashboardHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32 border-4 border-[#880430]">
                      <AvatarImage src={user.imagen_perfil || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#880430] text-white text-4xl">
                        {user.nombre[0]}
                        {user.apellido[0] || user.nombre[1]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-2xl font-serif text-[#880430]">Mi Perfil</CardTitle>
                  <p className="text-[#8D8D8D] font-semibold">{user.username}</p>
                  <p className="text-sm text-[#8D8D8D]">@{user.username.toUpperCase()}</p>
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
                    {user.telefono && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-[#8D8D8D]" />
                        <div>
                          <p className="text-xs text-[#8D8D8D]">Número de teléfono</p>
                          <p className="text-[#880430]">{user.telefono}</p>
                        </div>
                      </div>
                    )}
                    {user.fecha_nacimiento && (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-[#8D8D8D]" />
                        <div>
                          <p className="text-xs text-[#8D8D8D]">Fecha de Nacimiento</p>
                          <p className="text-[#880430]">{user.fecha_nacimiento}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Control Panel */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-[#880430]">Mi Panel de control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Campaigns Following */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="campaigns" className="border rounded-lg bg-[#66B5CB]/10">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-semibold text-[#880430]">Campaña a las que sigues</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {user.seguidas > 0 ? (
                          <div className="bg-[#66B5CB] text-white p-4 rounded-lg">
                            <p className="font-semibold mb-2">Proyectos seguidos</p>
                            <div className="mt-4">
                              <Button className="bg-white text-[#66B5CB] hover:bg-white/90 w-full">
                                VER PROYECTOS
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[#8D8D8D] text-center py-8">No sigues ninguna campaña aún</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Donations */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="donations" className="border rounded-lg bg-[#66B5CB]/10">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-semibold text-[#880430]">Campañas a las que donaste</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <p className="text-[#8D8D8D] text-center py-8">No has realizado donaciones aún</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* My Campaigns */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="my-campaigns" className="border rounded-lg bg-[#66B5CB]/10">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <span className="text-lg font-semibold text-[#880430]">Mis Campañas</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {user.campanas > 0 ? (
                          <div>
                            <p className="text-[#8D8D8D] text-center py-4">
                              Tienes {user.campanas} campaña(s) creada(s)
                            </p>
                            <Button className="bg-[#880430] text-white hover:bg-[#880430]/90 w-full">
                              Ver Mis Campañas
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="text-[#8D8D8D] text-center py-8">No tienes campañas creadas</p>
                            <Button className="bg-[#880430] text-white hover:bg-[#880430]/90 w-full mt-4">
                              Crear Nueva Campaña
                            </Button>
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
