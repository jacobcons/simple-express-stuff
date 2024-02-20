import http from 'http';
import EventEmitter from 'events';

const customEmitter = new EventEmitter();
customEmitter.on('response', (name, age) => {
  console.log(`${name} is ${age}`);
});
customEmitter.on('response', () => {
  console.log(`other`);
});
customEmitter.emit('response', 'bob', 23);

const server = http.createServer();

server.on('request', (req, res) => {
  res.end('hey');
});

server.listen(5000);
