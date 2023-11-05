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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const auth_types_1 = require("../auth/auth.types");
const user_types_1 = require("./user.types");
const compose_decorators_1 = require("../../shared/decorators/compose.decorators");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(userDto) {
        return this.userService.getOrCreateUser(userDto);
    }
    setAvatar(avatar) {
        return this.userService.setAvatar(avatar);
    }
    findAll() {
        return this.userService.setMainAddress();
    }
    async getById(userId) {
        return await this.userService.findById(userId);
    }
    async getByLoginAccountId(loginAccId) {
        return await this.userService.findByLoginAccId(loginAccId);
    }
    async getAllUsersReferredByLoginAccountId(loginAcccId) {
        return await this.userService.getAllUsersReferredByLoginAccountId(loginAcccId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register user' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_types_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/avatar/add'),
    (0, swagger_1.ApiOperation)({ summary: 'Add avatar' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_types_1.AvatarDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "setAvatar", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/login/account'),
    (0, compose_decorators_1.AuthDecorators)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)('loginAccountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByLoginAccountId", null);
__decorate([
    (0, common_1.Get)('referrals/:loginAcccId'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('loginAcccId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsersReferredByLoginAccountId", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map