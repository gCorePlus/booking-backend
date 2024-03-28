import { Environment, EnvironmentModule } from '@app/environment';
import { Module } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { BookingDBModule } from './booking-db.module';
import { PartnersController, SchedulesController } from './controllers';
import { PartnerService, ScheduleService } from './services';

@Module({
  controllers: [SchedulesController, PartnersController],
  providers: [ScheduleService, PartnerService],
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

    // Database
    BookingDBModule,
  ],
})
export class BookingModule {
}
