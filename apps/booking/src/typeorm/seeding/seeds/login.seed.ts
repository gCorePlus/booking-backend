import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Login } from '../../../entities';

export default class LoginSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Login)().createMany(10);
  }
}
