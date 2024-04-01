import { setSeederFactory } from 'typeorm-extension';
import { BusinessType } from '../../../entities';

export default setSeederFactory(BusinessType, (faker, meta) => {
  const entity = new BusinessType();

  entity.id = faker.string.uuid();
  entity.name = faker.commerce.department();

  return entity;
});
