import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_HOST'),
        dbName: configService.get<string>('DB_NAME'),
        authMechanism: 'DEFAULT',
        auth: {
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD')
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
