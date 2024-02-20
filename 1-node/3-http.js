import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to homepage');
  } else if (req.url === '/about') {
    res.end('About page');
  } else {
    res.statusCode = 404;
    res.end('page not found');
  }
});

server.listen(5000);
