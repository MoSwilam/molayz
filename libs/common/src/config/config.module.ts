import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from 'apps/relayz-api/src/config/configuration';
import { ENV_VARS_VALIDATION_SCHEMA } from 'apps/relayz-api/src/config/envVars.validation.schema';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `${process.cwd()}/apps/relayz-api/src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object(ENV_VARS_VALIDATION_SCHEMA)
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
