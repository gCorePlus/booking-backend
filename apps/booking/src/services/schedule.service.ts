import { POSTGRESQL_CONNECTION } from '@app/environment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Schedule } from '../entities';

@Injectable()
export class ScheduleService extends TypeOrmCrudService<Schedule> {

  constructor(
    @InjectRepository(Schedule, POSTGRESQL_CONNECTION) protected repo
  ) {
    super(repo);
  }

  async deleteOne(request: CrudRequest) {
    const entity= await this.getOneOrFail(request);
    return this.repo.softRemove(entity);
  }
}
