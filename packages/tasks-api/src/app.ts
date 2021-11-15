const nconf = require('./helpers/config');
import express = require('express');
import * as morgan from 'morgan';

import { TasksRouter } from './resources/tasks';


export default class App {
  public server;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.server.use(express.json());
    if (nconf.get('NODE_ENV') !== 'production') {
      this.server.use(morgan('combined'));
    }
  }

  private routes() {
    this.server.use(TasksRouter);
  }

  public start() {
    this.server.listen(nconf.get('PORT'), () => {
      console.info(`server listening at port ${nconf.get('PORT')}`)
    })
  }
}
