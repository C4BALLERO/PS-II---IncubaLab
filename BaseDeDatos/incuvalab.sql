-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: incuvalab
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `IdComentario` int NOT NULL AUTO_INCREMENT,
  `IdProyecto` int NOT NULL,
  `IdUser` int NOT NULL,
  `Texto` text NOT NULL,
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdComentario`),
  KEY `IdProyecto` (`IdProyecto`),
  KEY `IdUser` (`IdUser`),
  CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE,
  CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`IdUser`) REFERENCES `usuario` (`IdUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `IdNotificacion` int NOT NULL AUTO_INCREMENT,
  `IdUser` int NOT NULL,
  `IdProyecto` int NOT NULL,
  `Tipo` enum('Aporte','Comentario','MetaAlcanzada','ProyectoCerrado') NOT NULL,
  `Mensaje` text NOT NULL,
  `Leida` tinyint(1) DEFAULT '0',
  `Fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdNotificacion`),
  KEY `IdUser` (`IdUser`),
  KEY `IdProyecto` (`IdProyecto`),
  CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`IdUser`) REFERENCES `usuario` (`IdUser`) ON DELETE CASCADE,
  CONSTRAINT `notificacion_ibfk_2` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `IdProyecto` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `DescripcionGeneral` text,
  `DescripcionCorta` varchar(255) DEFAULT NULL,
  `ImagenPrincipal` varchar(255) DEFAULT NULL,
  `Video` varchar(255) DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `FechaCaducacion` date DEFAULT NULL,
  `ContribuyenteLimite` int NOT NULL,
  `EstadoAprobacion` enum('Pendiente','Activo','Cancelado') DEFAULT 'Pendiente',
  `EstadoActivo` tinyint(1) DEFAULT '1',
  `IdCreador` int NOT NULL,
  PRIMARY KEY (`IdProyecto`),
  KEY `IdCreador` (`IdCreador`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`IdCreador`) REFERENCES `usuario` (`IdUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (1,'Huertos Urbanos','Proyecto para crear huertos urbanos en la ciudad de Cochabamba.','Huertos en la ciudad','huertos.jpg',NULL,'2025-09-20','2025-12-20','2025-12-31',100,'Pendiente',1,2),(2,'App Reciclaje','Aplicación móvil para fomentar el reciclaje en hogares.','App reciclaje','reciclaje.jpg',NULL,'2025-09-15','2025-11-15','2025-11-30',50,'Activo',1,2),(3,'Biblioteca Comunitaria','Crear biblioteca comunitaria con acceso gratuito a libros y talleres.','Biblioteca gratis','biblioteca.jpg',NULL,'2025-10-01','2026-03-01','2026-03-15',80,'Activo',1,5),(4,'Festival de Ciencia','Organizar festival de ciencia para estudiantes de secundaria.','Festival Ciencia','ciencia.jpg',NULL,'2025-09-25','2025-10-10','2025-10-15',200,'Pendiente',1,5),(5,'Clases de Inglés Gratuitas','Clases de inglés para jóvenes de bajos recursos.','Inglés gratuito','ingles.jpg',NULL,'2025-09-10','2025-12-10','2025-12-31',120,'Activo',1,2);
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_documento`
--

DROP TABLE IF EXISTS `proyecto_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_documento` (
  `IdDocumento` int NOT NULL AUTO_INCREMENT,
  `IdProyecto` int NOT NULL,
  `NombreDocumento` varchar(100) NOT NULL,
  `UrlDocumento` varchar(255) NOT NULL,
  `TipoDocumento` enum('PDF','DOCX','XLSX','Otro') DEFAULT 'PDF',
  `FechaSubida` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdDocumento`),
  KEY `IdProyecto` (`IdProyecto`),
  CONSTRAINT `proyecto_documento_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_documento`
--

LOCK TABLES `proyecto_documento` WRITE;
/*!40000 ALTER TABLE `proyecto_documento` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_historial`
--

DROP TABLE IF EXISTS `proyecto_historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_historial` (
  `IdHistorial` int NOT NULL AUTO_INCREMENT,
  `IdProyecto` int NOT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `ModificadoPor` int DEFAULT NULL,
  `FechaCambio` datetime DEFAULT CURRENT_TIMESTAMP,
  `TipoCambio` enum('Insert','Update','Delete') NOT NULL,
  PRIMARY KEY (`IdHistorial`),
  KEY `IdProyecto` (`IdProyecto`),
  KEY `ModificadoPor` (`ModificadoPor`),
  CONSTRAINT `proyecto_historial_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE,
  CONSTRAINT `proyecto_historial_ibfk_2` FOREIGN KEY (`ModificadoPor`) REFERENCES `usuario` (`IdUser`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_historial`
--

LOCK TABLES `proyecto_historial` WRITE;
/*!40000 ALTER TABLE `proyecto_historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto_historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_imagen`
--

DROP TABLE IF EXISTS `proyecto_imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_imagen` (
  `IdImagen` int NOT NULL AUTO_INCREMENT,
  `IdProyecto` int NOT NULL,
  `UrlImagen` varchar(255) NOT NULL,
  `FechaSubida` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdImagen`),
  KEY `IdProyecto` (`IdProyecto`),
  CONSTRAINT `proyecto_imagen_ibfk_1` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_imagen`
--

LOCK TABLES `proyecto_imagen` WRITE;
/*!40000 ALTER TABLE `proyecto_imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto_imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IdRol` int NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(50) NOT NULL,
  PRIMARY KEY (`IdRol`),
  UNIQUE KEY `NombreRol` (`NombreRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Admin'),(3,'Contribuyente'),(2,'Creador'),(4,'Usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `IdUser` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `PrimerApellido` varchar(50) NOT NULL,
  `SegundoApellido` varchar(50) DEFAULT NULL,
  `ImagenPerfil` varchar(255) DEFAULT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasenia` varchar(255) NOT NULL,
  `CodigoSecreto` varchar(255) DEFAULT NULL,
  `DobleFactorActivo` tinyint(1) DEFAULT '0',
  `Telefono` varchar(20) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `Id_Rol` int NOT NULL,
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdUser`),
  UNIQUE KEY `NombreUsuario` (`NombreUsuario`),
  UNIQUE KEY `Correo` (`Correo`),
  KEY `Id_Rol` (`Id_Rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Id_Rol`) REFERENCES `rol` (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'adminLuis','Luis','Gonzalez','Perez',NULL,'luis.admin@incuvalab.com','hashedpassword1',NULL,0,'',1,1,'2025-09-27 23:43:16'),(2,'creadorAna','Ana','Torres','Lopez',NULL,'ana.creador@incuvalab.com','hashedpassword2',NULL,0,'77012345',1,2,'2025-09-27 23:43:16'),(3,'usuarioCarlos','Carlos','Ramirez','Diaz',NULL,'carlos.usuario@incuvalab.com','hashedpassword3',NULL,0,NULL,1,4,'2025-09-27 23:43:16'),(4,'contribuMaria','Maria','Lopez','Gutierrez',NULL,'maria.contribu@incuvalab.com','hashedpassword4',NULL,0,NULL,1,3,'2025-09-27 23:43:16'),(5,'creadorPedro','Pedro','Vargas','Salazar',NULL,'pedro.creador@incuvalab.com','hashedpassword5',NULL,0,'77123456',1,2,'2025-09-27 23:43:16');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_historial`
--

DROP TABLE IF EXISTS `usuario_historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_historial` (
  `IdHistorial` int NOT NULL AUTO_INCREMENT,
  `IdUser` int NOT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `ModificadoPor` int DEFAULT NULL,
  `FechaCambio` datetime DEFAULT CURRENT_TIMESTAMP,
  `TipoCambio` enum('Insert','Update','Delete') NOT NULL,
  PRIMARY KEY (`IdHistorial`),
  KEY `IdUser` (`IdUser`),
  KEY `ModificadoPor` (`ModificadoPor`),
  CONSTRAINT `usuario_historial_ibfk_1` FOREIGN KEY (`IdUser`) REFERENCES `usuario` (`IdUser`) ON DELETE CASCADE,
  CONSTRAINT `usuario_historial_ibfk_2` FOREIGN KEY (`ModificadoPor`) REFERENCES `usuario` (`IdUser`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_historial`
--

LOCK TABLES `usuario_historial` WRITE;
/*!40000 ALTER TABLE `usuario_historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_proyecto`
--

DROP TABLE IF EXISTS `usuario_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_proyecto` (
  `IdUser` int NOT NULL,
  `IdProyecto` int NOT NULL,
  `FechaAporte` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdUser`,`IdProyecto`),
  KEY `IdProyecto` (`IdProyecto`),
  CONSTRAINT `usuario_proyecto_ibfk_1` FOREIGN KEY (`IdUser`) REFERENCES `usuario` (`IdUser`) ON DELETE CASCADE,
  CONSTRAINT `usuario_proyecto_ibfk_2` FOREIGN KEY (`IdProyecto`) REFERENCES `proyecto` (`IdProyecto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_proyecto`
--

LOCK TABLES `usuario_proyecto` WRITE;
/*!40000 ALTER TABLE `usuario_proyecto` DISABLE KEYS */;
INSERT INTO `usuario_proyecto` VALUES (3,2,'2025-09-27 23:43:16'),(3,3,'2025-09-27 23:43:16'),(3,5,'2025-09-27 23:43:16'),(4,2,'2025-09-27 23:43:16'),(4,3,'2025-09-27 23:43:16');
/*!40000 ALTER TABLE `usuario_proyecto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-27 23:48:07
