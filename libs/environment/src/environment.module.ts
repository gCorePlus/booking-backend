import { Global, Module } from '@nestjs/common';
import { DEFAULT_LOG_IGNORE, DEFAULT_LOG_LEVEL, POSTGRESQL_SCHEMA } from './environment.constants';
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

        POSTGRESQL_URL: process.env.POSTGRESQL_URL,
        POSTGRESQL_SCHEMA: POSTGRESQL_SCHEMA,
        POSTGRESQL_LOGGER: process.env.POSTGRESQL_LOGGER as any,
      }),
    },
  ],
  exports: [Environment],
})
export class EnvironmentModule {}
