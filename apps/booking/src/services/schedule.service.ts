import { POSTGRESQL_BOOKING_CONNECTION } from '@app/environment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Schedule } from '../entities';

@Injectable()
export class ScheduleService extends TypeOrmCrudService<Schedule> {

  constructor(
    @InjectRepository(Schedule, POSTGRESQL_BOOKING_CONNECTION) protected repo
  ) {
    super(repo);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity= await this.getOneOrFail(crudRequest);
    return this.repo.softRemove(myEntity);
  }
}
