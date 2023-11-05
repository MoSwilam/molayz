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
exports.IpfsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ipfs_service_1 = require("./ipfs.service");
let IpfsController = class IpfsController {
    constructor(ipfsService) {
        this.ipfsService = ipfsService;
    }
    async sendTelemetryData() {
        return this.ipfsService.sendTelemetryData();
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IpfsController.prototype, "sendTelemetryData", null);
IpfsController = __decorate([
    (0, swagger_1.ApiTags)('Ipfs'),
    (0, common_1.Controller)('ipfs'),
    __metadata("design:paramtypes", [ipfs_service_1.IpfsService])
], IpfsController);
exports.IpfsController = IpfsController;
//# sourceMappingURL=ipfs.controller.js.map