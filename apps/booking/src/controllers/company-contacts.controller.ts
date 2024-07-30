import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CompanyContact } from '../entities';
import { CompanyContactService } from '../services';

@Crud({
  model: {
    type: CompanyContact,
  },
  query: {
    softDelete: true,
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
  validation: { transform: true, transformOptions: { excludeExtraneousValues: true } },
})
@ApiTags('CompanyContact')
@ApiBearerAuth()
@Controller('companies/:idCompany/contacts')
export class CompanyContactsController {

  constructor(private readonly service: CompanyContactService) {
  }

}
