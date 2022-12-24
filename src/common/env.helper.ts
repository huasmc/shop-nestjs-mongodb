import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(key: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${key}/.env`);
  const filename: string = env ? `${env}.env` : `development.env`;
  let filePath: string = resolve(`${key}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}
