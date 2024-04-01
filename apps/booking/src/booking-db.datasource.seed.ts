import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import datasource from './booking-db.datasource';

export default new DataSource({
  ...datasource.options,
  entities:   ['dist/**/booking/src/entities/*.{ts,js}'],
  migrations: ['dist/**/booking/src/typeorm/migrations/*.{ts,js}'],
  seeds:      ['dist/**/booking/src/typeorm/seeding/seeds/*.{ts,js}'],
  factories:  ['dist/**/booking/src/typeorm/seeding/factories/*.{ts,js}'],
} as DataSourceOptions & SeederOptions);
