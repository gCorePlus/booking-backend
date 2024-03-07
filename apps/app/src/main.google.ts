import * as express from 'express';
import { bootstrap } from '@app/common/bootstrap';
import { AppModule } from './app.module';

const server = express();
bootstrap(AppModule, server)
  .then(app => app.init())
  .catch(err => console.error('Nest broken', err));

export const api = server;
