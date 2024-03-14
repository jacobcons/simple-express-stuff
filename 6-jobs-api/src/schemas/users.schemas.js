import Joi from 'joi';

export const nameSchema = Joi.string().required().min(3);
export const updateUserSchema = Joi.object({
  name: nameSchema,
});
