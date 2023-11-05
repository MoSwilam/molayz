import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, LoginAgentDto, OldUserDto } from './../auth/auth.types';
import { WalletDocument } from '../wallet/wallet.schema';
import { AvatarDto } from './user.types';
import { log } from 'console';
import { WalletService } from '../wallet/wallet.service';
import { NodeService } from '../node-management/nodes.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
    private walletService: WalletService,
    private nodesService: NodeService
  ) {}

  async getUserByIdOrThrowError(id) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async CreateUserAgent(payload: LoginAgentDto): Promise<UserDocument> {
    const { id: userId } = await this.userModel.create(payload);
    const node = await this.nodesService.createNode({ userId, nodeId: payload.nodeId });
    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { nodeDbId: node.id },
      { new: true }
    );
  }

  async getUserByNodeId(nodeId: string) {
    return !!(await this.userModel.findOne({ nodeId }));
  }

  async getUserByNickname(nickName: string) {
    return await this.userModel.findOne({ nickName });
  }

  async getOrCreateUser(payload: CreateUserDto): Promise<UserDocument> {
    const { accountId } = payload;

    let user = await this.userModel.findOne({ accountId });
    if (user) {
      const updatePayload: Partial<UserEntity> = {};

      if (payload.referredBy && !user.referredBy) {
        updatePayload.referredBy = payload.referredBy;
      }

      if (payload.publicKey) {
        updatePayload.publicKey = payload.publicKey;
      }

      if (payload.loginType) {
        updatePayload.loginType = payload.loginType;
      }

      if (Object.keys(updatePayload).length > 0) {
        user = await this.userModel.findByIdAndUpdate(user.id, updatePayload, { new: true });
      }
    } else {
      user = await this.userModel.create(payload);
    }

    return user;
  }

  async getUserByAccountId(accountId: string) {
    const user = await this.userModel.findOne({ accountId });
    return !!user;
  }

  async getUserByAccountIdTemp(accountId: string) {
    const node = await this.nodesService.getNodeByOwnerId(accountId);
    if (!node) throw new NotFoundException(`Node with owner id: ${accountId} not found!`);
    return node;
  }

  async oldCreate(payload: OldUserDto): Promise<UserDocument> {
    const doc = new this.userModel(payload);
    return await doc.save();
  }

  async setMainAddress() {
    const users = await this.userModel.find();
    const promises = [];

    let counter = 0;
    for (const user of users) {
      const { id: userId, wallets } = user;

      if (wallets && wallets.length) {
        // extract the first wallet in the array
        counter++;
        const [walletId] = wallets;
        const { address } = await this.walletService.findById(walletId);
        promises.push(this.userModel.findByIdAndUpdate(userId, { mainAddress: address }));
      }
    }

    log({ currentLog: counter });
    return await Promise.all(promises);
  }

  async findUserByAccountId(accountId: string) {
    return await this.userModel.findOne({ accountId });
  }

  async setAvatar(avatar: AvatarDto) {
    const { tokenId, address } = avatar;
    // const users = await this.userModel.find();
    // let userFound = undefined;
    // let counter = 0;
    // for (const user of users) {
    //   const { wallets } = user;
    //   counter++;
    //   if (wallets && wallets.length) {
    //     if (wallets.includes(address)) {
    //       userFound = user;
    //       console.log(`User found at iteration: ${counter}`);
    //       break;
    //     }
    //   }
    // }

    // log({ currentCount: counter })
    // if (!userFound) throw new NotFoundException(`User not found!`);

    // return await this.userModel.findByIdAndUpdate(userFound.id, { avatar: avatarUrl })

    const user = await this.userModel.findOneAndUpdate(
      { mainAddress: address },
      { avatar },
      { new: true }
    );
    if (!user) throw new NotFoundException('Cannot set avatar, User not found!');
    return user;
  }

  async addWalletToUser(user: UserDocument, wallet: WalletDocument) {
    user.wallets.push(wallet);
    await user.save();
  }

  async findAll() {
    return await this.userModel.find().populate('wallets');
  }

  async findById(userId) {
    return await this.userModel.findById(userId).populate('wallets');
  }

  async findByLoginAccId(loginAccId: string) {
    const user = await this.userModel.findOne({ accountId: loginAccId });
    if (!user)
      throw new NotFoundException(`User with this login account id: ${loginAccId} not found!`);
    return user;
  }

  async getAllUsersReferredByLoginAccountId(loginAccId: string) {
    const user = await this.userModel.findOne({ accountId: loginAccId });
    if (!user) throw new NotFoundException(`User with this id: ${loginAccId} not found!`);
    return await this.userModel.find({ referredBy: loginAccId });
  }
}
