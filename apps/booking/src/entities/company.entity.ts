import { OperationTypeBaseEntity } from '@app/common';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import { BusinessType } from './business-type.entity';
import { CompanyContact } from './company-contact.entity';
import { Employee } from './employee.entity';
import { Login } from './login.entity';
import { Partner } from './partner.entity';
import { Service } from './service.entity';

@Entity('Company')
export class Company extends OperationTypeBaseEntity {

  @Column({ name: 'Id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'Name', type: 'text' })
  name: string;

  @ManyToOne(() => Login, (entity) => entity.user)
  @JoinColumn({ name: 'IdBusinessType' })
  businessType: BusinessType;

  @OneToMany(() => Service, (entity) => entity.company, { cascade: true })
  services: Service[];

  @OneToMany(() => Employee, (entity) => entity.company, { cascade: true })
  employees: Employee[];

  @OneToMany(() => CompanyContact, (entity) => entity.company, { cascade: true })
  contacts: CompanyContact[];

  @ManyToMany(() => Partner, (entity) => entity.companies)
  owners: Partner[];

  constructor(init?: any) {
    super(init);
  }

  @BeforeInsert()
  onInsert() {
    this.id = this.id || v4();
  }
}
