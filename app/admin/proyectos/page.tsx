"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const mockProjects = [
  {
    id_proyecto: 1,
    nombre: "Energía Solar Comunitaria",
    descripcion_corta: "Energía solar para comunidades",
    estado: "Activo",
    fecha_creacion: "2024-01-15",
    contribuyentes: 45,
  },
  {
    id_proyecto: 2,
    nombre: "Reciclaje Urbano",
    descripcion_corta: "Gestión de residuos urbanos",
    estado: "Activo",
    fecha_creacion: "2024-02-01",
    contribuyentes: 32,
  },
  {
    id_proyecto: 3,
    nombre: "Reforestación Amazónica",
    descripcion_corta: "Recuperación de bosques",
    estado: "Activo",
    fecha_creacion: "2024-02-15",
    contribuyentes: 67,
  },
]

export default function AdminProyectosPage() {
  const [projects, setProjects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")

  const handleDelete = (projectId: number) => {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
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
            <h1 className="text-4xl font-serif text-[#880430] mb-2">Administración de Proyectos</h1>
            <p className="text-lg text-[#8D8D8D]">Gestiona todos los proyectos de la plataforma</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8D8D8D]" />
                  <Input
                    placeholder="Buscar proyectos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-[#66B5CB] text-white hover:bg-[#66B5CB]/90">Buscar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Contribuyentes</TableHead>
                    <TableHead>Fecha Creación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id_proyecto}>
                      <TableCell className="font-medium">{project.nombre}</TableCell>
                      <TableCell className="max-w-xs truncate">{project.descripcion_corta}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{project.estado}</Badge>
                      </TableCell>
                      <TableCell>{project.contribuyentes}</TableCell>
                      <TableCell>{new Date(project.fecha_creacion).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/proyectos/${project.id_proyecto}`}>
                            <Button size="sm" variant="ghost" className="text-[#66B5CB] hover:text-[#66B5CB]/80">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#66B5CB] hover:text-[#66B5CB]/80"
                            onClick={() => alert("Editar proyecto")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(project.id_proyecto)}
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
