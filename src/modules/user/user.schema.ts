import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';
import { WalletEntity } from '../wallet/wallet.schema';
import { AvatarDto } from './user.types';

export type UserDocument = UserEntity & Document;
@Schema({ timestamps: true, collection: 'users' })
export class UserEntity {
  @Prop()
  displayName: string;

  @Prop()
  publicKey: string;

  @Prop()
  referredBy: string; // points to the account id of the user who referred this user

  @Prop()
  accountId: string;

  @Prop()
  mainAddress: string;

  @Prop()
  metamaskWalletId: string;

  @Prop()
  nearWalletId: string;

  @Prop()
  relayzContractId: string;

  @Prop()
  avatar: AvatarDto;

  @Prop()
  userAgent: string;

  @Prop()
  description: string;

  @Prop()
  ip: string;

  @Prop({ unique: true })
  nodeId: string;

  @Prop()
  nodeDbId: string;

  @Prop({
    type: [MongooseTypes.ObjectId],
    ref: WalletEntity.name,
    required: false
  })
  wallets: WalletEntity[];

  @Prop()
  loginType: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
