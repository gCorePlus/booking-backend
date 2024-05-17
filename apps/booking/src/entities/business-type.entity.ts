import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './company.entity';

@Entity('BusinessType')
export class BusinessType extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @OneToMany(() => Company, (entity) => entity.businessType)
  @JoinColumn({ name: 'IdCompany' })
  companies: Company;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
