import { POSTGRESQL_CONNECTION } from '@app/environment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CompanyContact } from '../entities';

@Injectable()
export class CompanyContactService extends TypeOrmCrudService<CompanyContact> {

  constructor(
    @InjectRepository(CompanyContact, POSTGRESQL_CONNECTION) protected repo
  ) {
    super(repo);
  }

  async deleteOne(request: CrudRequest) {
    const entity= await this.getOneOrFail(request);
    return this.repo.softRemove(entity);
  }
}
