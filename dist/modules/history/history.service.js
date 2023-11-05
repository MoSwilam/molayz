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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../user/user.service");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
const wallet_schema_1 = require("../wallet/wallet.schema");
const wallet_types_1 = require("../wallet/wallet.types");
let HistoryService = class HistoryService {
    constructor(userService, userModel, walletModel) {
        this.userService = userService;
        this.userModel = userModel;
        this.walletModel = walletModel;
    }
    async findAll() {
        return await this.userService.findAll();
    }
    async insertMany(payload) {
        let count = 0;
        console.log('wallet Count: ', payload.length);
        const readyWallets = [];
        for (const x of payload.meetingHistory) {
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
            const isConnected = chain === wallet_types_1.Chains.near ? true : false;
            const walletPayload = {
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
            const userPayload = {
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
    async insertManyWallets(payload) {
        console.time('insertManyWallets');
        const readyWallets = [];
        const dbWallets = await this.walletModel.find({ chain: wallet_types_1.Chains.near });
        for (const x of payload.data) {
            const { address, createdAt } = x;
            const foundWallet = dbWallets.find((w) => w.address === address);
            if (!foundWallet) {
                readyWallets.push(x);
            }
        }
        const res = await this.walletModel.insertMany(readyWallets);
        console.timeEnd('insertManyWallets');
        return {
            existingEphemerals: dbWallets.length,
            toBeInserted: readyWallets.length,
            sent: payload.data.length,
            insertionResult: res.length
        };
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.UserEntity.name)),
    __param(2, (0, mongoose_1.InjectModel)(wallet_schema_1.WalletEntity.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model,
        mongoose_2.Model])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map