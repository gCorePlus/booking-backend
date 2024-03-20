import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export const DEFAULT_OPTIONS: Partial<ReplaceOptions> = { replace: '' };

export interface ReplaceOptions {
  regex: RegExp;
  replace?: string;
}

export function Replace(options?: ReplaceOptions, transformOptions?: TransformOptions): (target: any, key: string) => void {
  const opts: ReplaceOptions = { ...DEFAULT_OPTIONS, ...options };
  return Transform(({ value }: TransformFnParams) => {
    return typeof value !== 'undefined' ? value.replace(opts.regex, opts.replace) : undefined;
  }, transformOptions);
}

export const RemoveInvisibleChars = () => Replace({ regex: /[^\x00-\x7F]/g });