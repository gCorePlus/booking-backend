import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Employee } from './employee.entity';
import { User } from './user.entity';

@Entity('Schedule')
export class Schedule extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Start', type: 'timestamp' })
  start: string;

  @Column({ name: 'End', type: 'timestamp' })
  end: string;

  @ManyToOne(() => User, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdLogin' })
  user: User;

  @ManyToOne(() => Employee, (entity) => entity.schedules)
  @JoinColumn({ name: 'IdEmployee' })
  employee: Employee;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
