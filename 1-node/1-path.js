import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = dirname(__filename);

console.log(__filename, __dirname);

console.log(path.sep);
console.log(path.join('content', '1.txt'));
console.log(path.resolve('content', '1.txt'));
console.log(
  path.dirname(__filename),
  path.basename(__filename),
  path.extname(__filename)
);
