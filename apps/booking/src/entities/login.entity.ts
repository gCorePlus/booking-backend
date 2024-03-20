import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { EmployeeEntity } from './employee.entity';
import { PartnerEntity } from './partner.entity';
import { UserEntity } from './user.entity';

@Entity('Login')
export class LoginEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @Column({ name: 'Email', type: 'text' })
  email: string;

  @OneToOne(() => PartnerEntity, (entity) => entity.login)
  partner: PartnerEntity;

  @OneToOne(() => UserEntity, (entity) => entity.login)
  user: UserEntity;

  @ManyToOne(() => EmployeeEntity, (entity) => entity.login)
  employees: EmployeeEntity;

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
