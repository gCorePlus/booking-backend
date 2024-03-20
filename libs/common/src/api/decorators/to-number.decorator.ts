import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export function ToNumber(options?: TransformOptions): (target: any, key: string) => void {

  return Transform(({ value }: TransformFnParams) => value ? +value : undefined, options);
}
