import { DataSource } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import datasource from './booking-db.datasource';
import ScheduleSeed1712028463376 from './typeorm/seeding/seeds/1712028463376.schedule.seed';

(async () => {
  const dataSource = new DataSource({
    ...datasource.options,
    // entities: ['dist/**/entities/*.{ts,js}']
  });
  await dataSource.initialize();

  const options: SeederOptions = {
    // seeds: ['dist/apps/app/apps/booking/src/typeorm/seeding/seeds/*.{ts,js}'],
    seeds: [ScheduleSeed1712028463376],
    factories: ['dist/apps/app/apps/booking/src/typeorm/seeding/factories/*.{ts,js}']
  };
  await runSeeders(dataSource, options);
})();
