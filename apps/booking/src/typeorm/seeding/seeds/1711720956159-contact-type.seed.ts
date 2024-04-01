import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ContactType } from '../../../entities';
import { ContactTypeEnum, ContactTypeLabelEnum } from '../../../entities/enums';

export default class ContactTypeSeed1711720956159 implements Seeder {
  track = true;
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    await factoryManager.get(ContactType).save({ name: ContactTypeEnum.EMAIL   , label: ContactTypeLabelEnum.EMAIL });
    await factoryManager.get(ContactType).save({ name: ContactTypeEnum.PHONE   , label: ContactTypeLabelEnum.PHONE });
    await factoryManager.get(ContactType).save({ name: ContactTypeEnum.WHATSAPP, label: ContactTypeLabelEnum.WHATSAPP });
  }
}
