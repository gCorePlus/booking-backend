import { OperationTypeBaseEntity } from '@app/common/entities';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { BusinessTypeEntity } from './business-type.entity';
import { EmployeeEntity } from './employee.entity';
import { LoginEntity } from './login.entity';
import { PartnerEntity } from './partner.entity';
import { ServiceEntity } from './service.entity';

@Entity('Company')
export class CompanyEntity extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @ManyToOne(() => LoginEntity, (entity) => entity.user)
  @JoinColumn({ name: 'IdBusinessType' })
  businessType: BusinessTypeEntity;

  @OneToMany(() => ServiceEntity, (entity) => entity.company)
  services: ServiceEntity;

  @OneToMany(() => EmployeeEntity, (entity) => entity.company)
  employees: EmployeeEntity;

  @ManyToMany(() => PartnerEntity, (entity) => entity.companies)
  owners: PartnerEntity[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
