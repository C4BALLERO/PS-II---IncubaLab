-- -----------------------------
-- Insertar datos iniciales
-- -----------------------------

-- Insertar roles
INSERT INTO rol (nombre_rol) VALUES 
('Admin'),
('Usuario'),
('Moderador')
ON CONFLICT DO NOTHING;

-- Insertar usuario admin de prueba
INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contrasenia, id_rol) VALUES 
('admin', 'Administrador', 'Incuvalab', 'admin@incuvalab.com', '$2a$10$example', 1)
ON CONFLICT DO NOTHING;

-- Insertar proyectos de ejemplo
INSERT INTO proyecto (nombre, descripcion_general, descripcion_corta, imagen, estado) VALUES 
('Energía Solar Comunitaria', 'Proyecto de instalación de paneles solares en comunidades rurales para generar energía limpia y sostenible.', 'Energía solar para comunidades', '/placeholder.svg?height=400&width=600', 'Activo'),
('Reciclaje Urbano', 'Iniciativa de reciclaje y gestión de residuos en zonas urbanas para reducir la contaminación.', 'Gestión de residuos urbanos', '/placeholder.svg?height=400&width=600', 'Activo'),
('Reforestación Amazónica', 'Programa de reforestación en la Amazonía para recuperar áreas deforestadas.', 'Recuperación de bosques', '/placeholder.svg?height=400&width=600', 'Activo')
ON CONFLICT DO NOTHING;
