import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './company.entity';
import { ContactType } from './contact-type.entity';

@Entity('CompanyContact')
export class CompanyContact extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Value', type: 'text' })
  value: string;

  @ManyToOne(() => ContactType, (entity) => entity.companyContacts)
  @JoinColumn({ name: 'IdContactType' })
  type: ContactType;

  @ManyToOne(() => Company, (entity) => entity.contacts)
  @JoinColumn({ name: 'IdCompany' })
  company: Company;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
