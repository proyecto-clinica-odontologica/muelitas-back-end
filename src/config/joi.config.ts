import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_DATABASE: Joi.required(),
});
