import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyEntity } from './company.entity';

@Entity('Service')
export class ServiceEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Title', type: 'text' })
  title: string;

  @Column({ name: 'Description', type: 'text' })
  description: string;

  @Column({ name: 'Time', type: 'text' })
  time: string;

  @Column({ name: 'Cost', type: 'numeric' })
  cost: string;

  @ManyToOne(() => CompanyEntity, (entity) => entity.services)
  @JoinColumn({ name: 'IdCompany' })
  company: CompanyEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
