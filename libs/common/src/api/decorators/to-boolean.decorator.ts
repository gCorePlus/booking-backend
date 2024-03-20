import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export function ToBoolean(options?: TransformOptions): (target: any, key: string) => void {

  return Transform(({ value }: TransformFnParams) => {
    return typeof value !== 'undefined' ? /true/i.test(value) : undefined;
  }, options);
}
