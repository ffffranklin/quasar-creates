import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// use relative url so as not to break next.config.js
import { env } from '../config/env';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function s3Url(
  path = '',
  baseUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/`
): URL {
  return new URL(`${baseUrl}${path}`);
}
