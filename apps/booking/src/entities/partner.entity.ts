import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { Company } from './company.entity';
import { Login } from './login.entity';

@Entity('Partner')
export class Partner extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @OneToOne(() => Login, (entity) => entity.partner)
  @JoinColumn({ name: 'IdLogin' })
  login: Login;

  @ManyToMany(() => Company, (entity) => entity.owners)
  @JoinTable({ name: 'PartnerCompany', joinColumn: { name: 'IdPartner' }, inverseJoinColumn: { name: 'IdCompany' } })
  companies: Company[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
