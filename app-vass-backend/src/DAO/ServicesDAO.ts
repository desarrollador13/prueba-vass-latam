import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc";

export class ServicesDAO {

	constructor(
		@Inject private databaseConnection: Conection
	) { }

	/**
	@router 
    **/
	public async registrarUsuario(requets:object|any,contrasenaE:string|any):Promise<any> {
		const {NombreUsuario, ApellidosUsuario , Loguinusuario , Contrasena , IdRoles, IdSede} = requets
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  let result:any  
		  result=await connection.query(`INSERT INTO public."usuarios"("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena","IdRoles","IdSede")
																		 VALUES($1, $2, $3, $4, $5, $6) RETURNING "idUsuarios", "NombreUsuario","ApellidosUsuario", "Loguinusuario", "Contrasena","IdRoles","IdSede"`,
																		 [NombreUsuario, ApellidosUsuario , Loguinusuario , contrasenaE , IdRoles, IdSede])
			// result=await connection.query(`INSERT INTO usuarios(NombreUsuario, ApellidosUsuario, Loguinusuario, Contrasena, IdRoles)
			// 															 VALUES( ?, ?, ?, ?, ?)`,
			// 															 [NombreUsuario, ApellidosUsuario , Loguinusuario , contrasenaE , IdRoles])
			if(result.rowCount > 0 ){
				data = { 'status' :201, 'rows' : result.rows} 
			}else{
				data = { 'status' :200, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error,'err')
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async validarUsuariosCreado(Loguinusuario:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idUsuarios" FROM public."usuarios" 
																								WHERE "Loguinusuario" = '${Loguinusuario}';`);
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'existe'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async validarUsuarios(NombreUsuario:string|any, ApellidosUsuario:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idUsuarios" FROM public."usuarios" 
																								WHERE "NombreUsuario" = '${NombreUsuario}'  AND "ApellidosUsuario" = '${ApellidosUsuario}';`);
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'existe'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async validarUsuarioToken(Loguinusuario:string|any, Contrasena:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idUsuarios","NombreUsuario", "ApellidosUsuario", "Loguinusuario", 
																								"Contrasena", "IdRoles" FROM public."usuarios" 
																								WHERE "Loguinusuario" = '${Loguinusuario}';`); //AND "Contrasena" = '${Contrasena}'

			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'existe'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async validarCiudad(NombreCiudad:string|any): Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Nombre" FROM public."ciudad" 
																								WHERE "Nombre" = '${NombreCiudad}';`); //AND "Contrasena" = '${Contrasena}'
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'existe'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}
	}

	public async validarSede(Nombre:string|any): Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "Nombre" FROM public."sede" 
																								WHERE "Nombre" = '${Nombre}';`); //AND "Contrasena" = '${Contrasena}'
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'existe'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}
	}

	public async registrarCiudad(NombreCiudad:string|any):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`INSERT INTO public."ciudad"("Nombre") VALUES($1) RETURNING "idciudad", "Nombre";`
																								,[NombreCiudad]); //AND "Contrasena" = '${Contrasena}'
			if(query.rowCount > 0 ){
				data = { 'status' :201, 'rows' : query.rows} 
			}else{
				data = { 'status' :200, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}
	}

	public async registrarSede(requets:object|any):Promise<any> {
		let data: any
		try {
			const {Nombre, Direccion, Telefeno, IdCiudad} = requets.body
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`INSERT INTO public."sede"("Nombre" ,"Direccion", "Telefeno", "IdCiudad") VALUES($1,$2,$3,$4) 
																								RETURNING "idsede","Nombre" ,"Direccion", "Telefeno", "IdCiudad";`,
																								[Nombre, Direccion, Telefeno, IdCiudad])
			if(query.rowCount > 0 ){
				data = { 'status' :201, 'rows' : query.rows} 
			}else{
				data = { 'status' :200, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}
	}

	public async obtenerCiudad():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idciudad", "Nombre" FROM public.ciudad;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :204, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async obtenerRoles():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idRoles", "Nombre" FROM public.roles;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :204, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async obtenerSede():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idsede", "Nombre" FROM public.sede;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :204, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async registrarUsuarioServicio():Promise<any> {
		let data: any
		try {

		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`INSERT INTO public."usuarios"("NombreUsuario", "ApellidosUsuario", "Loguinusuario", "Contrasena","IdRoles","IdSede")
																		 VALUES($1, $2, $3, $4, $5, $6) RETURNING "idUsuarios", "NombreUsuario","ApellidosUsuario", "Loguinusuario", "Contrasena","IdRoles","IdSede"`,
																		 ['admin', 'admin' , 'admin' , '$2a$10$WSXrYWpGKbJHioVrIfFjk.0XjBbiwK6Dwjn4OavB9cc2FjyvnHcHa' , 1, 1])

			if(query.rowCount > 0 ){
				data = { 'status' :201, 'rows' : query.rows} 
			}else{
				data = { 'status' :204, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}
	}

	public async consultarUsuarios(nombreSede:string|any, nombreCiudad:string|any):Promise<any>{
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT "idUsuarios", "NombreUsuario", "ApellidosUsuario", "Loguinusuario",
																									rl."Nombre" AS roles, se."Nombre" AS sede, ci."Nombre" AS ciudad
																								FROM public.usuarios us
																								INNER JOIN public.roles rl ON us."IdRoles" = rl."idRoles"
																								INNER JOIN public.sede se ON us."IdSede" = se."idsede"
																								INNER JOIN public.ciudad ci ON se."IdCiudad" = ci."idciudad"
																								WHERE se."Nombre" LIKE '%${nombreSede}%' AND ci."Nombre" LIKE '%${nombreCiudad}%';`);
			if(query.rowCount > 0 ){
				data = {'status' :200, 'rows' : query.rows, msg:'ok'} 
			}else{
				data = {'status' :200, 'rows' : [], msg:'no_existe'} 
			}
			return data
		}catch(error) {
			console.log(error,'error')
			data ={'status' :500,'rows' : [], msg:'error_server'} 
			return data
		}

	}

	public async listarSchema():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT table_schema, table_name
														FROM information_schema.tables
														ORDER BY table_name;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async listarBases():Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`SELECT datname FROM pg_database;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async createColumsTable(colums:string, type:string):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
			const query:any = await connection.query(`ALTER TABLE public."Campanas" 
																								ADD COLUMN "${colums}" ${type};`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}

	public async consultaCampos(colums:string):Promise<any> {
		let data: any
		try {
		  const connection = await this.databaseConnection.getPool()
		  const query:any = await connection.query(`SELECT DISTINCT 
																								    a.attnum as Id,
																								    a.attname as Nom_Colum
																								FROM pg_attribute a 
																								JOIN pg_class pgc ON pgc.oid = a.attrelid
																								LEFT JOIN pg_index i ON 
																								    (pgc.oid = i.indrelid AND i.indkey[0] = a.attnum)
																								LEFT JOIN pg_description com on 
																								    (pgc.oid = com.objoid AND a.attnum = com.objsubid)
																								LEFT JOIN pg_attrdef def ON 
																								    (a.attrelid = def.adrelid AND a.attnum = def.adnum)
																								WHERE a.attnum > 0 AND pgc.oid = a.attrelid
																								AND pg_table_is_visible(pgc.oid)
																								AND NOT a.attisdropped
																								AND pgc.relname = 'Campanas'  -- Nombre de la tabla
																								AND  a.attname like '%${colums}%'
																								ORDER BY a.attname;`);
			if(query.rowCount > 0 ){
				data = { 'status' :200, 'rows' : query.rows} 
			}else{
				data = { 'status' :201, 'rows' : []} 
			}
			return data
		}catch(error) {
			console.log(error)
			data ={ 'status' :500,'msg' : 'error' } 
			return data
		}
	}
}
