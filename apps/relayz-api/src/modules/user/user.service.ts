import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, LoginAgentDto, OldUserDto } from './../auth/auth.types';
import { WalletDocument } from '../wallet/wallet.schema';
import { AvatarDto } from './user.types';
import { log } from 'console';
import { WalletService } from '../wallet/wallet.service';
import { NodeService } from '../node-management/nodes.service';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private walletService: WalletService,
    private nodesService: NodeService
  ) {}

  async getUserByIdOrThrowError(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async CreateUserAgent(payload: LoginAgentDto) {
    const { id: userId } = await this.userRepo.create(payload);
    const node = await this.nodesService.createNode({ userId, nodeId: payload.nodeId });
    return await this.userRepo.findOneAndUpdate(
      { _id: userId },
      { nodeDbId: node.id },
    );
  }

  async getUserByNodeId(nodeId: string) {
    return !!(await this.userRepo.findOne({ nodeId }));
  }

  async getUserByNickname(nickName: string) {
    return await this.userRepo.findOne({ nickName });
  }

  async getOrCreateUser(payload: CreateUserDto): Promise<UserDocument> {
    const { accountId } = payload;

    let user = await this.userRepo.findOne({ accountId });
    if (user) {
      const updatePayload: Partial<UserDocument> = {};

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
        user = await this.userRepo.findByIdAndUpdate(user.id, updatePayload);
      }
    } else {
      user = await this.userRepo.create(payload);
    }

    return user;
  }

  async getUserByAccountId(accountId: string) {
    const user = await this.userRepo.findOne({ accountId });
    return !!user;
  }

  async getUserByAccountIdTemp(accountId: string) {
    const node = await this.nodesService.getNodeByOwnerId(accountId);
    if (!node) throw new NotFoundException(`Node with owner id: ${accountId} not found!`);
    return node;
  }

  async oldCreate(payload: OldUserDto): Promise<UserDocument> {
    return await this.userRepo.create(payload);
  }

  // async setMainAddress() {
  //   const users = await this.userRepo.find({});
  //   const promises = [];

  //   let counter = 0;
  //   for (const user of users) {
  //     const { id: userId, wallets } = user;

  //     if (wallets && wallets.length) {
  //       // extract the first wallet in the array
  //       counter++;
  //       const [walletId] = wallets;
  //       const { address } = await this.walletService.findById(walletId);
  //       promises.push(this.userRepo.findByIdAndUpdate(userId, { mainAddress: address }));
  //     }
  //   }

  //   log({ currentLog: counter });
  //   return await Promise.all(promises);
  // }

  async findUserByAccountId(accountId: string) {
    return await this.userRepo.findOne({ accountId });
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

    const user = await this.userRepo.findOneAndUpdate(
      { mainAddress: address },
      { avatar },
    );
    if (!user) throw new NotFoundException('Cannot set avatar, User not found!');
    return user;
  }

  async addWalletToUser(user: UserDocument, wallet: WalletDocument) {
    user.wallets.push(wallet);
    await user.save();
  }

  async findAll() {
    return await this.userRepo.find({},[ 'wallets']);
  }

  async findById(userId) {
    return await this.userRepo.findById(userId);
  }

  async findByLoginAccId(loginAccId: string) {
    const user = await this.userRepo.findOne({ accountId: loginAccId });
    if (!user)
      throw new NotFoundException(`User with this login account id: ${loginAccId} not found!`);
    return user;
  }

  async getAllUsersReferredByLoginAccountId(loginAccId: string) {
    const user = await this.userRepo.findOne({ accountId: loginAccId });
    if (!user) throw new NotFoundException(`User with this id: ${loginAccId} not found!`);
    return await this.userRepo.find({ referredBy: loginAccId });
  }
}
