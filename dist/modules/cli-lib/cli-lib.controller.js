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
exports.CliLibController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cli_lib_service_1 = require("./cli-lib.service");
const swagger_1 = require("@nestjs/swagger");
let CliLibController = class CliLibController {
    constructor(cliLibService) {
        this.cliLibService = cliLibService;
    }
    async getNodes() {
        return this.cliLibService.allNodes();
    }
    async getNode(nodeId) {
        return this.cliLibService.getNode(nodeId);
    }
};
__decorate([
    (0, common_1.Get)('nodes'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CliLibController.prototype, "getNodes", null);
__decorate([
    (0, common_1.Get)('/node/:nodeId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('nodeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CliLibController.prototype, "getNode", null);
CliLibController = __decorate([
    (0, swagger_1.ApiTags)('sc-client'),
    (0, common_1.Controller)('sc-client'),
    __metadata("design:paramtypes", [cli_lib_service_1.CliLibService])
], CliLibController);
exports.CliLibController = CliLibController;
//# sourceMappingURL=cli-lib.controller.js.map