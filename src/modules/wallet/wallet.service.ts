import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletDto } from '../auth/auth.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDocument, WalletEntity } from './wallet.schema';
import { Chains } from './wallet.types';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(WalletEntity.name)
    private walletModel: Model<WalletDocument>
  ) {}

  async getAllWallets(limit: number, skip: number) {
    return await this.walletModel.find().limit(limit).skip(skip);
  }

  async getOrCreateWallet(payload: WalletDto): Promise<WalletDocument> {
    const { address } = payload;
    const walletFound = await this.walletModel.findOne({ address });
    if (walletFound) return walletFound;
    const doc = new this.walletModel(payload);
    return await doc.save();
  }

  async getWalletByAddressOrThrow(address: string) {
    const wallet = await this.walletModel.findOne({ address });
    if (!wallet) throw new NotFoundException('Wallet Not found!');
    return wallet;
  }

  async findById(walletId) {
    return await await this.walletModel.findById(walletId);
  }

  async getConnectedWallets() {
    const wallets = await this.walletModel.find({ chain: Chains.near });
    return { wallets, count: wallets.length };
  }

  async getEhemeralWallets() {
    const wallets = await this.walletModel.find({ chain: Chains.ephemeral });
    return { wallets, count: wallets.length };
  }
}
