import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { Employee } from './employee.entity';
import { Service } from './service.entity';
import { User } from './user.entity';

@Entity('Schedule')
export class Schedule extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Start', type: 'timestamp' })
  start: Date;

  @Column({ name: 'End', type: 'timestamp' })
  end: Date;

  @ManyToOne(() => User, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdUser' })
  user: User;

  @ManyToOne(() => Employee, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdEmployee' })
  employee: Employee;

  @ManyToMany(() => Service, (entity) => entity.schedules)
  @JoinTable({ name: 'ScheduleService', joinColumn: { name: 'IdSchedule' }, inverseJoinColumn: { name: 'IdService' } })
  services: Service[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
