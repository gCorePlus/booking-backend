import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyEntity } from './company.entity';
import { LoginEntity } from './login.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity('Employee')
export class EmployeeEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @ManyToOne(() => LoginEntity, (entity) => entity.employees)
  @JoinColumn({ name: 'IdLogin' })
  login: LoginEntity;

  @ManyToOne(() => CompanyEntity, (entity) => entity.employees)
  @JoinColumn({ name: 'IdCompany' })
  company: CompanyEntity;

  @OneToMany(() => ScheduleEntity, (entity) => entity.employee)
  schedules: ScheduleEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
