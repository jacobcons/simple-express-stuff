import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().precision(2).max(99999999.99).required(),
  image: Joi.string().required(),
});
