import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export function ToUpperCase(options?: TransformOptions): (target: any, key: string) => void {

  return Transform(({ value }: TransformFnParams) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.toUpperCase();
  }, options);
}
