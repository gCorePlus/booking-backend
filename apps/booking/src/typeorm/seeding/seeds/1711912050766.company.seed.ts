import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Partner } from '../../../entities';

export default class CompanySeed1711912050766 implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const partnerRepositrory = await dataSource.getRepository(Partner);

    const partners = await partnerRepositrory.find();


    // faker.helpers.arrayElement;
  }
}
