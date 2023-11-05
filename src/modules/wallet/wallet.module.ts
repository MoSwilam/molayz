import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletEntity, WalletSchema } from './wallet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WalletEntity.name, schema: WalletSchema }])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
