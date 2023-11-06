import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '../user/user.schema';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletEntity, WalletSchema } from '../wallet/wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletEntity.name, schema: WalletSchema },
      { name: UserDocument.name, schema: UserSchema }
    ]),
    UserModule,
    WalletModule
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
