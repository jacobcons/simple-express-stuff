import Joi from 'joi';
import { nameSchema } from './users.schemas.js';

const registerSchema = Joi.object({
  name: nameSchema,
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };
