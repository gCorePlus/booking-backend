import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyContact } from './company-contact.entity';

@Entity('ContactType')
export class ContactType extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @Column({ name: 'Title', type: 'text' })
  title: string;

  @OneToMany(() => CompanyContact, (entity) => entity.contactType)
  companyContacts: CompanyContact[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
