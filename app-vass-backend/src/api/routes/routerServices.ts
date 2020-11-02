import { Request, Response, NextFunction, Router } from 'express'
import ServicesController from '../../controllers/servicesController'
import { Container } from "typescript-ioc";
import MigratedatabaseController from '../../controllers/MigratedatabaseController' 
const multipart = require('connect-multiparty')
const fs = require('fs');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

import { verifyToken, isAdmin } from '../../Middlewares/authJwt'

export default class routerServices {
  public app:Router
  multipartMiddleware:any
  constructor(router: Router) {
    this.app = router
    this.multipartMiddleware = multipart() 
  }

  router(): void {

    this.app.get(
      '/services/prueba/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        setTimeout(() => {
          let appRes:any = {
            status: 200,
            msg: 'ok'
          } 
          res.status(200).json(appRes)
        },400)
      }
    )

    this.app.post(
      '/services/ciudad/', [verifyToken,isAdmin],//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.registrarCiudad(req)
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/ciudad/', verifyToken, //this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.obtenerCiudad()
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/roles/', verifyToken,//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.obtenerRoles()
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/sede/', verifyToken,//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.obtenerSede()
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/sede/', [verifyToken,isAdmin],//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.registrarSede(req)
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/usuario/', verifyToken,//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        //res.status(200).json({msg:'0k'})
        let responseModel = await servicesController.registrarUsuario(req)
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/usuario/create/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.registrarUsuarioServicio()
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.post(
      '/services/token/',//this.multipartMiddleware, 
      async (req: any, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController)
        let responseModel = await servicesController.validarCredencialesToken(req)
        //console.log(responseModel,'ppppppw')
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/usuario/:nombreSede/:nombreCiudad/', [verifyToken,isAdmin],
      async (req: Request, res: Response, next: NextFunction) => {
        const servicesController:ServicesController = Container.get(ServicesController);
        let responseModel = await servicesController.consultarUsuarios(req)
        res.status(200).json(responseModel)
      }
    )

    this.app.get(
      '/services/migrate/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const migratedatabaseController: MigratedatabaseController = Container.get(MigratedatabaseController)
          let responseModel = await migratedatabaseController.migracion()
          res.status(200).json(responseModel)
        } catch (error) {
          console.log(error)
        }
      }
    )

    this.app.get(
      '/services/migrate/docker/',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const migratedatabaseController: MigratedatabaseController = Container.get(MigratedatabaseController)
          let responseModel = await migratedatabaseController.migracionDocker()
          res.status(200).json(responseModel)
        } catch (error) {
          console.log(error)
        }
      }
    )
  }
}