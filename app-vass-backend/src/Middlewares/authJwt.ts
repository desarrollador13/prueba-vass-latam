import jwt from "jsonwebtoken"
import config from "../config/Configuraciones"
import { Request, Response, NextFunction, Router } from 'express'
import { AutentUsuariosDAO } from '../DAO/AutentUsuariosDAO'
import { Container } from "typescript-ioc"

export const isAdmin= async(req:Request|any, res:Response, next:NextFunction) => {

	try{
		let resQuery:any= null
		const autentUsuariosDAO:AutentUsuariosDAO = Container.get(AutentUsuariosDAO)
		resQuery= await autentUsuariosDAO.validarRoles(req.Loguinusuario)

		//console.log('auth- jsonWt-->',req.Loguinusuario, 'consultas',resQuery.rows[0])
		if(resQuery.rows.length > 0) {
			if (resQuery.rows[0].roles=='Admin') {
				next()
        return
			}
		}
	//for(leti=0;i<resQuery.rows.length;i++){if(resQuery.rows[i].nombreRoll=='Admin'){next()return}}
    return res.status(403).json({status:403, msg: "Acceso denegado Roll No autorizado"})

	}catch(error){
		console.log(error)
		return res.status(500).json({status:500, msg: "Error del servidor"})
	}

}


export const verifyToken = async(req:Request|any, res:Response, next:NextFunction) => {
	let bearerHeader:any= null
	let bearerToken:any= null
	let decoded:any= null
	let NombreApp:any= null

	const autentUsuariosDAO:AutentUsuariosDAO = Container.get(AutentUsuariosDAO)
	bearerHeader = req.headers["authorization"]

	try {
		let resQuery:any= null
		if (!bearerHeader) return res.status(403).json({status: 403, msg: "token invalido"})
		bearerToken = bearerHeader.split(' ')[1]
		decoded = jwt.verify(bearerToken, config.SECRET)
		//console.log(decoded)
		req.Loguinusuario = decoded.Loguinusuario

		resQuery= await autentUsuariosDAO.obtenerUsuario(req.Loguinusuario)
		if(resQuery.rows.length < 1) 
			return res.status(404).json({ msg: 'credenciales no validas'})
		next()

	}catch(error){
		console.log(error)
		return res.status(401).json({status:401, msg: "No autorizado"})
	}
}