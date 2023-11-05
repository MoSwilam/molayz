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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("../wallet/wallet.schema");
const user_types_1 = require("./user.types");
let UserEntity = class UserEntity {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "displayName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "publicKey", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "referredBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "accountId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "mainAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "metamaskWalletId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "nearWalletId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "relayzContractId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", user_types_1.AvatarDto)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "nodeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "nodeDbId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: wallet_schema_1.WalletEntity.name,
        required: false
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "wallets", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserEntity.prototype, "loginType", void 0);
UserEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserEntity);
//# sourceMappingURL=user.schema.js.map