import { BeforeInsert, BeforeRemove, BeforeUpdate } from 'typeorm';
import { OperationTypeEnum } from './enums';
import { BaseEntity } from './base.entity';

export abstract class OperationTypeBaseEntity extends BaseEntity {

  operation: OperationTypeEnum;

  @BeforeInsert()
  beforeInsertOperationType() {
    this.operation = OperationTypeEnum.CREATED;
  }

  @BeforeUpdate()
  beforeUpdateOperationType() {
    this.operation = OperationTypeEnum.UPDATED;
  }

  @BeforeRemove()
  beforeDeleteOperationType() {
    this.operation = OperationTypeEnum.DELETED;
  }

  constructor(init?: any) {
    super(init);
  }
}
