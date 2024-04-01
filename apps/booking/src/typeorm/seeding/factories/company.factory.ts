import { setSeederFactory } from 'typeorm-extension';
import { Company } from '../../../entities';

export default setSeederFactory(Company, (faker, meta) => {
  const entity = new Company();

  entity.id = faker.string.uuid();
  entity.name = faker.company.name();
  // entity.businessType = factory(BusinessType)() as any;

  return entity;
});
