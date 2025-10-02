"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    id_rol: "2",
    contrasena: "",
  })
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    // TODO: Load from Supabase database
    // For now, using mock data
    const mockUsers = [
      {
        id_user: 1,
        nombre_usuario: "admin",
        nombre: "Administrador",
        apellido: "Incuvalab",
        correo: "admin@incuvalab.com",
        id_rol: 1,
        rol: "Admin",
        fecha_creacion: "2024-01-15",
      },
    ]
    setUsers(mockUsers)
    setLoading(false)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      nombre_usuario: user.nombre_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      id_rol: user.id_rol.toString(),
      contrasena: "",
    })
    setShowDialog(true)
  }

  const handleDelete = async (userId: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      // TODO: Delete from Supabase
      console.log("[v0] Deleting user:", userId)
      setUsers(users.filter((u) => u.id_user !== userId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Saving user:", formData)

    // TODO: Save to Supabase database
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id_user === editingUser.id_user
            ? {
                ...u,
                nombre_usuario: formData.nombre_usuario,
                nombre: formData.nombre,
                apellido: formData.apellido,
                correo: formData.correo,
                id_rol: Number.parseInt(formData.id_rol),
                rol: formData.id_rol === "1" ? "Admin" : formData.id_rol === "2" ? "Usuario" : "Moderador",
              }
            : u,
        ),
      )
    } else {
      // Create new user
      const newUser = {
        id_user: users.length + 1,
        nombre_usuario: formData.nombre_usuario,
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        id_rol: Number.parseInt(formData.id_rol),
        rol: formData.id_rol === "1" ? "Admin" : formData.id_rol === "2" ? "Usuario" : "Moderador",
        fecha_creacion: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, newUser])
    }

    setShowDialog(false)
    setEditingUser(null)
    setFormData({ nombre_usuario: "", nombre: "", apellido: "", correo: "", id_rol: "2", contrasena: "" })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif text-[#880430] mb-2">Administración de Usuarios</h1>
              <p className="text-lg text-[#8D8D8D]">Gestiona los usuarios de la plataforma</p>
            </div>
            <Button
              onClick={() => {
                setEditingUser(null)
                setFormData({ nombre_usuario: "", nombre: "", apellido: "", correo: "", id_rol: "2", contrasena: "" })
                setShowDialog(true)
              }}
              className="bg-[#880430] text-white hover:bg-[#880430]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8D8D8D]" />
                  <Input
                    placeholder="Buscar usuarios..."
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
              {loading ? (
                <div className="p-8 text-center text-[#8D8D8D]">Cargando usuarios...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id_user}>
                        <TableCell className="font-medium">{user.nombre_usuario}</TableCell>
                        <TableCell>
                          {user.nombre} {user.apellido}
                        </TableCell>
                        <TableCell>{user.correo}</TableCell>
                        <TableCell>
                          <Badge className={user.id_rol === 1 ? "bg-[#880430]" : "bg-[#66B5CB]"}>{user.rol}</Badge>
                        </TableCell>
                        <TableCell>{new Date(user.fecha_creacion).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(user)}
                              className="text-[#66B5CB] hover:text-[#66B5CB]/80"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(user.id_user)}
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
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#880430]">{editingUser ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "Modifica la información del usuario" : "Completa los datos del nuevo usuario"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre_usuario">Nombre de Usuario</Label>
              <Input
                id="nombre_usuario"
                value={formData.nombre_usuario}
                onChange={(e) => setFormData({ ...formData, nombre_usuario: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Email</Label>
              <Input
                id="correo"
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
              />
            </div>
            {!editingUser && (
              <div className="space-y-2">
                <Label htmlFor="contrasena">Contraseña</Label>
                <Input
                  id="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                  required={!editingUser}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <Select value={formData.id_rol} onValueChange={(value) => setFormData({ ...formData, id_rol: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Admin</SelectItem>
                  <SelectItem value="2">Usuario</SelectItem>
                  <SelectItem value="3">Moderador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#880430] text-white hover:bg-[#880430]/90">
                {editingUser ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
