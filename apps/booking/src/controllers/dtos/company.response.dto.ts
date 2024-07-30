import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@Exclude()
export class CompanyBusinessTypeResponse {
  @Expose() id: string;
  @Expose() name: string;
}

@Exclude()
export class CompanyResponse {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() @ValidateNested() @Type(() => CompanyBusinessTypeResponse) businessType: CompanyBusinessTypeResponse;
}
