"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModule = void 0;
const common_1 = require("@nestjs/common");
const history_service_1 = require("./history.service");
const history_controller_1 = require("./history.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
const user_module_1 = require("../user/user.module");
const wallet_module_1 = require("../wallet/wallet.module");
const wallet_schema_1 = require("../wallet/wallet.schema");
let HistoryModule = class HistoryModule {
};
HistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: wallet_schema_1.WalletEntity.name, schema: wallet_schema_1.WalletSchema },
                { name: user_schema_1.UserEntity.name, schema: user_schema_1.UserSchema }
            ]),
            user_module_1.UserModule,
            wallet_module_1.WalletModule
        ],
        controllers: [history_controller_1.HistoryController],
        providers: [history_service_1.HistoryService]
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=history.module.js.map