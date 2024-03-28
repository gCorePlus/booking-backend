import { Global, Module } from '@nestjs/common';
import { DEFAULT_LOG_IGNORE, DEFAULT_LOG_LEVEL, POSTGRESQL_BOOKING_CONNECTION } from './environment.constants';
import { Environment } from './environment.interface';

@Global()
@Module({
  providers: [
    {
      provide: Environment,
      useFactory: async (): Promise<Environment> => ({
        NODE_ENV: process.env.NODE_ENV,
        LOG_LEVEL: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
        LOG_REDACT: process.env.LOG_REDACT ? process.env.LOG_REDACT.split(',') : [],
        LOG_IGNORE: process.env.LOG_IGNORE ? process.env.LOG_IGNORE.split(',') : DEFAULT_LOG_IGNORE,

        POSTGRESQL_BOOKING_URL: process.env.POSTGRESQL_BOOKING_URL,
        POSTGRESQL_BOOKING_SCHEMA: process.env.POSTGRESQL_BOOKING_SCHEMA || POSTGRESQL_BOOKING_CONNECTION,
      }),
    },
  ],
  exports: [Environment],
})
export class EnvironmentModule {}
