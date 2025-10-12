const database = require('./src/config/database');
const AuthUtils = require('./src/utils/auth');

async function populateDatabase() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await database.connect();

    console.log('📊 Poblando base de datos con datos de prueba...');

    // Insertar roles
    console.log('👥 Insertando roles...');
    await database.query(`
      INSERT IGNORE INTO Rol (IdRol, NombreRol) VALUES
      (1, 'Admin'),
      (2, 'Creador'),
      (3, 'Contribuyente')
    `);

    // Hash de contraseñas para usuarios de prueba
    const hashedPassword1 = await AuthUtils.hashPassword('password123');
    const hashedPassword2 = await AuthUtils.hashPassword('password456');
    const hashedPassword3 = await AuthUtils.hashPassword('password789');
    const hashedPassword4 = await AuthUtils.hashPassword('password111');
    const hashedPassword5 = await AuthUtils.hashPassword('password222');

    // Insertar usuarios
    console.log('👤 Insertando usuarios...');
    await database.query(`
      INSERT IGNORE INTO Usuario (IdUser, NombreUsuario, Nombre, Apellido, ImagenPerfil, Correo, Contrasenia, CodigoSecreto, DobleFactorActivo, Id_Rol, ModificadoPor)
      VALUES
      (1, 'admin1', 'Carlos', 'Perez', '/uploads/images/carlos.jpg', 'carlos.perez@incuvalab.com', ?, 'ABC123', TRUE, 1, NULL),
      (2, 'creador1', 'Ana', 'Lopez', '/uploads/images/ana.jpg', 'ana.lopez@incuvalab.com', ?, 'DEF456', TRUE, 2, NULL),
      (3, 'contrib1', 'Luis', 'Gomez', '/uploads/images/luis.jpg', 'luis.gomez@incuvalab.com', ?, 'GHI789', FALSE, 3, NULL),
      (4, 'contrib2', 'Maria', 'Fernandez', '/uploads/images/maria.jpg', 'maria.fernandez@incuvalab.com', ?, 'JKL111', FALSE, 3, NULL),
      (5, 'creador2', 'Jose', 'Martinez', '/uploads/images/jose.jpg', 'jose.martinez@incuvalab.com', ?, 'MNO222', TRUE, 2, NULL)
    `, [hashedPassword1, hashedPassword2, hashedPassword3, hashedPassword4, hashedPassword5]);

    // Insertar proyectos
    console.log('🚀 Insertando proyectos...');
    await database.query(`
      INSERT IGNORE INTO Proyecto (IdProyecto, Nombre, DescripcionGeneral, DescripcionCorta, Imagen, Video, FechaInicio, FechaFin, FechaCaducacion, ContribuyenteLimite, Estado, ModificadoPor)
      VALUES
      (1, 'Proyecto Solar', 'Desarrollo de paneles solares para comunidades rurales', 'Paneles solares rurales', '/uploads/images/solar.jpg', '/uploads/videos/solar.mp4', '2025-09-01', '2025-12-01', '2025-11-30', 100, 'Activo', 2),
      (2, 'App Educativa', 'Aplicación para aprender matemáticas online', 'App de matemáticas', '/uploads/images/appedu.jpg', '/uploads/videos/appedu.mp4', '2025-08-15', '2025-11-15', '2025-11-10', 50, 'Activo', 2),
      (3, 'Huerto Urbano', 'Creación de huertos en zonas urbanas', 'Huertos urbanos', '/uploads/images/huerto.jpg', '/uploads/videos/huerto.mp4', '2025-09-05', '2025-12-05', '2025-12-01', 30, 'Activo', 5),
      (4, 'Proyecto Arte', 'Exposición de arte digital', 'Arte digital', '/uploads/images/arte.jpg', '/uploads/videos/arte.mp4', '2025-07-01', '2025-10-01', '2025-09-30', 20, 'Activo', 2)
    `);

    // Insertar contribuciones Usuario_Proyecto
    console.log('🤝 Insertando contribuciones...');
    await database.query(`
      INSERT IGNORE INTO Usuario_Proyecto (IdUser, IdProyecto, ContribuyentesTotales, FechaAporte)
      VALUES
      (3, 1, 1, '2025-09-20'),
      (4, 1, 1, '2025-09-21'),
      (3, 2, 1, '2025-09-19'),
      (4, 3, 1, '2025-09-22')
    `);

    // Insertar comentarios
    console.log('💬 Insertando comentarios...');
    await database.query(`
      INSERT IGNORE INTO Comentario (IdComentario, IdProyecto, IdUser, Texto)
      VALUES
      (1, 1, 3, 'Excelente proyecto, espero ver resultados pronto!'),
      (2, 1, 4, 'Me encanta la iniciativa de energía solar.'),
      (3, 2, 3, 'La app educativa es muy útil para los niños.'),
      (4, 3, 4, 'Los huertos urbanos ayudarán mucho a la comunidad.')
    `);

    // Insertar historial de usuarios
    console.log('📝 Insertando historial de usuarios...');
    await database.query(`
      INSERT IGNORE INTO Usuario_Historial (IdHistorial, IdUser, ImagenPerfil, FechaCreacion, FechaModificacion, ModificadoPor, TipoCambio)
      VALUES
      (1, 3, '/uploads/images/luis.jpg', '2025-09-01', '2025-09-20', 1, 'Insert'),
      (2, 4, '/uploads/images/maria.jpg', '2025-09-01', '2025-09-21', 1, 'Insert')
    `);

    // Insertar historial de proyectos
    console.log('📋 Insertando historial de proyectos...');
    await database.query(`
      INSERT IGNORE INTO Proyecto_Historial (IdHistorial, IdProyecto, FechaCreacion, FechaModificacion, ModificadoPor, TipoCambio)
      VALUES
      (1, 1, '2025-09-01', '2025-09-20', 2, 'Insert'),
      (2, 2, '2025-08-15', '2025-09-19', 2, 'Insert'),
      (3, 3, '2025-09-05', '2025-09-22', 5, 'Insert'),
      (4, 4, '2025-07-01', '2025-09-01', 2, 'Insert')
    `);

    console.log('✅ Base de datos poblada exitosamente!');
    console.log('\n📊 Resumen de datos insertados:');
    console.log('- 3 Roles (Admin, Creador, Contribuyente)');
    console.log('- 5 Usuarios de prueba');
    console.log('- 4 Proyectos de ejemplo');
    console.log('- 4 Contribuciones usuario-proyecto');
    console.log('- 4 Comentarios');
    console.log('- Registros de historial');

    console.log('\n🔑 Credenciales de prueba:');
    console.log('Admin: carlos.perez@incuvalab.com / password123');
    console.log('Creador: ana.lopez@incuvalab.com / password456');
    console.log('Contribuyente: luis.gomez@incuvalab.com / password789');

  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
  } finally {
    await database.close();
    process.exit(0);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  populateDatabase();
}

module.exports = populateDatabase;
