export interface Rol {
  id_rol: number
  nombre_rol: string
}

export interface Usuario {
  id_user: number
  nombre_usuario: string
  nombre: string
  apellido: string
  imagen_perfil?: string
  correo: string
  contrasenia: string
  codigo_secreto?: string
  doble_factor_activo: boolean
  id_rol: number
  fecha_creacion: string
  fecha_modificacion: string
  modificado_por?: number
}

export interface Proyecto {
  id_proyecto: number
  nombre: string
  descripcion_general?: string
  descripcion_corta?: string
  imagen?: string
  video?: string
  fecha_inicio?: string
  fecha_fin?: string
  fecha_caducacion?: string
  contribuyente_limite?: number
  estado: "Activo" | "Inactivo" | "En Revisión" | "Finalizado" | "Cancelado"
  fecha_creacion: string
  fecha_modificacion: string
  modificado_por?: number
}

export interface UsuarioProyecto {
  id_user: number
  id_proyecto: number
  contribuyentes_totales: number
  fecha_aporte: string
}

export interface Comentario {
  id_comentario: number
  id_proyecto: number
  id_user: number
  texto: string
  fecha: string
}
