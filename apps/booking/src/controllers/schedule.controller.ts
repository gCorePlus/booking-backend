import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Schedule } from '../entities';
import { ScheduleService } from '../services';

@Crud({
  model: {
    type: Schedule,
  },
  query: {
    softDelete: true,
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
  validation: { transform: true, transformOptions: { excludeExtraneousValues: true } },
})
@ApiTags('Schedule')
@ApiBearerAuth()
@Controller('schedules')
export class ScheduleController {

  constructor(private readonly service: ScheduleService) {
  }

}
