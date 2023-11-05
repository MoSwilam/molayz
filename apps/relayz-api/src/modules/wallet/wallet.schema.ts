import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Chains, Network } from './wallet.types';

export type WalletDocument = WalletEntity & Document;
@Schema({ timestamps: true, collection: 'wallets' })
export class WalletEntity {
  @Prop()
  address: string | null;

  @Prop()
  isConnected: boolean;

  @Prop()
  chain: Chains;

  @Prop()
  network: Network; // currently takes only "relayz"

  @Prop()
  name: string;
}

export const WalletSchema = SchemaFactory.createForClass(WalletEntity);
