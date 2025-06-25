import * as fs from 'node:fs/promises';
import path from 'node:path';
// import { fileURLToPath } from 'node:url';

export function readMovies() {
  console.log(import.meta.dirname);
  console.log(import.meta.filename);

  // const dirname = path.dirname(fileURLToPath(import.meta.url));

  const filePath = path.join(import.meta.dirname, 'movies.txt');

  return fs.readFile(filePath, { encoding: 'utf-8' });
}
