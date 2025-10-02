"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function CrearProyectoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseBrowserClient()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcionCorta: "",
    descripcionGeneral: "",
    video: "",
    imagen: "",
    fechaInicio: "",
    fechaFin: "",
    contribuyenteLimite: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleNextStep = () => {
    if (!formData.nombre || !formData.descripcionCorta) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el título y la descripción breve",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No autenticado")

      const { data: userData } = await supabase.from("usuario").select("id_user").eq("correo", user.email).single()

      if (!userData) throw new Error("Usuario no encontrado")

      const { error } = await supabase.from("proyecto").insert({
        nombre: formData.nombre,
        descripcion_corta: formData.descripcionCorta,
        descripcion_general: formData.descripcionGeneral,
        video: formData.video || null,
        imagen: formData.imagen || null,
        fecha_inicio: formData.fechaInicio || null,
        fecha_fin: formData.fechaFin || null,
        contribuyente_limite: formData.contribuyenteLimite ? Number.parseInt(formData.contribuyenteLimite) : null,
        estado: "En Revisión",
        modificado_por: userData.id_user,
      })

      if (error) throw error

      toast({
        title: "Proyecto creado",
        description: "Tu proyecto ha sido enviado para revisión",
      })

      router.push("/dashboard/proyectos")
      router.refresh()
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "No se pudo crear el proyecto",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 py-12 px-6 bg-gradient-to-br from-[#66B5CB]/10 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-serif text-[#880430] mb-4">Crear una Campaña</h1>
            <p className="text-lg text-[#8D8D8D] max-w-2xl mx-auto">
              {step === 1
                ? "Escribe un título y subtítulo claros que resuman tu proyecto. Se mostrarán en tu página, en el prelanzamiento, en búsquedas, categorías y correos para patrocinadores."
                : "Completa los detalles adicionales de tu proyecto para finalizar la creación."}
            </p>
          </div>

          {step === 1 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-[#880430] mb-6">Presentación del proyecto</h2>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Título del Proyecto *</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ej: Un portaminas mínimo y duradero"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="descripcionCorta">Descripción Breve *</Label>
                        <Textarea
                          id="descripcionCorta"
                          name="descripcionCorta"
                          value={formData.descripcionCorta}
                          onChange={handleChange}
                          placeholder="Breve descripción del proyecto..."
                          rows={4}
                          maxLength={255}
                          required
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif text-[#880430] mb-4">Presenta tu proyecto</h2>
                    <p className="text-[#8D8D8D] mb-4">
                      El creador debe mostrar con entusiasmo el valor y atractivo del proyecto, definir la misión,
                      presentar un plan con cronograma claro y transmitir confianza para garantizar un buen uso de los
                      fondos.
                    </p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video">URL del Video (YouTube)</Label>
                        <Input
                          id="video"
                          name="video"
                          value={formData.video}
                          onChange={handleChange}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imagen">URL de la Imagen</Label>
                        <Input
                          id="imagen"
                          name="imagen"
                          value={formData.imagen}
                          onChange={handleChange}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <Card className="bg-[#880430] text-white">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="titulo-preview" className="text-white">
                        Título
                      </Label>
                      <div className="bg-white/10 rounded-lg p-3 min-h-[50px]">
                        <p className="text-white">{formData.nombre || "Tu título aparecerá aquí"}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Descripción general</Label>
                      <div className="bg-white/10 rounded-lg p-4 min-h-[200px]">
                        <p className="text-white/90 text-sm">
                          {formData.descripcionCorta || "Tu descripción breve aparecerá aquí"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 border-[#8D8D8D] text-[#8D8D8D]"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90"
                  >
                    Ir a la siguiente sección
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-serif text-[#880430] mb-4">Detalles del Proyecto</h2>

                  <div className="space-y-2">
                    <Label htmlFor="descripcionGeneral">Descripción Detallada</Label>
                    <Textarea
                      id="descripcionGeneral"
                      name="descripcionGeneral"
                      value={formData.descripcionGeneral}
                      onChange={handleChange}
                      placeholder="Describe detalladamente tu proyecto, objetivos, impacto esperado..."
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                      <Input
                        id="fechaInicio"
                        name="fechaInicio"
                        type="date"
                        value={formData.fechaInicio}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fechaFin">Fecha de Fin</Label>
                      <Input
                        id="fechaFin"
                        name="fechaFin"
                        type="date"
                        value={formData.fechaFin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contribuyenteLimite">Objetivo de Seguidores</Label>
                    <Input
                      id="contribuyenteLimite"
                      name="contribuyenteLimite"
                      type="number"
                      value={formData.contribuyenteLimite}
                      onChange={handleChange}
                      placeholder="Ej: 120"
                      min="1"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 border-[#8D8D8D] text-[#8D8D8D]"
                    >
                      Volver
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90"
                    >
                      {loading ? "Creando..." : "Crear Proyecto"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
