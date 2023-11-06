import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
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
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
