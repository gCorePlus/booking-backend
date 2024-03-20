import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyEntity } from './company.entity';

@Entity('BusinessType')
export class BusinessTypeEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @OneToMany(() => CompanyEntity, (entity) => entity.businessType)
  @JoinColumn({ name: 'IdCompany' })
  companies: CompanyEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
