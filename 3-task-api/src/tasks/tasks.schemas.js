import Joi from 'joi';

const baseTaskSchema = Joi.object({
  description: Joi.string().max(20),
  isCompleted: Joi.boolean(),
});

const createTaskSchema = baseTaskSchema.concat(
  Joi.object({
    description: Joi.required(),
  })
);

const updateTaskSchema = baseTaskSchema.or('description', 'isCompleted');

export { createTaskSchema, updateTaskSchema };
