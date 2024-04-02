import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Company, Schedule, User } from '../../../entities';

export default class ScheduleSeed1712028463376 implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const scheduleRepository = dataSource.getRepository(Schedule);
    const companyRepository = dataSource.getRepository(Company);

    const scheduleFactory = factoryManager.get(Schedule);

    const companies = await companyRepository.find({ relations: ['services', 'employees']});
    const users = await userRepository.find();

    const schedules = await Promise.all(
      Array(faker.number.int({ min: 10, max: 50 }))
        .fill('')
        .map(async () => {
          const company = faker.helpers.arrayElement(companies);

          scheduleFactory.setMeta({ services: company.services });
          const schedule = await scheduleFactory.make();

          schedule.user = faker.helpers.arrayElement(users);
          schedule.employee = faker.helpers.arrayElement(company.employees);
          schedule.services = Array(1)
            .fill('')
            .map(() => faker.helpers.arrayElement(company.services));

          return schedule;
        })
    );

    await scheduleRepository.save(schedules);
  }
}
