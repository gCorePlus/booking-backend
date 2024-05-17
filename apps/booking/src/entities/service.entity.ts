import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './company.entity';
import { Schedule } from './schedule.entity';

@Entity('Service')
export class Service extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Title', type: 'text' })
  title: string;

  @Column({ name: 'Description', type: 'text' })
  description: string;

  @Column({ name: 'Time', type: 'numeric' })
  time: number;

  @Column({ name: 'Price', type: 'numeric' })
  price: string;

  @ManyToOne(() => Company, (entity) => entity.services)
  @JoinColumn({ name: 'IdCompany' })
  company: Company;

  @ManyToMany(() => Schedule, (entity) => entity.services)
  schedules: Schedule[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
