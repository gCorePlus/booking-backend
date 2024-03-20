import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export function ToLowerCase(options?: TransformOptions): (target: any, key: string) => void {

  return Transform(({ value }: TransformFnParams) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.toLowerCase();
  }, options);
}
