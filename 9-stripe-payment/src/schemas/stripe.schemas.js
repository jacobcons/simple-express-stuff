import Joi from 'joi';

export const createPaymentIntentSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({ id: Joi.number(), quantity: Joi.number() }),
  ),
});
