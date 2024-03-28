import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Login } from './login.entity';
import { Schedule } from './schedule.entity';

@Entity('User')
export class User extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @OneToOne(() => Login, (entity) => entity.user)
  @JoinColumn({ name: 'IdLogin' })
  login: Login;

  @OneToMany(() => Schedule, (entity) => entity.user)
  schedules: Schedule;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
