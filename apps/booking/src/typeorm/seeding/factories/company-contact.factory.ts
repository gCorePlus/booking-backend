import { setSeederFactory } from 'typeorm-extension';
import { CompanyContact } from '../../../entities';

export default setSeederFactory(CompanyContact, (faker, meta) => {
  const random = faker.number.int({ min: 0, max: 1 });

  const entity = new CompanyContact();

  entity.id = faker.string.uuid();

  if (random === 0) entity.value = faker.phone.number();
  if (random === 1) entity.value = faker.internet.email();

  return entity;
});
