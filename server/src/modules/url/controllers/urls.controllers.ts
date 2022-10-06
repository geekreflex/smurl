import { Request, Response, NextFunction } from 'express';
import debug from 'debug';
import urlsService from '../services/urls.service';

const log: debug.IDebugger = debug('app-urls-controller');

class UrlsController {
  async createUrl(req: Request, res: Response) {
    console.log(req.body);
    const url = await urlsService.create(req.body);
    res.status(201).send({ url });
  }
}

export default new UrlsController();
