import { Environment, EnvironmentModule } from '@app/environment';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { BookingAPIModule } from './booking-api.module';

@Module({
  imports: [
    // Logger
    LoggerModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [Environment],
      useFactory: ((environment: Environment) => ({
        pinoHttp: {
          level: environment.LOG_LEVEL,
          autoLogging: {
            ignore: (req: IncomingMessage) => environment.LOG_IGNORE.includes(req.url),
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

    // Modules
    BookingAPIModule,

    // Routes
    RouterModule.register([
      {
        path: '/api/v1',
        module: BookingAPIModule
      },
    ]),
  ],
})
export class BookingModule {
}
