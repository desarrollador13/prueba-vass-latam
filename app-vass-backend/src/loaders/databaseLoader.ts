//import mysql from 'mysql';
import { Pool } from 'pg'
import { Singleton } from 'typescript-ioc';
import config from '../config';
/**
 * @category Database
 */
@Singleton
export default class DatabaseConnection {
  private connection:any
  constructor() {}
  public async getPool() {
   // let connection
     this.connection = new Pool({
        host:'database',
        user:'postgres',
        database:'vass_latam',
        password:'admin',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })
      // this.connection = new Pool({
      //   host:'localhost',
      //   user:'postgres',
      //   database:'vass_latam',
      //   password:'admin',
      //   max: 20,
      //   idleTimeoutMillis: 30000,
      //   connectionTimeoutMillis: 2000,
      // })
    return this.connection 

  }
}