import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Calendar, Heart, Bell } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function ProyectoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const { data: proyecto, error } = await supabase.from("proyecto").select("*").eq("id_proyecto", id).single()

  if (error || !proyecto) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-[#8D8D8D]">Proyecto no encontrado</p>
        </main>
        <Footer />
      </div>
    )
  }

  const { count: contribuyentes } = await supabase
    .from("usuario_proyecto")
    .select("*", { count: "exact", head: true })
    .eq("id_proyecto", id)

  const contribuyentesActuales = contribuyentes || 0
  const contribuyenteLimite = proyecto.contribuyente_limite || 100
  const porcentaje = (contribuyentesActuales / contribuyenteLimite) * 100

  const fechaFin = proyecto.fecha_fin ? new Date(proyecto.fecha_fin) : null
  const hoy = new Date()
  const diasRestantes = fechaFin ? Math.ceil((fechaFin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const getYouTubeEmbedUrl = (url: string | null) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
  }

  const videoEmbedUrl = getYouTubeEmbedUrl(proyecto.video)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left side - Burgundy with video */}
          <div className="lg:w-1/2 bg-[#880430] p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-2xl mx-auto w-full">
              <h1 className="text-4xl lg:text-5xl font-serif text-white mb-8 text-balance">{proyecto.nombre}</h1>

              {videoEmbedUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoEmbedUrl}
                    title="Video del proyecto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : proyecto.imagen ? (
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={proyecto.imagen || "/placeholder.svg"}
                    alt={proyecto.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-white/10 flex items-center justify-center">
                  <p className="text-white/60">Sin multimedia</p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Light blue with project info */}
          <div className="lg:w-1/2 bg-[#66B5CB] p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-2xl mx-auto w-full space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-3">Descripción</h2>
                <p className="text-white/90 leading-relaxed text-pretty">
                  {proyecto.descripcion_general || proyecto.descripcion_corta || "Sin descripción"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-white mb-2">Seguidores</h3>
                <p className="text-5xl font-bold text-white">{contribuyentesActuales}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-white mb-2">Días faltantes</h3>
                <p className="text-5xl font-bold text-white">{diasRestantes > 0 ? diasRestantes : 0}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-white mb-2">Objetivo esperado</h3>
                <p className="text-5xl font-bold text-white">{contribuyenteLimite}</p>
              </div>

              <div>
                <div className="bg-white/30 rounded-full h-8 overflow-hidden">
                  <div
                    className="bg-white h-full flex items-center justify-center text-[#880430] font-bold text-sm"
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  >
                    {porcentaje > 15 && `Objetivo ${Math.round(porcentaje)}%`}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-white text-[#880430] hover:bg-white/90 h-12">
                  <Heart className="h-5 w-5 mr-2" />
                  Me gusta
                </Button>
                <Button className="flex-1 bg-[#880430] text-white hover:bg-[#880430]/90 h-12">Seguir</Button>
                <Button className="bg-white text-[#880430] hover:bg-white/90 h-12 px-6">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Biography and details section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-[#880430] mb-4">Biografía del proyecto</h2>
                  <p className="text-[#8D8D8D] leading-relaxed">
                    {proyecto.descripcion_general || "Información detallada del proyecto próximamente."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-[#880430] mb-4">Comentarios</h2>
                  <div className="space-y-4">
                    <Textarea placeholder="Agrega un comentario..." rows={3} />
                    <Button className="bg-[#880430] text-white hover:bg-[#880430]/90">Publicar</Button>
                  </div>
                  <div className="mt-6">
                    <p className="text-[#8D8D8D] text-center py-4">No hay comentarios aún</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Badge className="bg-[#66B5CB] text-white mb-2">{proyecto.estado}</Badge>
                  </div>

                  {proyecto.fecha_inicio && (
                    <div>
                      <div className="flex items-center gap-2 text-[#8D8D8D] mb-2">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm">Fecha de Inicio</span>
                      </div>
                      <p className="text-lg font-medium text-[#880430]">
                        {new Date(proyecto.fecha_inicio).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {proyecto.fecha_fin && (
                    <div>
                      <div className="flex items-center gap-2 text-[#8D8D8D] mb-2">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm">Fecha de Fin</span>
                      </div>
                      <p className="text-lg font-medium text-[#880430]">
                        {new Date(proyecto.fecha_fin).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
