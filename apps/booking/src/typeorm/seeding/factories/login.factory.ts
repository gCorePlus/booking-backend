import { setSeederFactory } from 'typeorm-extension';
import { Login } from '../../../entities';

export default setSeederFactory(Login, (faker, meta) => {
  const entity = new Login();

  const sex = faker.person.sexType();

  entity.id = faker.string.uuid();
  entity.firstName = faker.person.firstName(sex);
  entity.lastName = faker.person.lastName(sex);
  entity.email = faker.internet.email({ firstName: entity.firstName, lastName: entity.lastName });

  return entity;
});
