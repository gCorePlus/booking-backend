import { POSTGRESQL_BOOKING_CONNECTION, POSTGRESQL_BOOKING_SCHEMA } from '@app/environment';
import { join } from 'path';

export default {
  type: 'postgres',
  name: POSTGRESQL_BOOKING_CONNECTION,
  url: process.env.POSTGRESQL_BOOKING_URL,
  schema: POSTGRESQL_BOOKING_SCHEMA,
  logging: /true/i.test(process.env.POSTGRESQL_BOOKING_LOGGING),
  // logger: process.env.POSTGRESQL_BOOKING_LOGGER || new PinoTypeOrmLogger(),
  migrationsRun: /true/i.test(process.env.POSTGRESQL_BOOKING_MIGRATIONS_RUN),
  migrations: [join(__dirname, 'typeorm/migrations/*.{ts,js}')],
  entities: [join(__dirname, 'entities/*.{ts,js}')],
  seeds: [join(__dirname, 'typeorm/seeding/seeds/*.{ts,js}')],
  factories: [join(__dirname, 'typeorm/seeding/factories/*.{ts,js}')],
};
