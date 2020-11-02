import {Container, Scope} from 'typescript-ioc';
import  DatabaseConnection from '../../src/loaders/databaseLoader';
import DatabaseConnectionMock from '../mocks/database/DatabaseConnectionMock';
import { ServicesDAO }  from '../../src/DAO/ServicesDAO';
import { chargeJsonResponse } from '../mocks/chargeJson';


test('validar validarUsuarios no devuelve datos prueba1', async () => {
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:any = Container.get(DatabaseConnection);
  
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let objectModel = chargeJsonResponse('validarusuario');
  database.setProcedureResponse(objectModel, true);
  let NombreUsuario:string = 'carlos'
  let ApellidosUsuario = 'rodriguez'
  let dataResponse:any = await servicesDAO.validarUsuarios(NombreUsuario,ApellidosUsuario);
  expect(dataResponse.rows.length == 0).toBe(true);
});


test('validar registrarSede no devuelve datos prueba2', async () => {
  let obj:any = []
  Container.bind(DatabaseConnection).to(DatabaseConnectionMock).scope(Scope.Local);
  let database:any = Container.get(DatabaseConnection);
  let servicesDAO:ServicesDAO=Container.get(ServicesDAO);
  let objectModel = chargeJsonResponse('validarusuario');
  database.setProcedureResponse(objectModel, true);
  obj['body'] = {Nombre: 'barranquilla', Telefeno:'25526363633', IdCiudad:1}
  let ApellidosUsuario = 'rodriguez'
  let dataResponse:any = await servicesDAO.registrarSede(obj);
  expect(dataResponse.rows.length == 0).toBe(true);
});