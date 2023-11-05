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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("./wallet.schema");
const wallet_types_1 = require("./wallet.types");
let WalletService = class WalletService {
    constructor(walletModel) {
        this.walletModel = walletModel;
    }
    async getAllWallets(limit, skip) {
        return await this.walletModel.find().limit(limit).skip(skip);
    }
    async getOrCreateWallet(payload) {
        const { address } = payload;
        const walletFound = await this.walletModel.findOne({ address });
        if (walletFound)
            return walletFound;
        const doc = new this.walletModel(payload);
        return await doc.save();
    }
    async getWalletByAddressOrThrow(address) {
        const wallet = await this.walletModel.findOne({ address });
        if (!wallet)
            throw new common_1.NotFoundException('Wallet Not found!');
        return wallet;
    }
    async findById(walletId) {
        return await await this.walletModel.findById(walletId);
    }
    async getConnectedWallets() {
        const wallets = await this.walletModel.find({ chain: wallet_types_1.Chains.near });
        return { wallets, count: wallets.length };
    }
    async getEhemeralWallets() {
        const wallets = await this.walletModel.find({ chain: wallet_types_1.Chains.ephemeral });
        return { wallets, count: wallets.length };
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.WalletEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map