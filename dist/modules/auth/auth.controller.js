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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_types_1 = require("./auth.types");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    create(loginDto) {
        return this.authService.login(loginDto);
    }
    authenticateAgent(loginDto) {
        return this.authService.loginAgent(loginDto);
    }
    appLogin(loginDto) {
        return this.authService.nearLogin(loginDto);
    }
    nearLogin(loginDto) {
        return this.authService.metamaskLogin(loginDto);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/agent/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.LoginAgentDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authenticateAgent", null);
__decorate([
    (0, common_1.Post)('/referral/near/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.NearReferralLoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "appLogin", null);
__decorate([
    (0, common_1.Post)('/referral/metamask/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.MetamaskReferralLoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "nearLogin", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map