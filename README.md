## Proyecto VASS LATAM

Projecto desarrollado Angular 8, NodeJs, Express, Typescript, Jest.io, typescript-ioc, Github
Docker Base de datos Postgresql, debido aun problema en la instalación de mysql y sql server
ya que se produjo un error, en la instalación en mi equipo pero dejo el script de la base
de datos y tabla en mysql,  como plan b  trabaje con postgresql para la impletación de la 
prueba, debido a los requermientos y el tiempo de entrega.

## Instalción del proyecto

    1. Crear una Carpeta para descargar en esta carpeta los dos repositorios 
       Tanto del backend como el frontend y archivo de configuración .docker-compose.yml

    2. Git clone repositorio un unico proyecto frontend, Backend, base de datos

    3. Tener  Docker instalado en el equipo

    4. Abrir cmd, git bash, terminal   arrastar ruta , donde esta el proyecto el
       archivo .docker-compose.yml

    5. Una vez este ubicado, para  ejecutar  descarga imagenes nodejs, angular 8, 
       postgresql, y instala dependencias del projecto 
       docker-compose build

    6. Una vez termine de ejecutar el build ejecutamos  docker-compose up
       carga el servidor en angular en http://localhost:4200/ y en nodejs 
       http://localhost:3001/api/v1/services/prueba/ url para frontend y backend
       ya se ha postman o navegador Nota: url nodejs prueba

    7. Para crear las tablas ejecutamos el siguiente recurso http://localhost:3001/api/v1/services/migrate/docker/
       Nota: lo podemos ejecutar en el navegador o en postman es importante ejecutar este servicio para
       tener acceso a los datos 
       Nota: al ejecutar este servicio generamos base de datos, tablas roles, ciudad, sede, usuarios
       tambien generamos Insert en las tablas de roles Admin, operacion, ciudad Bogota, Medellin, 
       sede sede calle 26 asociada a bogota respuesta servicio
       {
        "code": 200,
        "msg": "migrate exitoso",
        "rows": []
       }

    8. Servicio para crear un usuario y acceder a la plataforma, 
       retorna usuario credenciales Loguinusuario : admin
       Contrasena : 12345  http://localhost:3001/api/v1/services/usuario/create/

    9. Al ingresar generamos un token que nos permite ejecutar la acciones del
       aplicativo.

    9. Accedemos a http://localhost:4200/ la pagina sera el formulario e acceso ingresamos 
       credenciales si estan incorrecta muestra mensaje de error de credenciales 
       si son ok accedemos a http://localhost:4200/inicio/menu 
       menu de crear ciudad, crear sede, crear usuario, cerrar sesión 
       Nota: para acceder es importante ejecutar servicio Paso 7 y Paso 8 usuario contraseña


    10. Al registrar muestra posibles errores como respectivo mensaje, si se registro correctamente muestra mensaje ok mensaje, 
        todos los campos son requeridos.

    11. Al registrar una sede o ciudad autamaticamente pasa a formulario de usuarios 
        Nota: solo pueden crear los usuarios admin las ciudades sedes, usuarios con 
        otro perfil pueden crear solo usuarios no pueden crear sede ni ciudad.

    12. Para ejecutar pruebas unitarias jest.io comando 
        npm run test genera 6 test 
        de la capa Dao de datos crea una carpeta llamada coverage genera un index.html donde podemos la covertura posibles.

    13. Al cerrar sesion nos redirije a formulario de acceso.

    14. servicio de usuario  por sede y ciudad
    		http://localhost:3001/api/v1/services/usuario/sede calle 26/Bogota

    15. Servicio de consumo
## *********************SERVICIOS API******************************
    GET  SIN RESTRINCIÓN
        http://localhost:3001/api/v1/services/migrate/docker/ 
        {
           "code": 200,
           "msg": "migrate exitoso",
           "rows": []
        }
    GET SIN RESTRINCIÓN
        http://localhost:3001/api/v1/services/usuario/create/

        POST AUTENTICACIÓN 
        http://localhost:3001/api/v1/services/ciudad/
        {
          "NombreCiudad": "Cali"
        }
    POST AUTENTICACIÓN 
        http://localhost:3001/api/v1/services/token/
       {
        "Loguinusuario": "admin" , 
        "Contrasena":"12345" 
       }
   POST AUTENTICACIÓN 
   http://localhost:3001/api/v1/services/sede/
       {
        "Nombre":"sede carrera 30", 
        "Direccion": "calle 24 31 12", 
        "Telefeno": "3764523", 
        "IdCiudad": 1
       }
   POST AUTENTICACIÓN 
    http://localhost:3001/api/v1/services/usuario/

       {
        "NombreUsuario": "admin13", 
        "ApellidosUsuario": "admin13" , 
        "Loguinusuario": "admin13" , 
        "Contrasena":"12345" , 
        "IdRoles" : 2,
        "IdSede": 1
       }

    12. En el inicio comente que al final dejaria el script en base de datos MYSQL ya 
        que debido a imprevisto en mi equipo no pude instalar mysql y al descarga sql server 
        no me dejo levantar la intancia de la conexión con el cliente
        
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
