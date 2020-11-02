CREATE SCHEMA `vass_talem` ;

--**************CREACION DE TABLA ROLES**********************
CREATE TABLE `vass_latam`.`roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idRoles`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE);

--**************CREACION DE TABLA ROLES**********************
CREATE TABLE `roles` (
  `idRoles` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRoles`),
  UNIQUE KEY `Nombre_UNIQUE` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--**************INSERT DE TABLA ROLES**********************
INSERT INTO `vass_latam`.`roles`(`Nombre`) VALUES ('Admin');
INSERT INTO `vass_latam`.`roles`(`Nombre`) VALUES ('operacion');


--=========================================================
--**************CREACION DE TABLA ciudad**********************

CREATE TABLE `vass_latam`.`ciudad` (
  `idciudad` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idciudad`));

--**************CREACION DE TABLA ciudad**********************

CREATE TABLE `ciudad` (
  `idciudad` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--**************INSERT DE TABLA ciudad**********************

INSERT INTO `vass_latam`.`ciudad`(`Nombre`) VALUES ('Bogota');
INSERT INTO `vass_latam`.`ciudad`(`Nombre`) VALUES ('Medellin');


--=========================================================
--**************CREACION DE TABLA sede**********************

CREATE TABLE `vass_latam`.`sede` (
  `idsede` INT NOT NULL AUTO_INCREMENT,
  `Direccion` VARCHAR(45) NOT NULL,
  `Telefeno` VARCHAR(45) NOT NULL,
  `IdCiudad` INT NOT NULL,
  PRIMARY KEY (`idsede`),
  INDEX `idciudad_idx` (`IdCiudad` ASC) VISIBLE,
  CONSTRAINT `idciudad`
    FOREIGN KEY (`IdCiudad`)
    REFERENCES `vass_latam`.`ciudad` (`idciudad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--**************CREACION DE TABLA sede**********************
CREATE TABLE `sede` (
  `idsede` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `Telefeno` varchar(45) NOT NULL,
  `IdCiudad` int NOT NULL,
  PRIMARY KEY (`idsede`),
  KEY `idciudad_idx` (`IdCiudad`),
  CONSTRAINT `idciudad` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudad` (`idciudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--=========================================================
--**************CREACION DE TABLA usuarios**********************
CREATE TABLE `vass_latam`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `NombreUsuario` VARCHAR(45) NOT NULL,
  `ApellidosUsuario` VARCHAR(45) NOT NULL,
  `Loguinusuario` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(500) NOT NULL,
  `IdRoles` INT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `idRoles_idx` (`IdRoles` ASC) VISIBLE,
  CONSTRAINT `idRoles`
    FOREIGN KEY (`IdRoles`)
    REFERENCES `vass_latam`.`roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
--**************CREACION DE TABLA usuarios**********************
ALTER TABLE `vass_latam`.`usuarios` 
ADD COLUMN `IdSede` INT NOT NULL AFTER `IdRoles`,
ADD INDEX `idsede_idx` (`IdSede` ASC) VISIBLE;
;
ALTER TABLE `vass_latam`.`usuarios` 
ADD CONSTRAINT `idsede`
  FOREIGN KEY (`IdSede`)
  REFERENCES `vass_latam`.`sede` (`idsede`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `usuarios` (
  `idUsuarios` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(45) NOT NULL,
  `ApellidosUsuario` varchar(45) NOT NULL,
  `Loguinusuario` varchar(45) NOT NULL,
  `Contrasena` varchar(500) NOT NULL,
  `IdRoles` int DEFAULT NULL,
  `IdSede` int NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  KEY `idRoles_idx` (`IdRoles`),
  KEY `idsede_idx` (`IdSede`),
  CONSTRAINT `idRoles` FOREIGN KEY (`IdRoles`) REFERENCES `roles` (`idRoles`),
  CONSTRAINT `idsede` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`idsede`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--*********************SERVICIOS API******************************
http://localhost:3001/api/v1/services/migrate/docker/


http://localhost:3001/api/v1/services/usuario/create/


http://localhost:3001/api/v1/services/ciudad/
{
  "NombreCiudad": "Cali"
}

 http://localhost:3001/api/v1/services/token/

 {
  "Loguinusuario": "jonathan" , 
  "Contrasena":"12345" 
}


 http://localhost:3001/api/v1/services/sede/
{
  "Nombre":"sede centro", 
  "Direccion": "calle 24 31 12", 
  "Telefeno": "3764523", 
  "IdCiudad": 1
}

http://localhost:3001/api/v1/services/usuario/

{
  "NombreUsuario": "Jonathan", 
  "ApellidosUsuario": "Pinto" , 
  "Loguinusuario": "jonathan" , 
  "Contrasena":"12345" , 
  "IdRoles" : 1,
  "IdSede": 1
}

http://localhost:3001/api/v1/services/usuario/sede calle 26/Bogota


--==================================================================
CREATE TABLE `vass_latam`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `NombreUsuario` VARCHAR(45) NOT NULL,
  `ApellidosUsuario` VARCHAR(45) NOT NULL,
  `Loguinusuario` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(500) NOT NULL,
  `IdRoles` INT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `idRoles_idx` (`IdRoles` ASC) VISIBLE,
  CONSTRAINT `idRoles`
    FOREIGN KEY (`IdRoles`)
    REFERENCES `vass_latam`.`roles` (`idRoles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--=========================================================

--=========================================================

ALTER TABLE `vass_latam`.`usuarios` 
ADD COLUMN `IdSede` INT NOT NULL AFTER `IdRoles`,
ADD INDEX `idsede_idx` (`IdSede` ASC) VISIBLE;
;
ALTER TABLE `vass_latam`.`usuarios` 
ADD CONSTRAINT `idsede`
  FOREIGN KEY (`IdSede`)
  REFERENCES `vass_latam`.`sede` (`idsede`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `usuarios` (
  `idUsuarios` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(45) NOT NULL,
  `ApellidosUsuario` varchar(45) NOT NULL,
  `Loguinusuario` varchar(45) NOT NULL,
  `Contrasena` varchar(500) NOT NULL,
  `IdRoles` int DEFAULT NULL,
  `IdSede` int NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  KEY `idRoles_idx` (`IdRoles`),
  KEY `idsede_idx` (`IdSede`),
  CONSTRAINT `idRoles` FOREIGN KEY (`IdRoles`) REFERENCES `roles` (`idRoles`),
  CONSTRAINT `idsede` FOREIGN KEY (`IdSede`) REFERENCES `sede` (`idsede`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;