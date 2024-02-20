import { writeFileSync, createReadStream } from 'fs';

writeFileSync('./content/big.txt', '');

for (let i = 0; i < 10000; i++) {
  writeFileSync('./content/big.txt', `lucky number ${i}\n`, { flag: 'a' });
}

const stream = createReadStream('./content/big.txt', {
  encoding: 'utf-8',
  highWaterMark: 50000,
});
let i = 1;
stream.on('data', (result) => {
  console.log(i);
  i += 1;
});
