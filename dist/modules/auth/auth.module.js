"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
const wallet_schema_1 = require("../wallet/wallet.schema");
const user_module_1 = require("../user/user.module");
const wallet_module_1 = require("../wallet/wallet.module");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./auth.constants");
const cli_lib_module_1 = require("../cli-lib/cli-lib.module");
const nodes_module_1 = require("../node-management/nodes.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.UserEntity.name, schema: user_schema_1.UserSchema },
                { name: wallet_schema_1.WalletEntity.name, schema: wallet_schema_1.WalletSchema }
            ]),
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret
            }),
            user_module_1.UserModule,
            wallet_module_1.WalletModule,
            cli_lib_module_1.CliLibModule,
            nodes_module_1.NodesModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map