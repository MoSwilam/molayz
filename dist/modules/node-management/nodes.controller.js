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
exports.NodesController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const nodes_types_1 = require("./nodes.types");
const common_1 = require("@nestjs/common");
const nodes_service_1 = require("./nodes.service");
const compose_decorators_1 = require("../../shared/decorators/compose.decorators");
const user_decorator_1 = require("../../shared/decorators/user.decorator");
let NodesController = class NodesController {
    constructor(nodesryService) {
        this.nodesryService = nodesryService;
    }
    create(telemetryData, request) {
        const ipAddress = request.headers['x-forwarded-for'] || request.headers['x-real-ip'];
        telemetryData.ip = ipAddress;
        return this.nodesryService.updateNodeTelemetryData(telemetryData);
    }
    logNodeStatus(nodeId, accountId) {
        return this.nodesryService.logNodeStatus(nodeId);
    }
    getNodesByOwnerId(id) {
        return this.nodesryService.getOwnerNodes(id);
    }
    findAll() {
        return this.nodesryService.findAll();
    }
    findOne(id) {
        return this.nodesryService.getByIdOrThrowError(id);
    }
    getNodeByAgentId(id) {
        return this.nodesryService.findOneByNodeId(id);
    }
    getOnwerNodesByOwnerId(id) {
        return this.nodesryService.getOwnerNodes(id);
    }
    testUpdateSpeed() {
        return this.nodesryService.updateBandwidth();
    }
    activateNode(nodeId) {
        return this.nodesryService.activateNode(nodeId);
    }
    deactivateNode(nodeId, user) {
        console.log({ user });
        return this.nodesryService.deactivateNode(nodeId);
    }
    disableNode(nodeId, user) {
        console.log({ user });
        return this.nodesryService.disableNode(nodeId);
    }
    speed(payload) {
        return this.nodesryService.updateSpeedOfNodeByNodeId(payload);
    }
    updateStateInSmartContract() {
        return this.nodesryService.updateNodeState();
    }
    updateRegionInSmartContract() {
        return this.nodesryService.updateRegion();
    }
    async deleteNodesByOwnerId(ownerId) {
        return this.nodesryService.deleteNodesByOwnerId(ownerId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'store Node telemetry data in db' }),
    (0, compose_decorators_1.AgentAuthDecorators)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nodes_types_1.NodeDataDto, Object]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/log-status/:relayId'),
    (0, swagger_1.ApiOperation)({ summary: 'Log Node status update, used by the agent app, not for the UI' }),
    (0, compose_decorators_1.AgentAuthDecorators)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('relayId')),
    __param(1, (0, user_decorator_1.UserDecorator)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "logNodeStatus", null);
__decorate([
    (0, common_1.Get)('/owner/:ownerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieves a Node by owner Id' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "getNodesByOwnerId", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieves a list of available Nodes' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieves a Node by DB Id' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/relayId/:relayId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('relayId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "getNodeByAgentId", null);
__decorate([
    (0, common_1.Get)('/owner/:ownerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieves a Node by DB Id' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "getOnwerNodesByOwnerId", null);
__decorate([
    (0, common_1.Post)('/t/update-speed'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Node Bandwidth in DB!' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "testUpdateSpeed", null);
__decorate([
    (0, common_1.Put)('/:relayId/state/activate'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate Node' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('relayId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "activateNode", null);
__decorate([
    (0, common_1.Put)('/:relayId/state/deactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate Node' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('relayId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "deactivateNode", null);
__decorate([
    (0, common_1.Put)('/:relayId/state/disable'),
    (0, swagger_1.ApiOperation)({ summary: 'Makrs the node as disabled' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)('relayId')),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "disableNode", null);
__decorate([
    (0, common_1.Put)('/bandwidth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Node Bandwidth in DB!' }),
    (0, compose_decorators_1.AgentAuthDecorators)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "speed", null);
__decorate([
    (0, common_1.Put)('/state'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the state of all nodes registered in the smart contract' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "updateStateInSmartContract", null);
__decorate([
    (0, common_1.Put)('/region/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the region of all nodes registered in the smart contract' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "updateRegionInSmartContract", null);
__decorate([
    (0, common_1.Delete)('/owner/:ownerId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NodesController.prototype, "deleteNodesByOwnerId", null);
NodesController = __decorate([
    (0, swagger_1.ApiTags)('Nodes'),
    (0, common_1.Controller)('nodes'),
    __metadata("design:paramtypes", [nodes_service_1.NodeService])
], NodesController);
exports.NodesController = NodesController;
//# sourceMappingURL=nodes.controller.js.map