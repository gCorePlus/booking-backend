import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Partner } from './partner.entity';
import { User } from './user.entity';

@Entity('Login')
export class Login extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'FirstName', type: 'text' })
  firstName: string;

  @Column({ name: 'LastName', type: 'text' })
  lastName: string;

  @Column({ name: 'Email', type: 'text' })
  email: string;

  @OneToOne(() => Partner, (entity) => entity.login, { cascade: true })
  partner: Partner;

  @OneToOne(() => User, (entity) => entity.login, { cascade: true })
  user: User;



  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
