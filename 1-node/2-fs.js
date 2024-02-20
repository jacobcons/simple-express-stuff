import { readFile, writeFile } from 'fs/promises';

async function makeNewFile() {
  const [first, second] = await Promise.all([
    readFile('./content/1.txt'),
    readFile('./content/2.txt'),
  ]);
  await writeFile('./content/3.txt', `${first}\n${second}`);
  return 'File created';
}

makeNewFile()
  .then((successMessage) => console.log(successMessage))
  .catch((err) => console.log(err));
