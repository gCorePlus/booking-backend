import { Transform, TransformFnParams } from 'class-transformer';
import { isFunction } from '@nestjs/common/utils/shared.utils';

export function DefaultValue(defaultValue: any) {
  return Transform(({ value }: TransformFnParams) => {
    if (value) return value;
    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  });
}
