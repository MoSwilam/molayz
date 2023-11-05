"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("dotenv");
const common_1 = require("@nestjs/common");
const user_module_1 = require("./modules/user/user.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const wallet_module_1 = require("./modules/wallet/wallet.module");
const auth_module_1 = require("./modules/auth/auth.module");
const axios_1 = require("@nestjs/axios");
const Joi = require("@hapi/joi");
const history_module_1 = require("./modules/history/history.module");
const envVars_validation_schema_1 = require("./config/envVars.validation.schema");
const core_1 = require("@nestjs/core");
const responseFactory_interceptor_1 = require("./shared/interceptors/responseFactory.interceptor");
const all_exception_filter_1 = require("./shared/exception-filter/all.exception.filter");
const ipfs_module_1 = require("./modules/ipfs/ipfs.module");
const configuration_1 = require("./config/configuration");
const schedule_1 = require("@nestjs/schedule");
const nodes_module_1 = require("./modules/node-management/nodes.module");
const event_module_1 = require("./modules/meeting-events/event.module");
const dapp_module_1 = require("./modules/dapp/dapp.module");
const marketing_module_1 = require("./modules/marketing/marketing.module");
const cron_module_1 = require("./modules/cron/cron.module");
const logger_interceptor_1 = require("./shared/interceptors/logger.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
                load: [configuration_1.default],
                isGlobal: true,
                validationSchema: Joi.object(envVars_validation_schema_1.ENV_VARS_VALIDATION_SCHEMA)
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_HOST, {
                dbName: process.env.DB_NAME,
                authMechanism: 'DEFAULT',
                auth: {
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD
                }
            }),
            schedule_1.ScheduleModule.forRoot(),
            axios_1.HttpModule,
            user_module_1.UserModule,
            wallet_module_1.WalletModule,
            auth_module_1.AuthModule,
            history_module_1.HistoryModule,
            ipfs_module_1.IpfsModule,
            nodes_module_1.NodesModule,
            event_module_1.EventModule,
            dapp_module_1.DAppModule,
            marketing_module_1.MarketingModule,
            cron_module_1.CronModule
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.GlobalErrorHandler
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logger_interceptor_1.LoggerInterceptor
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: responseFactory_interceptor_1.ResponseFactoryInterceptor
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map