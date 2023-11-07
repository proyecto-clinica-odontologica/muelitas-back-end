import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_DATABASE: Joi.required(),
  DB_ROOT_PASSWORD: Joi.required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
});
