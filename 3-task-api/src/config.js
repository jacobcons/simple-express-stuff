import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.join(path.dirname(__filename), '..');

const loadEnv = () => {
  dotenv.config({
    path: path.join(rootDir, `./.env.${process.env.NODE_ENV || 'development'}`),
  });
};

export { rootDir, loadEnv };
