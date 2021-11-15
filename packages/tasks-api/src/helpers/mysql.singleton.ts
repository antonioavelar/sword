const mysql = require('mysql');
const nconf = require('nconf');
import * as mysql from 'mysql';


export default class MySql {
  private static instance = null;

  private constructor() {
    MySql.instance = mysql.createPool({
      connectionLimit: nconf.get('DB_CONNECTIONS'),
      host: nconf.get('DB_HOST'),
      user: nconf.get('DB_USER'),
      password: nconf.get('DB_PASSWORD'),
      database: nconf.get('DB_DATABASE'),
    });

    return MySql.instance;
  }

  static getInstance() {
    MySql.instance = MySql.instance || new MySql();
    return MySql.instance;
  }
}
