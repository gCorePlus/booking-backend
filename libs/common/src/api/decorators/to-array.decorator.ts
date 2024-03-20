import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export interface ToArrayOptions {
  separator: string;
}

const defaultOptions = {
  separator: ','
}

export function ToArray(options?: ToArrayOptions, transformOptions?: TransformOptions): (target: any, key: string) => void {
  const opts = Object.assign({}, defaultOptions, options);

  return Transform(({ value }: TransformFnParams) => {
    return typeof value === 'string' ? value.split(opts.separator) : value;
  }, transformOptions);
}
