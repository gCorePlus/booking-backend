import { DataSource } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import datasource from './booking-db.datasource';
import BusinessTypeSeed1711613403283 from './typeorm/seeding/seeds/1711613403283-business-type.seed';

(async () => {
  const dataSource = new DataSource({
    ...datasource.options,
    // entities: ['dist/**/entities/*.{ts,js}']
  });
  await dataSource.initialize();

  const options: SeederOptions = {
    // seeds: ['dist/apps/app/apps/booking/src/typeorm/seeding/seeds/*.{ts,js}'],
    seeds: [BusinessTypeSeed1711613403283],
    factories: ['dist/apps/app/apps/booking/src/typeorm/seeding/factories/*.{ts,js}']
  };
  await runSeeders(dataSource, options);
})();
