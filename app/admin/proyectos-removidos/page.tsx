"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, RotateCcw, Trash2 } from "lucide-react"

// Mock data for removed projects
const mockRemovedProjects = [
  {
    id_proyecto: 10,
    nombre: "Proyecto Cancelado 1",
    descripcion_corta: "Proyecto que fue cancelado",
    estado: "Cancelado",
    fecha_eliminacion: "2024-03-01",
    motivo: "Falta de recursos",
  },
]

export default function ProyectosRemovidosPage() {
  const [projects, setProjects] = useState(mockRemovedProjects)
  const [searchTerm, setSearchTerm] = useState("")

  const handleRestore = (projectId: number) => {
    if (confirm("¿Deseas restaurar este proyecto?")) {
      setProjects(projects.filter((p) => p.id_proyecto !== projectId))
      alert("Proyecto restaurado exitosamente")
    }
  }

  const handlePermanentDelete = (projectId: number) => {
    if (confirm("¿Estás seguro de eliminar permanentemente este proyecto? Esta acción no se puede deshacer.")) {
      setProjects(projects.filter((p) => p.id_proyecto !== projectId))
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#880430] mb-2">Proyectos Removidos</h1>
            <p className="text-lg text-[#8D8D8D]">Gestiona los proyectos eliminados o cancelados</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8D8D8D]" />
                  <Input
                    placeholder="Buscar proyectos removidos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90">Buscar</Button>
              </div>
            </CardContent>
          </Card>

          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-[#8D8D8D] text-lg">No hay proyectos removidos</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Fecha Eliminación</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id_proyecto}>
                        <TableCell className="font-medium">{project.nombre}</TableCell>
                        <TableCell className="max-w-xs truncate">{project.descripcion_corta}</TableCell>
                        <TableCell>
                          <Badge className="bg-red-500">{project.estado}</Badge>
                        </TableCell>
                        <TableCell>{project.motivo}</TableCell>
                        <TableCell>{new Date(project.fecha_eliminacion).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRestore(project.id_proyecto)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePermanentDelete(project.id_proyecto)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
