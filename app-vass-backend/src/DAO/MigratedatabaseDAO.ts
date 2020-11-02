//import Conection from '../loaders/databaseLoader'
//import { Inject } from "typescript-ioc";
import { Pool, Client }  from 'pg'
const colog = require('colog')
export class MigratedatabaseDAO {
	private hostNameLocal:string|any
	private hostdatabase:string|any
	private hostNameLocalD:string|any
	private hostdatabaseD:string|any
	constructor(
		//@Inject private databaseConnection: Conection
		
	) { 
		this.hostNameLocal=`postgresql://postgres:admin@localhost`
		this.hostNameLocalD=`postgresql://postgres:admin@localhost/vass_latam`

		this.hostdatabase = this.hostNameLocal
		this.hostdatabaseD = this.hostNameLocalD
	}
	/**
	@router 
    **/
   	async migracion():Promise<object|any> {
   		let resval:object|any = {}
   		let resdb:object|any = {}
   		let restab:object|any = {}
   		let resins:object|any = {}

   		resval= await this.eliminardatabase()
   		console.log('resval',resval)
   		if(resval.code==201){
   			return resval
   		}

   		//ESTE METODO NO SE EJECUTA
   		resval= await this.validarcreateDataBase()
   		// console.log('resval',resval)
   		// if(resval.code==201){
   		// 	return resval
   		//}

   		resdb= await this.createDataBase()
   		console.log('resdb',resdb)
   		if(resdb.code==500){
   	    	return resdb
   		}
 		 
 		 //setTimeout(async () => {
 		 	restab=await this.createTables()
   		console.log('resdb',restab)
   		if(restab.code==500){
   			return restab
   		}
 		 //},1000)
   		
   		//setTimeout(async () => {
   		resins=await this.insertTable()
   		console.log('resdb',resins)
   		return resins
	   	//},1900)
    }

    async eliminardatabase():Promise<object|any>{
    	const connectionString = this.hostdatabase //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			try{
				colog.success('***************************************')
				colog.success('************DROP DATABASE************')
				colog.success('***************************************')
				let res:object|any={}
				let des:object|any={}

				des = await pool.query(`SELECT	pg_terminate_backend (pid)
										FROM	pg_stat_activity
										WHERE	pg_stat_activity.datname = 'vass_latam';`)

				colog.success('***********desconet data base**************')
				console.log(des.rows)
				colog.success('***********desconet data base**************')

				res = await pool.query(`DROP DATABASE IF EXISTS vass_latam;`)
				colog.success('***********DROP data base***********')
				console.log(res.rows)
				colog.success('***********DROP data base***********')
				if(res.rowCount == null){
					return {code: 200, msg:'ok_sig'}
				}else{
					return {code: 201, msg:'migrate database ya fue generado'}
				}
			}catch(error){
				console.log(error,'error DROP database')
				return {code: 500, msg:'migrate database ya se realizo'}
			}
    }

    async validarcreateDataBase ():Promise<object|any> {
    	const connectionString = this.hostdatabase //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			try{
				let res:object|any={}
				res = await pool.query(`SELECT datname FROM pg_database WHERE datname='vass_latam';`)
				colog.success('----------SELECT data base--------------')
				console.log(res.rows)
				colog.success('-----------SELECT data base-------------')
				if(res.rowCount == 0){
					return {code: 200, msg:'ok_sig'}
				}else{
					return {code: 201, msg:'migrate database ya fue generado'}
				}
			}catch(error){
				console.log(error,'error migrar')
				return {code: 500, msg:'migrate database ya se realizo'}
			}	 
    }

    async createDataBase ():Promise<object|any> {
	    colog.success('***************************************')
			colog.success('************CREATE DATABASE************')
			colog.success('***************************************')
			const connectionString =  this.hostdatabase //this.hostDocker
			const pool = new Pool({
			  connectionString: connectionString,
			})
			let res:object|any={}
			try{
				res = await pool.query(`CREATE DATABASE vass_latam
								    WITH 
								    OWNER = postgres
								    ENCODING = 'UTF8'
								    TABLESPACE = pg_default
								    CONNECTION LIMIT = -1;`)
				colog.success('----------create data base--------------')
				console.log(res.rows)
				colog.success('-----------create data base-------------')
				pool.end() 
				if(res.rowCount == null || res.rowCount == 'null'){
					return {code: 200, msg:'migrate database Exitoso'}
				}else{
					return {code: 200, msg:'migrate database ya se realizo'}
				} 
			}catch(error){
				colog.success(error,'error migrar')
				return res={code:500, msg:'migrate database ya se realizo'}
			}
		
	}

	async createTables():Promise<object|any> {
		const connectionString = this.hostdatabaseD  //`postgresql://postgres:admin@localhost/ban_colombia` //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resc:object|any={}
		let resu:object|any={}
		let rese:object|any={}
		let resd:object|any={}
		let rest:object|any={}
		let resf:object|any={}
		let resg:object|any={}
		let tabl:object|any={}
		
		try{
			colog.success('***************************************')
				let tabl2=await pool.query(`SELECT table_schema, table_name
									FROM information_schema.tables
									where table_schema = 'public'
									ORDER BY table_name;`)
			colog.success('---------ROWS TABLE VALIDACION SIN EXISTE LA TABLA RT---------------')
			console.log(tabl2.rows)
			colog.success('***************************************')
			colog.success('************CREATE TABLE***************')

			resc=await pool.query(`--SEQUENCE: public.roles_idRoles_seq
														--DROP SEQUENCE public."roles_idRoles_seq";
															CREATE SEQUENCE public."roles_idRoles_seq"
															    INCREMENT 1
															    START 1
															    MINVALUE 1
															    MAXVALUE 9223372036854775807
															    CACHE 1;
															ALTER SEQUENCE public."roles_idRoles_seq"
															    OWNER TO postgres;`)
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(resc.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')
		
		// CREATE TABLE IF NOT EXISTS test_table(_id bigint primary key, co2_field v
		// 	archar(40) NOT NULL, temp_field int NOT NULL, quality_field decimal NOT NULL, reading_time_field timestamp NULL)

			resu=await pool.query(`-- Table: public.roles
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
															    OWNER to postgres;`)
			colog.success('----------CREATE TABLE base--------------')
			//console.log(resu.rows)
			colog.success('-----------CREATE TABLE base-------------')

			rese=await pool.query(`-- SEQUENCE: public.ciudad_idciudad_seq
															-- DROP SEQUENCE public.ciudad_idciudad_seq;
															CREATE SEQUENCE public.ciudad_idciudad_seq
															    INCREMENT 1
															    START 1
															    MINVALUE 1
															    MAXVALUE 9223372036854775807
															    CACHE 1;
															ALTER SEQUENCE public.ciudad_idciudad_seq
															    OWNER TO postgres;
															`)
			
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(rese.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')

			resd=await pool.query(`-- Table: public.ciudad
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
															    OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')
			//console.log(resf.rows)
			colog.success('-----------CREATE TABLE base-------------')

			rest=await pool.query(`-- SEQUENCE: public.sede_idsede_seq
															-- DROP SEQUENCE public.sede_idsede_seq;
															CREATE SEQUENCE public.sede_idsede_seq
															    INCREMENT 1
															    START 1
															    MINVALUE 1
															    MAXVALUE 9223372036854775807
															    CACHE 1;
															ALTER SEQUENCE public.sede_idsede_seq
															    OWNER TO postgres;`)
			
			colog.success('----------CREATE SEQUENCE base--------------')
			//console.log(rese.rows)
			colog.success('-----------CREATE SEQUENCE base-------------')



			resf=await pool.query(`-- Table: public.sede
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
															    OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			colog.success('-----------CREATE TABLE base-------------')

			resg=await pool.query(`-- SEQUENCE: public.usuarios_idUsuarios_seq
														-- DROP SEQUENCE public."usuarios_idUsuarios_seq";
														CREATE SEQUENCE public."usuarios_idUsuarios_seq"
														    INCREMENT 1
														    START 1
														    MINVALUE 1
														    MAXVALUE 9223372036854775807
														    CACHE 1;
														ALTER SEQUENCE public."usuarios_idUsuarios_seq"
														    OWNER TO postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			colog.success('-----------CREATE TABLE base-------------')

			tabl=await pool.query(`-- Table: public.usuarios
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
														    OWNER to postgres;`)

			colog.success('----------CREATE TABLE base--------------')

			//colog.success('%c Oh my heavens! ', 'color: #bada55','more text');
			let tabl1=await pool.query(`SELECT table_schema, table_name
									FROM information_schema.tables
									where table_schema = 'public'
									ORDER BY table_name;`)
			colog.success('---------ROWS TABLE---------------')
			console.log(tabl1.rows)
			pool.end()
			return {code: 200, msg:'migrate tablas exitosas'}
		}catch(error){
			console.log(error,'oooooo')
			return {code: 500, msg:'migrate tabla ya se ejecuto'}
		
		}
	}

	async  insertTable():Promise<object|any> {

		const connectionString =  this.hostdatabaseD //`postgresql://postgres:admin@localhost/ban_colombia`//this.hostdatabase //this.hostDocker
		const pool = new Pool({
		  connectionString: connectionString,
		})
		let resIu1:object|any={}
		let resIu2:object|any={}
		let resIu3:object|any={}
		let resIu4:object|any={}
		let resIu5:object|any={}
		let resIu6:object|any={}
		let resIu7:object|any={}
		let prue:object|any={}
		try{
			colog.success('***************************************')
			colog.success('************INSERT TABLE***************')
			colog.success('***************************************')
			let arrayIns1:Array<any>=[]
			let arrayIns2:Array<any>=[]
			let arrayIns3:Array<any>=[]
			let arrayIns4:Array<any>=[]
			let arrayIns5:Array<any>=[]
			arrayIns1=[
				`INSERT INTO public.roles("Nombre") VALUES ('Admin');`,
				`INSERT INTO public.roles("Nombre") VALUES ('operacion');`
			]

			arrayIns2=[
				`INSERT INTO public.ciudad("Nombre") VALUES ('Bogota');`,
				`INSERT INTO public.ciudad("Nombre") VALUES ('Medellin');`
			]

			arrayIns3=[
				`INSERT INTO public.usuarios("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena", "IdRoles", "IdSede") VALUES ('luis','Pinto', 'luis', '12345', 1, 1);`
			]

			arrayIns4=[
			 `INSERT INTO public.sede("Nombre", "Direccion", "Telefeno", "IdCiudad") VALUES ('sede centro', 'calle 24 31 12', '3764523', 1);`
			]

			for(let x in arrayIns1){
				//console.log(arrayIns1[x],`insert ${x}`)
				resIu1=await pool.query(`${arrayIns1[x]}`)
			}
			for(let x in arrayIns2){
				//console.log(arrayIns2[x],`insert ${x}`)
				resIu2=await pool.query(`${arrayIns2[x]}`)
			}
			for(let x in arrayIns3){
				//console.log(arrayIns3[x],`insert ${x}`) 
				resIu3=await pool.query(`${arrayIns3[x]}`)
			}
			for(let x in arrayIns4){
				//console.log(arrayIns4[x],`insert ${x}`)
				resIu4=await pool.query(`${arrayIns4[x]}`)
			}

			resIu5=await pool.query(`INSERT INTO public.usuarios("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena", "IdRoles", "IdSede")
															VALUES ('Jonathan','Pinto', 'jonathan', '12345', 1, 1);`)

			let prue1=await pool.query(`SELECT *  FROM public."usuarios";`)

			colog.success('************ROWS INSERT TABLES*************')

			console.log(prue1.rows)

			return {code:200, msg:'migrate exitoso'}
			pool.end()	
		}catch(error){
			console.log(error,'error migrar')
			return {code:500, msg:'migrate error tablas'}
		}
	}
}