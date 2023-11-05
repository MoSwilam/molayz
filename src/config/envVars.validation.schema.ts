import * as Joi from '@hapi/joi';
import { ENV } from 'src/shared/constants';

export const ENV_VARS_VALIDATION_SCHEMA = {
  /** ENV */
  NODE_ENV: Joi.string()
    .valid(...Object.values(ENV)) // Aqui estamos usando spread operator para passar os valores do enum
    .default(ENV.development),

  /** PORT */
  SERVER_PORT_HTTP: Joi.string().required(),
  SERVER_PORT_HTTPS: Joi.string().required(),

  /** RELAYZ */
  APP_NAME: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  RELAYZ_VIDEO_PATH: Joi.string().required(),

  /** JWT */
  JWT_ISS: Joi.string().required(),
  JWT_AUD: Joi.string().required(),
  JWT_SUB: Joi.string().required(),
  JWT_JITSI_SECRET: Joi.string().required(),
  JWT_EXPIRE_DAYS: Joi.string().required(),

  /** DATABASE */
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_COLLECTION: Joi.string().required(),

  /** SWAGGER URI */
  SWAGGER_URI: Joi.string().required(),

  /** INFURA API */
  INFURA_API_KEY: Joi.string().required(),
  INFURA_API_SECRET: Joi.string().required()
};
