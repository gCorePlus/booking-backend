import { setSeederFactory } from 'typeorm-extension';
import { Employee } from '../../../entities';

export default setSeederFactory(Employee, (faker, meta) => {
  const entity = new Employee();

  entity.id = faker.string.uuid();
  entity.name = faker.person.firstName();
  // entity.businessType = factory(BusinessType)() as any;

  return entity;
});
