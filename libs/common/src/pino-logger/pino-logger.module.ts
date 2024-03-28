import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PinoLoggerLevelMiddleware } from './middlewares';

@Module({})
export class PinoLoggerModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PinoLoggerLevelMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
    ;
  }

}
