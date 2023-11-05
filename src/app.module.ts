import 'dotenv';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './modules/wallet/wallet.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import * as Joi from '@hapi/joi';
import { HistoryModule } from './modules/history/history.module';
import { ENV_VARS_VALIDATION_SCHEMA } from './config/envVars.validation.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFactoryInterceptor } from './shared/interceptors/responseFactory.interceptor';
import { GlobalErrorHandler } from './shared/exception-filter/all.exception.filter';
import { IpfsModule } from './modules/ipfs/ipfs.module';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { NodesModule } from './modules/node-management/nodes.module';
import { EventModule } from './modules/meeting-events/event.module';
import { DAppModule } from './modules/dapp/dapp.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { CronModule } from './modules/cron/cron.module';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object(ENV_VARS_VALIDATION_SCHEMA)
    }),
    MongooseModule.forRoot(process.env.DB_HOST, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
      authMechanism: 'DEFAULT',
      auth: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      }
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    UserModule,
    WalletModule,
    AuthModule,
    HistoryModule,
    IpfsModule,
    NodesModule,
    EventModule,
    DAppModule,
    MarketingModule,
    CronModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorHandler
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFactoryInterceptor
    }
  ]
})
export class AppModule {}
