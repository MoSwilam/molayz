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
exports.MarketingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const marketing_service_1 = require("./marketing.service");
const marketing_types_1 = require("./marketing.types");
const swagger_1 = require("@nestjs/swagger");
let MarketingController = class MarketingController {
    constructor(marketingService) {
        this.marketingService = marketingService;
    }
    create(createMarketingDto) {
        return this.marketingService.create(createMarketingDto);
    }
    findOne(id, secret) {
        const payload = { id, secret };
        return this.marketingService.getMarketingCampaign(payload);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [marketing_types_1.MarketingDto]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('secret')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MarketingController.prototype, "findOne", null);
MarketingController = __decorate([
    (0, swagger_1.ApiTags)('Marketing'),
    (0, common_1.Controller)('marketing'),
    __metadata("design:paramtypes", [marketing_service_1.MarketingService])
], MarketingController);
exports.MarketingController = MarketingController;
//# sourceMappingURL=marketing.controller.js.map