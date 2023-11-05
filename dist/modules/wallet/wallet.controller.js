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
exports.WalletController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const swagger_1 = require("@nestjs/swagger");
const auth_types_1 = require("../auth/auth.types");
const compose_decorators_1 = require("../../shared/decorators/compose.decorators");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    create(createWalletDto) {
        return this.walletService.getOrCreateWallet(createWalletDto);
    }
    getAllWallets({ limit, skip }) {
        return this.walletService.getAllWallets(limit, skip);
    }
    getConnectedWallets() {
        return this.walletService.getConnectedWallets();
    }
    getEphemeralWallets() {
        return this.walletService.getEhemeralWallets();
    }
    getWalletById(walletId) {
        return this.walletService.findById(walletId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new wallet' }),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.WalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all wallets' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Limit the number of wallets returned' }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false, description: 'Skip the first n wallets' }),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getAllWallets", null);
__decorate([
    (0, common_1.Get)('/connected'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all connected wallets' }),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getConnectedWallets", null);
__decorate([
    (0, common_1.Get)('/ephemeral'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ephemeral wallets' }),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getEphemeralWallets", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get wallet by id' }),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getWalletById", null);
WalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallets'),
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map