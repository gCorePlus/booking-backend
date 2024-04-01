import { setSeederFactory } from 'typeorm-extension';
import { ContactType } from '../../../entities';

export default setSeederFactory(ContactType, (faker, meta) => {
  const entity = new ContactType();

  entity.id = faker.string.uuid();

  return entity;
});
