import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './company.entity';
import { Login } from './login.entity';
import { Schedule } from './schedule.entity';

@Entity('Employee')
export class Employee extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @ManyToOne(() => Login, (entity) => entity.employees)
  @JoinColumn({ name: 'IdLogin' })
  login: Login;

  @ManyToOne(() => Company, (entity) => entity.employees)
  @JoinColumn({ name: 'IdCompany' })
  company: Company;

  @OneToMany(() => Schedule, (entity) => entity.employee)
  schedules: Schedule[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
