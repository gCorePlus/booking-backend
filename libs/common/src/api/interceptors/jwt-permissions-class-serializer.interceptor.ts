import { ClassSerializerInterceptor, ExecutionContext, Inject, Optional } from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { ContextUtils } from '../../utils';

const REFLECTOR = 'Reflector';
export class JwtPermissionsClassSerializerInterceptor extends ClassSerializerInterceptor {

  constructor(
    @Inject(REFLECTOR) protected readonly reflector: any,
    @Optional() protected readonly defaultOptions: ClassTransformOptions = {},
  ) {
    super(reflector, defaultOptions);
  }

  protected getContextOptions(
    context: ExecutionContext,
  ): ClassTransformOptions | undefined {
    const options = (this as any).reflectSerializeMetadata(context.getHandler())
      || (this as any).reflectSerializeMetadata(context.getClass())
      || {}
    ;

    const permissions = ContextUtils.getPermissions(context) || [];
    options.groups = permissions.concat(options.groups || []);

    return options;
  }
}
