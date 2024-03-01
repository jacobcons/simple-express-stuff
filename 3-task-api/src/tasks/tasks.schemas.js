import Joi from 'joi';

const baseSchema = Joi.object({
  description: Joi.string().max(20),
  isCompleted: Joi.boolean(),
});

const createSchema = baseSchema.concat(
  Joi.object({
    description: Joi.required(),
  })
);

const updateSchema = baseSchema.or('description', 'isCompleted');

export { createSchema, updateSchema };
