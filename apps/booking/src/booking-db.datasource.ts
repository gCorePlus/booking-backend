import { join } from 'path';
import { DataSource } from 'typeorm';
import { BOOKING_CONNECTION, BOOKING_SCHEMA } from './booking.contants';

export default new DataSource({
  type: 'postgres',
  name: BOOKING_CONNECTION,
  schema: BOOKING_SCHEMA,
  url: process.env.POSTGRESQL_URL,
  logging: /true/i.test(process.env.POSTGRESQL_LOGGING),
  migrationsRun: /true/i.test(process.env.POSTGRESQL_MIGRATIONS_RUN),
  migrations: [
    join(__dirname, 'migrations/postgresql/*.{ts,js}'),
  ],
})
