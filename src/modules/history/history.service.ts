import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../user/user.schema';
import { WalletDocument, WalletEntity } from '../wallet/wallet.schema';
import { Chains } from '../wallet/wallet.types';
import { InsertManyDto } from './history.types';

@Injectable()
export class HistoryService {
  constructor(
    private userService: UserService,
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
    @InjectModel(WalletEntity.name)
    private walletModel: Model<WalletDocument>
  ) {}

  async findAll() {
    return await this.userService.findAll();
  }

  async insertMany(payload) {
    let count = 0;
    console.log('wallet Count: ', payload.length);
    const readyWallets = [];
    for (const x of payload.meetingHistory) {
      // // Users
      const { ip, headers, room, user } = x;
      const userObj = JSON.parse(user);
      const headersObj = JSON.parse(headers);

      const userAgent = headersObj['user-agent'];
      const { host } = headersObj;

      const { walletId: address, displayName, wallet: chain, network } = userObj;

      if (typeof address !== 'string') {
        console.log({ nonStringAddress: address });
        continue;
      }

      const isConnected = chain === Chains.near ? true : false;
      const walletPayload: Partial<WalletEntity> = {
        network,
        address,
        isConnected,
        chain
      };
      const walletDoc = new this.walletModel(walletPayload);
      const savedWallet = await walletDoc.save();

      const userFound = await this.userModel.findOne({ displayName, ip });
      if (userFound) {
        await this.userModel.findByIdAndUpdate(userFound.id, {
          $push: { wallets: savedWallet }
        });
        count++;
        continue;
      }

      const userPayload: Partial<UserEntity> = {
        userAgent,
        ip,
        displayName,
        wallets: [savedWallet]
      };
      const userDoc = new this.userModel(userPayload);
      await userDoc.save();

      count++;
    }
    return count;
    const insertedWallets = await this.walletModel.insertMany(readyWallets);
    return insertedWallets.length;
  }

  async insertManyWallets(payload: InsertManyDto) {
    console.time('insertManyWallets');
    const readyWallets = [];
    const dbWallets = await this.walletModel.find({ chain: Chains.near });
    // loop over payload.data and check if wallet exists in dbWallets
    // if the wallet does not exist in db wallets, add it to the readyWallets array

    for (const x of payload.data) {
      const { address, createdAt } = x;
      const foundWallet = dbWallets.find((w) => w.address === address);
      if (!foundWallet) {
        readyWallets.push(x);
      }
    }

    const res = await this.walletModel.insertMany(readyWallets);
    // const res = 15;

    // const res = await this.walletModel.updateMany({}, { $set: { isConnected: false } }, { multi: true })
    console.timeEnd('insertManyWallets');
    return {
      existingEphemerals: dbWallets.length,
      toBeInserted: readyWallets.length,
      sent: payload.data.length,
      insertionResult: res.length
    };
  }
}
