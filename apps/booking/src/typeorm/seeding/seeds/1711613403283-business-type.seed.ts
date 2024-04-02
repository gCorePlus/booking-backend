import { isNil } from '@nestjs/common/utils/shared.utils';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BusinessType } from '../../../entities';

export default class BusinessTypeSeed1711613403283 implements Seeder {
  track = true;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const businessTypeRepository = dataSource.getRepository(BusinessType);
    const businessTypeFactory = factoryManager.get(BusinessType);

    const items = await Promise.all(
      Array(20)
        .fill('')
        .map(() => businessTypeFactory.make()),
    );
    const reduce = items.reduce<BusinessType[]>((acc, curr) => {
      const found = acc.find(item => item.name === curr.name);
      if (isNil(found)) acc.push(curr);

      return acc;
    }, []);

    await businessTypeRepository.save(reduce);
  }
}
