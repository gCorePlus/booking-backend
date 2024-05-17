export class Environment {
  NODE_ENV: string;
  LOG_LEVEL: string;
  LOG_REDACT: string[];
  LOG_IGNORE: string[];

  POSTGRESQL_URL: string;
  POSTGRESQL_SCHEMA: string;
  POSTGRESQL_LOGGER: 'advanced-console' | 'simple-console' | 'file' | 'debug';
}
