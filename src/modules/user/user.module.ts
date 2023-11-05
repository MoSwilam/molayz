import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserEntity, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { WalletModule } from '../wallet/wallet.module';
import { NodesModule } from '../node-management/nodes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    WalletModule,
    NodesModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
