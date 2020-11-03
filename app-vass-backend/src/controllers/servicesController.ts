import { Request, Response, NextFunction } from 'express'
import { Inject } from "typescript-ioc";
import { ServicesDAO } from '../DAO/ServicesDAO'
import requests from 'request-promise'
const multipart= require('connect-multiparty')
const fs= require('fs');
const csv= require('csvtojson')
const csvToJson= require('convert-csv-to-json')
const getStream = require('get-stream')
const parse = require('csv-parse')
const csv1 = require('fast-csv')

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config/Configuraciones"


export default class ServicesController {
	resValidacionArc:Array<any>|any
	constructor(
		@Inject private servicesDAO: ServicesDAO,
	) {
		this.resValidacionArc= []
	}
 /** **/
 	async registrarUsuario(requets:object|any):Promise<any> {
 		console.log(requets.body)
		let res:any
		try{
			const {NombreUsuario, ApellidosUsuario , Loguinusuario , Contrasena , IdRoles, IdSede} = requets.body
			if(!NombreUsuario  && !ApellidosUsuario && !Loguinusuario  && 
				 !Contrasena && !IdRoles && !IdSede){
				return {status: 400, msg: 'bad request' }
			}

			if(NombreUsuario == '' && ApellidosUsuario == '' && Loguinusuario == '' && 
				 Contrasena == '' && IdRoles == '' && IdSede == ''){
				return {status: 400, msg: 'los campos no pueden estar vacios' }
			}
			let valCountuser:any = await this.servicesDAO.validarUsuarioCount(IdSede)
			if(valCountuser.msg =='error_server') {
				return valCountuser
			}
			if(valCountuser.rows[0].count > 300) {
				return {status: 204, msg: 'El registro maximo es de 300 usuarios no podemos registrar mas.' }
			}

			let valUser:any  = await this.servicesDAO.validarUsuariosCreado(Loguinusuario)
			
			if(valUser.msg =='existe') {
				return {status: 200, msg: 'recurso ya existente' }
			}
			if(valUser.msg =='error_server') {
				return valUser
			}
			let val:any = await this.servicesDAO.validarUsuarios(NombreUsuario,ApellidosUsuario)
			if(val.msg =='existe') {
				return {status: 200, msg: 'recurso ya existente' }
			}
			if(val.msg =='error_server') {
				return val
			}
			let contrasenaE:any = await this.encryptarContrasena(Contrasena)
			res = await this.servicesDAO.registrarUsuario(requets.body,contrasenaE)
			if(res.status == 500){
				return res
			}
			if(res.status == 400){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
		
	}

	async encryptarContrasena(contrasena:string|any):Promise<any> {
		const salt = await bcrypt.genSalt(10)
  	return await bcrypt.hash(contrasena, salt)
	}

	async compareContrasena(password:string|any, receivedPassword:string|any):Promise<any> {
 		return await bcrypt.compare(password, receivedPassword)
	}

	async validarCredencialesToken(request:object|any):Promise<any> {
		let res:any
		try{
			const { Loguinusuario, Contrasena } = request.body
			let consultUser:any
			if(!Loguinusuario  &&  !Contrasena){
				return {status: 400, msg: 'bad request' }
			}
			if(Loguinusuario == '' && Contrasena == ''){
				return {status: 400, msg: 'los campos no pueden estar vacios' }
			}
			let hasContrasena = this.encryptarContrasena(Contrasena)
			consultUser= await this.servicesDAO.validarUsuarioToken(Loguinusuario,hasContrasena)
			console.log(consultUser,'ooconsultUserppoo')
			if(consultUser.rows.length < 1)
				return {status:201, msg:"No existe el usuario", token: ''}
			const matchPassword = await this.compareContrasena(
	      Contrasena,
	      consultUser.rows[0].Contrasena
      )
			if(!matchPassword) return {status:200, msg:"Error autenticacion"}
			const token = jwt.sign(consultUser.rows[0], config.SECRET, {
     	 expiresIn: 86400, // 24 hours
    	})
			return {status:201, msg:"Exitoso", token:token}
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async registrarCiudad(request:object|any):Promise<any> {
		let res:any
		try{
			const { NombreCiudad } = request.body
			let consultCiudad:any
			if(!NombreCiudad){
				return {status: 400, msg: 'bad request' }
			}
			if(NombreCiudad == ''){
				return {status: 400, msg: 'los campos no pueden estar vacios' }
			}
			consultCiudad= await this.servicesDAO.validarCiudad(NombreCiudad)
			if(consultCiudad.msg =='existe') {
				return {status: 200, msg: 'recurso ya existente' }
			}
			if(consultCiudad.msg =='error_server') {
				return consultCiudad
			}
			res = await this.servicesDAO.registrarCiudad(NombreCiudad)
			if(res.status == 500){
				return res
			}
			if(res.status == 200){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async obtenerRoles():Promise<any> {
		let res:any
		try{
			res = await this.servicesDAO.obtenerRoles()
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async obtenerSede():Promise<any> {
		let res:any
		try{			
			res = await this.servicesDAO.obtenerSede()
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

	async registrarSede(request:object|any):Promise<any> {
		let res:any
		try{
			const { Nombre, Direccion, Telefeno, IdCiudad } = request.body
			let consultCiudad:any
			if(!Nombre && !Direccion && !Telefeno && !IdCiudad){
				return {status: 400, msg: 'bad request' }
			}
			if(Nombre == '' && Direccion == '' && Telefeno == '' && IdCiudad == ''){
				return {status: 400, msg: 'los campos no pueden estar vacios' }
			}
			consultCiudad= await this.servicesDAO.validarSede(Nombre)
			if(consultCiudad.msg =='existe') {
				return {status: 200, msg: 'recurso ya existente' }
			}
			if(consultCiudad.msg =='error_server') {
				return consultCiudad
			}
			res = await this.servicesDAO.registrarSede(request)

			if(res.status == 500){
				return res
			}
			if(res.status == 200){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}


	async obtenerCiudad():Promise<any> {
		let res:any
		try{
			res = await this.servicesDAO.obtenerCiudad()
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}

	}

	async registrarUsuarioServicio():Promise<any> {
		let res:any
		try{			
			res = await this.servicesDAO.registrarUsuarioServicio()
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

	async consultarUsuarios(request:object|any):Promise<any> {
		let res:any
		try{			
			//console.log(request.params)
			let {nombreSede, nombreCiudad} = request.params
			res = await this.servicesDAO.consultarUsuarios(nombreSede, nombreCiudad)
			if(res.status == 500){
				return res
			}
			if(res.status == 204){
				return res
			}
			return res
		}catch(error){
			console.log('error',error)
			res = { 'status' :500, 'msg' : 'error'}
			return res
		}
	}

}