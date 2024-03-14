import Joi from 'joi';

export const idSchema = Joi.number().integer().positive();
export const singleIdSchema = Joi.object({
  id: Joi.number().integer().positive(),
});
