import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Partner } from '../entities';
import { PartnerService } from '../services';

@Crud({
  model: {
    type: Partner,
  },
  query: {
    softDelete: true,
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
  validation: { transform: true, transformOptions: { excludeExtraneousValues: true } },
})
@ApiTags('Partner')
@ApiBearerAuth()
@Controller('partners')
export class PartnerController {

  constructor(private readonly service: PartnerService) {
  }

}
