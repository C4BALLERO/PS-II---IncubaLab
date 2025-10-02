-- -----------------------------
-- Crear base de datos Incuvalab
-- -----------------------------

-- Tabla: Roles
CREATE TABLE IF NOT EXISTS rol (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- Tabla: Usuarios
CREATE TABLE IF NOT EXISTS usuario (
    id_user SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    imagen_perfil VARCHAR(255),
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    codigo_secreto VARCHAR(255),
    doble_factor_activo BOOLEAN DEFAULT FALSE,
    id_rol INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado_por INT,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (modificado_por) REFERENCES usuario(id_user)
);

-- Tabla: Proyectos
CREATE TABLE IF NOT EXISTS proyecto (
    id_proyecto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion_general TEXT,
    descripcion_corta VARCHAR(255),
    imagen VARCHAR(255),
    video VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE,
    fecha_caducacion DATE,
    contribuyente_limite INT,
    estado VARCHAR(20) DEFAULT 'Activo' CHECK (estado IN ('Activo','Finalizado','Cancelado')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificado_por INT,
    FOREIGN KEY (modificado_por) REFERENCES usuario(id_user)
);

-- Tabla: Relación Usuarios-Proyectos
CREATE TABLE IF NOT EXISTS usuario_proyecto (
    id_user INT NOT NULL,
    id_proyecto INT NOT NULL,
    contribuyentes_totales INT DEFAULT 0,
    fecha_aporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_proyecto),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user),
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);

-- Tabla: Comentarios
CREATE TABLE IF NOT EXISTS comentario (
    id_comentario SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    id_user INT NOT NULL,
    texto TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user)
);

-- Tabla de historial de Usuarios
CREATE TABLE IF NOT EXISTS usuario_historial (
    id_historial SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    imagen_perfil VARCHAR(255),
    fecha_creacion TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    modificado_por INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_cambio VARCHAR(10) NOT NULL CHECK (tipo_cambio IN ('Insert','Update','Delete')),
    FOREIGN KEY (id_user) REFERENCES usuario(id_user),
    FOREIGN KEY (modificado_por) REFERENCES usuario(id_user)
);

-- Tabla de historial de Proyectos
CREATE TABLE IF NOT EXISTS proyecto_historial (
    id_historial SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    fecha_creacion TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    modificado_por INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_cambio VARCHAR(10) NOT NULL CHECK (tipo_cambio IN ('Insert','Update','Delete')),
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto),
    FOREIGN KEY (modificado_por) REFERENCES usuario(id_user)
);
