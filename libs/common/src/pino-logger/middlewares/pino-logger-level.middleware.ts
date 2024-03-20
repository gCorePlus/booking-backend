import { DEFAULT_CUSTOM_LOG_LEVEL_HEADER } from '../pino-logger.contants';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { NextFunction } from 'express';

interface CustomLogLevel {
  level: string;
  path: string;
  regex: RegExp;
}

/**
 * LOG_LEVEL_INFO_CUSTOM_PATH
 *   {[<LOG_LEVEL=info>:]<URL_PATH>}[,...]
 *   debug:/api/v1/toolbox/people,info:/synchronizations/people,/api/v1/toolbox/companies
 */
@Injectable()
export class PinoLoggerLevelMiddleware implements NestMiddleware {

  constructor(
    @InjectPinoLogger(PinoLoggerLevelMiddleware.name) private readonly pinoLogger: PinoLogger
  ) {
  }

  use(req: Request, res: Response, next: NextFunction) {
    const requestLogLevel = req.headers[DEFAULT_CUSTOM_LOG_LEVEL_HEADER];
    if (requestLogLevel) {
      this.pinoLogger.logger.level = requestLogLevel;
    } else {
      if (process.env.LOG_LEVEL_CUSTOM_PATH) {
        const url = (req as any).originalUrl || (req as any).baseUrl || req.url;
        const paths: CustomLogLevel[] = process.env.LOG_LEVEL_CUSTOM_PATH.split(',').map<CustomLogLevel>((item: string) => {
          const splited = item.indexOf(':') !== -1 ? item.split(':') : ['info', item];
          return {
            level: splited[0],
            path: splited[1],
            regex: new RegExp(splited[1]),
          };
        });

        const customLogLevel: CustomLogLevel = paths.find((item) => item.regex.test(url));
        if (customLogLevel) {
          this.pinoLogger.logger.level = customLogLevel.level;
        }
      }
    }


    next();
  }
}
