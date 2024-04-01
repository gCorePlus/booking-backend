import { setSeederFactory } from 'typeorm-extension';
import { Service } from '../../../entities';

export default setSeederFactory(Service, (faker, meta) => {
  const entity = new Service();

  entity.id = faker.string.uuid();
  entity.title = faker.commerce.productName();
  entity.description = faker.commerce.productDescription();
  entity.price = faker.commerce.price({ min: 25, max: 150 });
  entity.time = faker.number.int({ min: 1, max: 180 });

  return entity;
});
