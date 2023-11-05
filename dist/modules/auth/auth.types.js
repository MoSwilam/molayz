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
exports.UserJwt = exports.Context = exports.JwtAgentPayload = exports.JwtPayload = exports.LoginAgentDto = exports.MetamaskReferralLoginDto = exports.NearReferralLoginDto = exports.LoginDto = exports.OldUserDto = exports.WalletDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "referredBy", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "publicKey", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "loginType", void 0);
exports.CreateUserDto = CreateUserDto;
class WalletDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { address: { required: true, type: () => String }, chain: { required: true, type: () => String }, network: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.WalletDto = WalletDto;
class OldUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { displayName: { required: true, type: () => String }, roomName: { required: true, type: () => String } };
    }
}
exports.OldUserDto = OldUserDto;
class LoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("./auth.types").OldUserDto }, wallet: { required: true, type: () => require("./auth.types").WalletDto } };
    }
}
exports.LoginDto = LoginDto;
class NearReferralLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, nearWalletId: { required: true, type: () => String }, publicKey: { required: true, type: () => String }, referredBy: { required: true, type: () => String }, loginType: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NearReferralLoginDto.prototype, "nearWalletId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NearReferralLoginDto.prototype, "publicKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NearReferralLoginDto.prototype, "referredBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NearReferralLoginDto.prototype, "loginType", void 0);
exports.NearReferralLoginDto = NearReferralLoginDto;
class MetamaskReferralLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, metamaskAddress: { required: true, type: () => String, minLength: 42 }, referredBy: { required: true, type: () => String }, loginType: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.MinLength)(42),
    __metadata("design:type", String)
], MetamaskReferralLoginDto.prototype, "metamaskAddress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MetamaskReferralLoginDto.prototype, "referredBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MetamaskReferralLoginDto.prototype, "loginType", void 0);
exports.MetamaskReferralLoginDto = MetamaskReferralLoginDto;
class LoginAgentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountId: { required: true, type: () => String }, nodeId: { required: true, type: () => String }, accountSecret: { required: false, type: () => String } };
    }
}
exports.LoginAgentDto = LoginAgentDto;
class JwtPayload {
    static _OPENAPI_METADATA_FACTORY() {
        return { iss: { required: true, type: () => String }, aud: { required: true, type: () => String }, sub: { required: true, type: () => String }, room: { required: true, type: () => String }, exp: { required: true, type: () => String }, context: { required: true, type: () => require("./auth.types").Context } };
    }
}
exports.JwtPayload = JwtPayload;
class JwtAgentPayload {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: false, type: () => String }, nodeOwnerId: { required: true, type: () => String }, nodeId: { required: true, type: () => String }, exp: { required: true, type: () => Number } };
    }
}
exports.JwtAgentPayload = JwtAgentPayload;
class Context {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("./auth.types").UserJwt } };
    }
}
exports.Context = Context;
class UserJwt {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.UserJwt = UserJwt;
//# sourceMappingURL=auth.types.js.map