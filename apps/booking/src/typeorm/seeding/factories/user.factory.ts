import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../../entities';

export default setSeederFactory(User, (faker, meta) => {
  const entity = new User();

  entity.id = faker.string.uuid();
  // entity.login = factory(Login)() as any;

  return entity;
});
