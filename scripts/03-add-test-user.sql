-- -----------------------------
-- Add test user for testing
-- -----------------------------

-- Insert test user (normal user role)
INSERT INTO usuario (nombre_usuario, nombre, apellido, correo, contrasenia, id_rol, estado) VALUES 
('testuser', 'Usuario', 'Prueba', 'test@incuvalab.com', 'test123', 2, TRUE)
ON CONFLICT (correo) DO NOTHING;
