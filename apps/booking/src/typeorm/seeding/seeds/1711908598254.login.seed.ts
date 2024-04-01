import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Login, Partner, User } from '../../../entities';

export default class LoginSeed1711908598254 implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const loginRepository = dataSource.getRepository(Login);

    const loginFactory = factoryManager.get(Login);
    const userFactory = factoryManager.get(User);
    const partnerFactory = factoryManager.get(Partner);

    const logins = await Promise.all(
      Array(1)
        .fill('')
        .map(async () => {
          const random = faker.number.int({ min: 0, max: 1 });
          const login = await loginFactory.make();

          if (random === 0) login.user = await userFactory.make();
          if (random === 1) login.partner = await partnerFactory.make();

          return login;
        })
    );

    await loginRepository.save(logins);
    // faker.helpers.arrayElement;
  }
}
