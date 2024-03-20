import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { v4 } from 'uuid';
import { CompanyEntity } from './company.entity';
import { LoginEntity } from './login.entity';

@Entity('Partner')
export class PartnerEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @OneToOne(() => LoginEntity, (entity) => entity.partner)
  @JoinColumn({ name: 'IdLogin' })
  login: LoginEntity;

  @ManyToMany(() => CompanyEntity, (entity) => entity.owners)
  @JoinTable({ name: 'PartnerCompany', joinColumn: { name: 'IdPartner' }, inverseJoinColumn: { name: 'IdCompany' } })
  companies: CompanyEntity[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
