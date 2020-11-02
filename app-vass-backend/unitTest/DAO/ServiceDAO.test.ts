import pg from "pg";
import sinon from "sinon";
import { expect } from "chai";
import { ServicesDAO }  from '../../src/DAO/ServicesDAO';
import {Container, Scope} from 'typescript-ioc';
import DatabaseConnection from '../../src/loaders/databaseLoader';
const colog = require('colog')

describe("ref 001 servicesDAO Consultas db", () => {

	afterEach(() => {
		sinon.restore();
	});
	
	it("prueba 003 validarCiudad", async () => {
		const mPool = { query: sinon.stub().resolves({ rows: [] }) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		let ciudad:string = 'Cali'
		const actual = await db.validarCiudad(ciudad);
		expect(actual).to.be.eql({msg:'no_existe', rows: [], 'status':200 });
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});

	it("prueba 004 validarUsuarioToken", async () => {
		const mPool = { query: sinon.stub().resolves({ rows: [] }) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		let Loguinusuario:string = 'usuario1'
    let Contrasena:string = '123455'
		const actual = await db.validarUsuarioToken(Loguinusuario,Contrasena);
		expect(actual).to.be.eql({msg:'no_existe', rows: [], 'status':200 });
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});

	it("prueba 005 validarSede", async () => {
		const mPool = { query: sinon.stub().resolves({ rows: [] }) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		let sede:string = 'usuario1'
		const actual = await db.validarSede(sede);
		expect(actual).to.be.eql({msg:'no_existe', rows: [], 'status':200 });
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});


	it("prueba 005 validarUsuarios", async () => {
		const mPool = { query: sinon.stub().resolves({ rows: [] }) };
		const poolStub = sinon.stub(pg, "Pool").callsFake(() => mPool);
		const { ServicesDAO } = require("../../src/DAO/ServicesDAO");
		const db:ServicesDAO = Container.get(ServicesDAO);
		let NombreUsuario:string = 'usuario1'
		let ApellidosUsuario:string = 'apellido1'
		const actual = await db.validarUsuarios(NombreUsuario,ApellidosUsuario);
		expect(actual).to.be.eql({msg:'no_existe', rows: [], 'status':200 });
		sinon.assert.calledOnce(poolStub);
		sinon.assert.calledOnce(mPool.query);
	});

});