import { Module } from '@nestjs/common';
import { BookingController } from './controllers';
import { BookingService } from './services';
import { LoggerModule } from 'nestjs-pino';
import { Environment, EnvironmentModule } from '@app/environment';
import { IncomingMessage } from 'http';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    // Logger
    LoggerModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [Environment],
      useFactory: ((environment: Environment) => ({
        pinoHttp: {
          level: environment.LOG_LEVEL,
          autoLogging: {
            ignore: (req: IncomingMessage) => ['/health', '/favicon.ico'].includes(req.url),
          },
          redact: {
            paths: environment.LOG_REDACT,
          },
          serializers: {
            // include request body into logs
            req(req) {
              req.body = req.raw.body;
              return req;
            },
          },
        },
      })),
    }),
  ],
})
export class BookingModule {
}
