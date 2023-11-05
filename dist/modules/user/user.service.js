"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const console_1 = require("console");
const wallet_service_1 = require("../wallet/wallet.service");
const nodes_service_1 = require("../node-management/nodes.service");
let UserService = class UserService {
    constructor(userModel, walletService, nodesService) {
        this.userModel = userModel;
        this.walletService = walletService;
        this.nodesService = nodesService;
    }
    async getUserByIdOrThrowError(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException();
        return user;
    }
    async CreateUserAgent(payload) {
        const { id: userId } = await this.userModel.create(payload);
        const node = await this.nodesService.createNode({ userId, nodeId: payload.nodeId });
        return await this.userModel.findOneAndUpdate({ _id: userId }, { nodeDbId: node.id }, { new: true });
    }
    async getUserByNodeId(nodeId) {
        return !!(await this.userModel.findOne({ nodeId }));
    }
    async getUserByNickname(nickName) {
        return await this.userModel.findOne({ nickName });
    }
    async getOrCreateUser(payload) {
        const { accountId } = payload;
        let user = await this.userModel.findOne({ accountId });
        if (user) {
            const updatePayload = {};
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
        }
        else {
            user = await this.userModel.create(payload);
        }
        return user;
    }
    async getUserByAccountId(accountId) {
        const user = await this.userModel.findOne({ accountId });
        return !!user;
    }
    async getUserByAccountIdTemp(accountId) {
        const node = await this.nodesService.getNodeByOwnerId(accountId);
        if (!node)
            throw new common_1.NotFoundException(`Node with owner id: ${accountId} not found!`);
        return node;
    }
    async oldCreate(payload) {
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
                counter++;
                const [walletId] = wallets;
                const { address } = await this.walletService.findById(walletId);
                promises.push(this.userModel.findByIdAndUpdate(userId, { mainAddress: address }));
            }
        }
        (0, console_1.log)({ currentLog: counter });
        return await Promise.all(promises);
    }
    async findUserByAccountId(accountId) {
        return await this.userModel.findOne({ accountId });
    }
    async setAvatar(avatar) {
        const { tokenId, address } = avatar;
        const user = await this.userModel.findOneAndUpdate({ mainAddress: address }, { avatar }, { new: true });
        if (!user)
            throw new common_1.NotFoundException('Cannot set avatar, User not found!');
        return user;
    }
    async addWalletToUser(user, wallet) {
        user.wallets.push(wallet);
        await user.save();
    }
    async findAll() {
        return await this.userModel.find().populate('wallets');
    }
    async findById(userId) {
        return await this.userModel.findById(userId).populate('wallets');
    }
    async findByLoginAccId(loginAccId) {
        const user = await this.userModel.findOne({ accountId: loginAccId });
        if (!user)
            throw new common_1.NotFoundException(`User with this login account id: ${loginAccId} not found!`);
        return user;
    }
    async getAllUsersReferredByLoginAccountId(loginAccId) {
        const user = await this.userModel.findOne({ accountId: loginAccId });
        if (!user)
            throw new common_1.NotFoundException(`User with this id: ${loginAccId} not found!`);
        return await this.userModel.find({ referredBy: loginAccId });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        wallet_service_1.WalletService,
        nodes_service_1.NodeService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map