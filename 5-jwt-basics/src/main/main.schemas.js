import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const dashboardSchema = Joi.object({
  min: Joi.number().integer().default(1),
  max: Joi.number().integer().default(100),
}).custom((obj, helpers) => {
  const { min, max } = obj;
  if (min > max) {
    return helpers.message(
      `min (${min}) must be less than or equal to max (${max})`
    );
  }
  return obj;
});

export { loginSchema, dashboardSchema };
