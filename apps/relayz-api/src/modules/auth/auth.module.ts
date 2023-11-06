import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument, UserSchema } from '../user/user.schema';
import { WalletEntity, WalletSchema } from '../wallet/wallet.schema';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { CliLibModule } from '../cli-lib/cli-lib.module';
import { NodesModule } from '../node-management/nodes.module';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
      { name: WalletEntity.name, schema: WalletSchema }
    ]),
    JwtModule.register({
      secret: jwtConstants.secret
    }),
    UserModule,
    WalletModule,
    CliLibModule,
    NodesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
