import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WalletModule } from '../wallet/wallet.module';
import { NodesModule } from '../node-management/nodes.module';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './user.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema
      }
    ]),
    WalletModule,
    NodesModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
