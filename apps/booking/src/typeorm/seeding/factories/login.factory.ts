import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Login } from '../../../entities';

define(Login, (faker: typeof Faker) => {
  const entity = new Login();

  const genderFlag = faker.random.number({ min: 0, max: 1 });
  const gender: 'male' | 'female' = genderFlag ? 'male' : 'female';

  entity.id = faker.random.uuid();
  entity.name = `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`;
  entity.email = faker.internet.email(entity.name);

  return entity;
});
