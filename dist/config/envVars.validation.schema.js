"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_VARS_VALIDATION_SCHEMA = void 0;
const Joi = require("@hapi/joi");
const constants_1 = require("../shared/constants");
exports.ENV_VARS_VALIDATION_SCHEMA = {
    NODE_ENV: Joi.string()
        .valid(...Object.values(constants_1.ENV))
        .default(constants_1.ENV.development),
    SERVER_PORT_HTTP: Joi.string().required(),
    SERVER_PORT_HTTPS: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    APP_VERSION: Joi.string().required(),
    RELAYZ_VIDEO_PATH: Joi.string().required(),
    JWT_ISS: Joi.string().required(),
    JWT_AUD: Joi.string().required(),
    JWT_SUB: Joi.string().required(),
    JWT_JITSI_SECRET: Joi.string().required(),
    JWT_EXPIRE_DAYS: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_COLLECTION: Joi.string().required(),
    SWAGGER_URI: Joi.string().required(),
    INFURA_API_KEY: Joi.string().required(),
    INFURA_API_SECRET: Joi.string().required()
};
//# sourceMappingURL=envVars.validation.schema.js.map