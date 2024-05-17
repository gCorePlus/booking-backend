import { POSTGRESQL_CONNECTION } from '@app/environment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Partner } from '../entities';

@Injectable()
export class PartnerService extends TypeOrmCrudService<Partner> {

  constructor(
    @InjectRepository(Partner, POSTGRESQL_CONNECTION) protected repo
  ) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity= await this.getOneOrFail(crudRequest);
    return this.repo.softRemove(myEntity);
  }
}
