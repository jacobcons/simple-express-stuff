import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };
