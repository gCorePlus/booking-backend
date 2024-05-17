import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyContact } from './company-contact.entity';

@Entity('ContactType')
export class ContactType extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @Column({ name: 'Label', type: 'text' })
  label: string;

  @OneToMany(() => CompanyContact, (entity) => entity.type)
  companyContacts: CompanyContact[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
