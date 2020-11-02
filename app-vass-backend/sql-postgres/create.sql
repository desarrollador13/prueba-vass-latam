--=============================================================================
--=============================================================================
--=============================================================================
--=============================================================================

-- SEQUENCE: public.roles_idRoles_seq
-- DROP SEQUENCE public."roles_idRoles_seq";
CREATE SEQUENCE public."roles_idRoles_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public."roles_idRoles_seq"
    OWNER TO postgres;

-- Table: public.roles
-- DROP TABLE public.roles;
CREATE TABLE public.roles
(
    "idRoles" integer NOT NULL DEFAULT nextval('"roles_idRoles_seq"'::regclass),
    "Nombre" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY ("idRoles")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public.roles
    OWNER to postgres;

--=============================================================================

-- SEQUENCE: public.ciudad_idciudad_seq
-- DROP SEQUENCE public.ciudad_idciudad_seq;
CREATE SEQUENCE public.ciudad_idciudad_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.ciudad_idciudad_seq
    OWNER TO postgres;

-- Table: public.ciudad
-- DROP TABLE public.ciudad;
CREATE TABLE public.ciudad
(
    idciudad integer NOT NULL DEFAULT nextval('ciudad_idciudad_seq'::regclass),
    "Nombre" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ciudad_pkey PRIMARY KEY (idciudad)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public.ciudad
    OWNER to postgres;

--=============================================================================
-- SEQUENCE: public.sede_idsede_seq
-- DROP SEQUENCE public.sede_idsede_seq;
CREATE SEQUENCE public.sede_idsede_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.sede_idsede_seq
    OWNER TO postgres;

-- Table: public.sede
-- DROP TABLE public.sede;
CREATE TABLE public.sede
(
    idsede integer NOT NULL DEFAULT nextval('sede_idsede_seq'::regclass),
    "Direccion" text COLLATE pg_catalog."default" NOT NULL,
    "Telefeno" text COLLATE pg_catalog."default" NOT NULL,
    "IdCiudad" integer NOT NULL,
    "Nombre" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT sede_pkey PRIMARY KEY (idsede)
    -- ,
    -- CONSTRAINT sede_idsede_fkey FOREIGN KEY (idsede)
    --     REFERENCES public.ciudad (idciudad) MATCH SIMPLE
    --     ON UPDATE NO ACTION
    --     ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public.sede
    OWNER to postgres;

--=============================================================================

-- SEQUENCE: public.usuarios_idUsuarios_seq
-- DROP SEQUENCE public."usuarios_idUsuarios_seq";
CREATE SEQUENCE public."usuarios_idUsuarios_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public."usuarios_idUsuarios_seq"
    OWNER TO postgres;

-- Table: public.usuarios
-- DROP TABLE public.usuarios;
CREATE TABLE public.usuarios
(
    "idUsuarios" integer NOT NULL DEFAULT nextval('"usuarios_idUsuarios_seq"'::regclass),
    "NombreUsuario" text COLLATE pg_catalog."default" NOT NULL,
    "ApellidosUsuario" text COLLATE pg_catalog."default" NOT NULL,
    "Loguinusuario" text COLLATE pg_catalog."default" NOT NULL,
    "Contrasena" text COLLATE pg_catalog."default" NOT NULL,
    "IdRoles" integer NOT NULL,
    "IdSede" integer NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY ("idUsuarios")
    -- ,
    -- CONSTRAINT "usuarios_IdSede_fkey" FOREIGN KEY ("IdSede")
    --     REFERENCES public.sede (idsede) MATCH SIMPLE
    --     ON UPDATE NO ACTION
    --     ON DELETE NO ACTION
    --     NOT VALID,
    -- CONSTRAINT "usuarios_idUsuarios_fkey" FOREIGN KEY ("idUsuarios")
    --     REFERENCES public.roles ("idRoles") MATCH SIMPLE
    --     ON UPDATE NO ACTION
    --     ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public.usuarios
    OWNER to postgres;

--=============================================================
--=============================================================
INSERT INTO public.roles("Nombre") VALUES ('Admin');
INSERT INTO public.roles("Nombre") VALUES ('operacion');

INSERT INTO public.ciudad("Nombre") VALUES ('Bogota');
INSERT INTO public.ciudad("Nombre") VALUES ('Medellin');

INSERT INTO public.usuarios("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena", "IdRoles", "IdSede")
VALUES ('luis','Pinto', 'luis', '12345', 1, 1);

INSERT INTO public.sede("Nombre", "Direccion", "Telefeno", "IdCiudad")
VALUES ('sede centro', 'calle 24 31 12', '3764523', 1);

INSERT INTO public.usuarios("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena", "IdRoles", "IdSede")
VALUES ('Jonathan','Pinto', 'jonathan', '12345', 1, 1);

