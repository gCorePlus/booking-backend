import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { EmployeeEntity } from './employee.entity';
import { UserEntity } from './user.entity';

@Entity('Schedule')
export class ScheduleEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Start', type: 'timestamp' })
  start: string;

  @Column({ name: 'End', type: 'timestamp' })
  end: string;

  @ManyToOne(() => UserEntity, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdLogin' })
  user: UserEntity;

  @ManyToOne(() => EmployeeEntity, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdEmployee' })
  employee: EmployeeEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
