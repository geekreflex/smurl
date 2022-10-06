import { CommonRoutesConfig } from '../../common/common.routes.config';
import { Application } from 'express';
import urlsControllers from './controllers/urls.controllers';

export class UrlRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UrlRoutes');
  }

  configureRoutes(): Application {
    this.app.route('/url').post(urlsControllers.createUrl);
    return this.app;
  }
}
