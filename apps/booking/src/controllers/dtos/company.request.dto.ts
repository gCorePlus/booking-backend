import { Exclude, Expose, Type } from 'class-transformer';
import { IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';

@Exclude()
export class CompanyBusinessTypeRequest {
  @Expose() @IsUUID() id: string;
}

@Exclude()
export class CompanyRequest {
  @Expose() @IsString() name: string;
  @Expose() @ValidateNested() @Type(() => CompanyBusinessTypeRequest) @IsObject() businessType: CompanyBusinessTypeRequest;
}
