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
exports.DAppController = void 0;
const openapi = require("@nestjs/swagger");
const dapp_service_1 = require("./dapp.service");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let DAppController = class DAppController {
    constructor(dappService) {
        this.dappService = dappService;
    }
    buffer(response) {
        const file = this.dappService.imageBuffer();
        response.send(file);
    }
    stream(response) {
        const file = this.dappService.imageStream();
        file.pipe(response);
    }
    streamable() {
        const file = this.dappService.fileStream();
        return new common_1.StreamableFile(file);
    }
};
__decorate([
    (0, common_1.Get)('buffer'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DAppController.prototype, "buffer", null);
__decorate([
    (0, common_1.Get)('stream'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DAppController.prototype, "stream", null);
__decorate([
    (0, common_1.Get)('streamable'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DAppController.prototype, "streamable", null);
DAppController = __decorate([
    (0, swagger_1.ApiTags)('DApp'),
    (0, common_1.Controller)('DApp'),
    __metadata("design:paramtypes", [dapp_service_1.DAppService])
], DAppController);
exports.DAppController = DAppController;
//# sourceMappingURL=dapp.controller.js.map