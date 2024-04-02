import { setSeederFactory } from 'typeorm-extension';
import { CompanyContact } from '../../../entities';
import { ContactTypeEnum } from '../../../entities/enums';

export default setSeederFactory(CompanyContact, (faker, meta?: Pick<CompanyContact, 'type'>) => {
  const entity = new CompanyContact();

  entity.id = faker.string.uuid();

  if ([ContactTypeEnum.EMAIL].includes(meta.type?.name as ContactTypeEnum)) entity.value = faker.internet.email();
  if ([ContactTypeEnum.PHONE, ContactTypeEnum.WHATSAPP].includes(meta.type?.name as ContactTypeEnum)) entity.value = faker.phone.number();

  return entity;
});
