import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { LoginEntity } from './login.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity('User')
export class UserEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @OneToOne(() => LoginEntity, (entity) => entity.user)
  @JoinColumn({ name: 'IdLogin' })
  login: LoginEntity;

  @OneToMany(() => ScheduleEntity, (entity) => entity.user)
  schedules: ScheduleEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
