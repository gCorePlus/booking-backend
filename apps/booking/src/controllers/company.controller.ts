import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Company } from '../entities';
import { CompanyService } from '../services';
import { CompanyRequest, CompanyResponse } from './dtos';

@Crud({
  model: {
    type: Company,
  },
  dto: {
    create: CompanyRequest,
    update: CompanyRequest,
    replace: CompanyRequest,
  },
  serialize: {
    // getMany: GetManyDefaultResponse<CompanyResponse>,
    get: CompanyResponse,
    create: CompanyResponse,
    // createMany: CompanyResponse,
    // update: CompanyRequest,
    // replace: CompanyRequest,
  },
  query: {
    join: {
      businessType: {},
      contacts: {},
      'contacts.type': {},
    },
    softDelete: true,
    alwaysPaginate: true
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'uuid',
    },
  },
  routes: {
  },
  validation: {
    transform: true,
    transformOptions: { excludeExtraneousValues: true, exposeUnsetFields: false },
  },
})
@ApiTags('Company')
@ApiBearerAuth()
@Controller('companies')
export class CompanyController /*implements CrudController<Company>*/ {

  constructor(public service: CompanyService) {
  }

  // @Override()
  // createOne(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: Company,
  // ) {
  //   return this.base.createOneBase(req, dto);
  // }
  //
  // get base(): CrudController<Company> {
  //   return this;
  // }
}
