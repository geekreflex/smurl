import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express, { Application } from 'express';
import { CommonRoutesConfig } from './common/common.routes.config';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import * as http from 'http';
import { UrlRoutes } from './modules/url/urls.routes.config';

class Server {
  /**
   * Routes
   */

  private app: Application;
  private server: http.Server;
  private routes: Array<CommonRoutesConfig> = [];
  private debugLog: debug.IDebugger;
  public port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.debugLog = debug('app');
    this.configuration();
    this.allRoutes();
  }

  private configuration() {
    this.app.use(express.json());
    this.app.use(cors());
    const loggerOptions: expressWinston.LoggerOptions = {
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      ),
    };

    if (!process.env.DEBUG) {
      loggerOptions.meta = false;
      if (typeof global === 'function') {
        loggerOptions.level = 'http';
      }
    }

    this.app.use(expressWinston.logger(loggerOptions));
  }

  public allRoutes() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).send('Running');
    });
    this.routes.push(new UrlRoutes(this.app));
  }

  public start() {
    this.server.listen(this.port, () => {
      this.routes.forEach((route: CommonRoutesConfig) => {
        this.debugLog(`Routes configured for ${route.getName()}`);
      });
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
