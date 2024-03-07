import { Global, Module } from '@nestjs/common';
import { Environment } from './environment.interface';
import { DEFAULT_LOG_LEVEL } from '@app/environment/environment.constants';

@Global()
@Module({
  providers: [
    {
      provide: Environment,
      useFactory: async (): Promise<Environment> => ({
        NODE_ENV: process.env.NODE_ENV,
        LOG_LEVEL: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
        LOG_REDACT: process.env.LOG_REDACT ? process.env.LOG_REDACT.split(',') : [],

        POSTGRESQL_CONNECTION_STRING: process.env.POSTGRESQL_CONNECTION_STRING,
      }),
    },
  ],
  exports: [Environment],
})
export class EnvironmentModule {}
