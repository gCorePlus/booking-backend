import { setSeederFactory } from 'typeorm-extension';
import { Partner } from '../../../entities';

export default setSeederFactory(Partner, (faker, meta) => {
  const entity = new Partner();

  entity.id = faker.string.uuid();
  // entity.login = factory(Login)() as any;

  return entity;
});
