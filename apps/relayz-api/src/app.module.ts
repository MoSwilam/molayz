import 'dotenv';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { HistoryModule } from './modules/history/history.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFactoryInterceptor } from './shared/interceptors/responseFactory.interceptor';
import { GlobalErrorHandler } from './shared/exception-filter/all.exception.filter';
import { IpfsModule } from './modules/ipfs/ipfs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NodesModule } from './modules/node-management/nodes.module';
import { EventModule } from './modules/meeting-events/event.module';
import { DAppModule } from './modules/dapp/dapp.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { CronModule } from './modules/cron/cron.module';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@app/common';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
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
    CronModule,
    ScheduleModule.forRoot(),
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
