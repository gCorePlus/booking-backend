import { POSTGRESQL_BOOKING_CONNECTION, POSTGRESQL_BOOKING_SCHEMA } from '@app/environment';
import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  name: POSTGRESQL_BOOKING_CONNECTION,
  url: process.env.POSTGRESQL_BOOKING_URL,
  schema: POSTGRESQL_BOOKING_SCHEMA,
  logging: /true/i.test(process.env.POSTGRESQL_BOOKING_LOGGING),
  migrationsRun: /true/i.test(process.env.POSTGRESQL_BOOKING_MIGRATIONS_RUN),
  // logger: process.env.POSTGRESQL_BOOKING_LOGGER || new PinoTypeOrmLogger(),
  entities:   [join(__dirname, 'entities/*.{ts,js}')],
  migrations: [join(__dirname, 'typeorm/migrations/*.{ts,js}')],
});
