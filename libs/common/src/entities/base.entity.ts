import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {

  @Column({ name: 'CreatedAt', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'UpdatedAt', type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'DeletedAt', type: 'timestamp' })
  deletedAt: Date | null;

  @BeforeInsert()
  beforeInsertBase() {
    this.createdAt = this.createdAt || new Date();
  }

  @BeforeUpdate()
  beforeUpdateBase() {
    this.updatedAt = new Date();
  }

  constructor(init?: any) {
    Object.assign(this, init);
  }
}
