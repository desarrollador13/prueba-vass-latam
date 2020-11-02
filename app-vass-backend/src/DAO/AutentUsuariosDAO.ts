import Conection from '../loaders/databaseLoader'
import { Inject } from "typescript-ioc"

export class AutentUsuariosDAO {
	private data:object|any= {}

	constructor(@Inject private databaseConnection: Conection){}

	async validarRoles(Loguinusuario:string|any):Promise<any> {
		this.data= {}
		try {
		  const connection = await this.databaseConnection.getPool()
		  this.data = await connection.query(`SELECT "idUsuarios", "NombreUsuario", "IdRoles", "Nombre" AS roles, 
																					"Loguinusuario"
																					FROM public.usuarios us
																					INNER JOIN public.roles rl ON us."IdRoles" = rl."idRoles" 
																					WHERE "Loguinusuario" = '${Loguinusuario}';`)
		  return this.data
		}catch(error){
			console.log(error)
			this.data ={ 'status' :500,'msg' : 'error' } 
			return this.data
		}
	}


	async obtenerUsuario(Loguinusuario:string|any):Promise<any> {
		this.data= {}
		try {
		  const connection = await this.databaseConnection.getPool()
		  this.data = await connection.query(`SELECT "idUsuarios","NombreUsuario", "ApellidosUsuario", "Loguinusuario", 
																								"Contrasena", "IdRoles" FROM public."usuarios" 
																								WHERE "Loguinusuario" = '${Loguinusuario}';`)
		  return this.data
		}catch(error){
			console.log(error)
			this.data ={ 'status' :500,'msg' : 'error' } 
			return this.data
		}
	}
}