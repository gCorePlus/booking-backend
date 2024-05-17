import { POSTGRESQL_CONNECTION, POSTGRESQL_SCHEMA } from '@app/environment';
import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  name: POSTGRESQL_CONNECTION,
  url: process.env.POSTGRESQL_URL,
  schema: POSTGRESQL_SCHEMA,
  logging: /true/i.test(process.env.POSTGRESQL_LOGGING),
  migrationsRun: /true/i.test(process.env.POSTGRESQL_MIGRATIONS_RUN),
  entities:   [join(__dirname, 'entities/*.{ts,js}')],
  migrations: [join(__dirname, 'typeorm/migrations/*.{ts,js}')],
});
