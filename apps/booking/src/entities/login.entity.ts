import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Employee } from './employee.entity';
import { Partner } from './partner.entity';
import { User } from './user.entity';

@Entity('Login')
export class Login extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @Column({ name: 'Email', type: 'text' })
  email: string;

  @OneToOne(() => Partner, (entity) => entity.login)
  partner: Partner;

  @OneToOne(() => User, (entity) => entity.login)
  user: User;

  @OneToMany(() => Employee, (entity) => entity.login)
  employees: Employee[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
