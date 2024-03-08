import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const __filename = fileURLToPath(import.meta.url);
const rootPath = path.join(path.dirname(__filename), '..');

const basePath = (...paths) => {
  return path.join(rootPath, ...paths);
};

const loadEnv = () => {
  dotenv.config({
    path: basePath(`./.env.${process.env.NODE_ENV || 'development'}`),
  });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export { createError, basePath, loadEnv, hashPassword, createToken };
