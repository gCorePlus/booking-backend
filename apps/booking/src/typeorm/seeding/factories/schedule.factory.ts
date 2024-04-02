import * as moment from 'moment';
import { setSeederFactory } from 'typeorm-extension';
import { Schedule } from '../../../entities';

export default setSeederFactory(Schedule, (faker, meta: Pick<Schedule, 'services'>) => {
  const entity = new Schedule();

  entity.id = faker.string.uuid();

  const start = moment(faker.date.soon({ days: 10 }))
    .set({ minute: 0, second: 0, millisecond: 0 });
  entity.start = start.toDate();

  const total = meta.services.reduce((acc, curr) => acc += curr.time, 0);
  entity.end = moment(entity.start).add(total, 'minutes').toDate();

  return entity;
});
