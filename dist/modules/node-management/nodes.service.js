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
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodes_schema_1 = require("./nodes.schema");
const nodes_types_1 = require("./nodes.types");
const cli_lib_service_1 = require("../cli-lib/cli-lib.service");
let NodeService = class NodeService {
    constructor(nodesModel, cliLibService) {
        this.nodesModel = nodesModel;
        this.cliLibService = cliLibService;
    }
    async getByIdOrThrowError(id) {
        const nodeData = await this.nodesModel.findById(id);
        if (!nodeData)
            throw new common_1.NotFoundException();
        return nodeData;
    }
    async getOwnerNodes(ownerId) {
        const nodesData = await this.nodesModel.find({ ownerId });
        if (!nodesData.length)
            throw new common_1.NotFoundException(`Node with owner id: ${ownerId} not found`);
        return nodesData;
    }
    async getNodesByOwnerId(ownerId) {
        const nodesData = await this.nodesModel.find({ ownerId });
        return nodesData.length > 0;
    }
    async getNodeByOwnerId(ownerId) {
        return await this.nodesModel.findOne({ ownerId });
    }
    async createNode(payload) {
        const { nodeId } = payload;
        const isNodeExists = await this.nodesModel.findOne({ nodeId });
        if (isNodeExists) {
            throw new common_1.BadRequestException(`Node with id: ${nodeId} already exists in DB`);
        }
        return await this.nodesModel.create(payload);
    }
    async updateNodeTelemetryData(payload) {
        const { nodeId } = payload;
        const node = await this.nodesModel.findOne({ nodeId });
        if (!node) {
            throw new common_1.BadRequestException(`Node with id: ${nodeId} does not exist in DB`);
        }
        const now = new Date().toISOString();
        payload.region = this.parseRegion(payload.region);
        return await this.nodesModel.findOneAndUpdate({ nodeId }, Object.assign(Object.assign({}, payload), { lastActiveStatusUpdate: now }), { new: true });
    }
    parseRegion(rawRegion) {
        switch (rawRegion) {
            case 'EU':
                return 'Europe';
            case 'AS':
                return 'Asia';
            case 'NA':
                return 'America';
            default:
                return 'ROTW';
        }
    }
    async logNodeStatus(nodeId) {
        const timestamp = new Date().toISOString();
        return await this.nodesModel.findOneAndUpdate({ nodeId }, { lastActiveStatusUpdate: timestamp }, { new: true });
    }
    async findAll() {
        const nodesData = await this.nodesModel.find({ state: { $ne: nodes_types_1.NodeState.Disabled } });
        console.log(this.nodesModel.db.host);
        if (!nodesData)
            throw new common_1.NotFoundException();
        return nodesData;
    }
    async findPaginate(query, fields) {
        const nodesData = await this.nodesModel.find(query, fields, { skip: 10, limit: 5 });
        return nodesData;
    }
    async findOneByNodeId(id) {
        return await this.nodesModel.findOne({ nodeId: id });
    }
    async updateBandwidth() {
        const nodesData = await this.nodesModel.find({ bandwidth: { $ne: null } });
        if (!nodesData || !nodesData.length) {
            console.warn('No data with bandwidth in db. skipping updates..');
            return;
        }
        return await this.cliLibService.updateSpeed(nodesData);
    }
    async updateTraffic() {
        const nodesData = await this.nodesModel.find({ traffic: { $ne: null } });
        if (!nodesData || !nodesData.length) {
            console.warn('No data with traffic in db. skipping updates..');
            return;
        }
        return await this.cliLibService.updateTraffic(nodesData);
    }
    async activateNode(nodeId) {
        const node = await this.findOneByNodeId(nodeId);
        if (!node)
            throw new common_1.NotFoundException(`Node with id: ${nodeId} not found`);
        await this.cliLibService.activateNode([nodeId]);
        const { state } = node;
        if (state === nodes_types_1.NodeState.Active) {
            throw new common_1.BadRequestException(`Node with id: ${nodeId} is already active`);
        }
        console.log(333333333);
        await this.nodesModel.findOneAndUpdate({ nodeId }, { state: nodes_types_1.NodeState.Active });
        return await this.nodesModel.find({ ownerId: node.ownerId });
    }
    async deactivateNode(nodeId) {
        const node = await this.findOneByNodeId(nodeId);
        if (!node)
            throw new common_1.NotFoundException(`Node with id: ${nodeId} not found`);
        await this.cliLibService.deactivateNode([nodeId]);
        const { state } = node;
        if (state === nodes_types_1.NodeState.Inactive) {
            throw new common_1.BadRequestException(`Node with id: ${nodeId} is already inactive`);
        }
        await this.nodesModel.findOneAndUpdate({ nodeId }, { state: nodes_types_1.NodeState.Inactive });
        return await this.nodesModel.find({ ownerId: node.ownerId });
    }
    async disableNode(nodeId) {
        const node = await this.findOneByNodeId(nodeId);
        if (!node)
            throw new common_1.NotFoundException(`Node with id: ${nodeId} not found`);
        const { state } = node;
        if (state === nodes_types_1.NodeState.Inactive) {
            throw new common_1.BadRequestException(`Node with id: ${nodeId} is already disabled`);
        }
        await this.nodesModel.findOneAndUpdate({ nodeId }, { state: nodes_types_1.NodeState.Inactive }, { new: true });
        return await this.nodesModel.find({ ownerId: node.ownerId });
    }
    async updateSpeedOfNodeByNodeId(payload) {
        const { nodeId, bandwidth } = payload;
        const timestamp = new Date().toISOString();
        const nodeFound = await this.nodesModel.findOne({ nodeId });
        if (!nodeFound)
            return;
        return await this.nodesModel.findOneAndUpdate({ nodeId }, { bandwidth, bandwidthLastUpdatedAt: timestamp }, { new: true });
    }
    async updateNodeState() {
        const nodesInDb = await this.nodesModel.find({ lastActiveStatusUpdate: { $ne: null } });
        if (!nodesInDb || !nodesInDb.length)
            return;
        const deactivateNodes = [];
        const activateNodes = [];
        for (const node of nodesInDb) {
            const { lastActiveStatusUpdate, nodeId } = node;
            const lastActiveAt = new Date(lastActiveStatusUpdate);
            const currentTime = new Date();
            const timeDifference = Number(currentTime) - Number(lastActiveAt);
            const minutesDifference = Math.round(timeDifference / (1000 * 60));
            if (minutesDifference >= 10) {
                deactivateNodes.push(nodeId);
            }
            else {
                activateNodes.push(nodeId);
            }
        }
        console.log('================================================');
        console.log({
            activatingNodes: activateNodes.length,
            deactivatingNodes: deactivateNodes.length
        });
        console.log('================================================');
        await this.nodesModel.updateMany({ nodeId: { $in: deactivateNodes } }, { state: nodes_types_1.NodeState.Inactive }, { new: true });
        await this.nodesModel.updateMany({ nodeId: { $in: activateNodes } }, { state: nodes_types_1.NodeState.Active }, { new: true });
        return { deactivateNodes: deactivateNodes.length, activateNodes: activateNodes.length };
    }
    async updateRegion() {
        return await this.nodesModel.updateMany({}, { region: 'EU' }, { new: true });
    }
    async deleteNodesByOwnerId(ownerId) {
        return await this.nodesModel.deleteMany({ ownerId });
    }
};
NodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nodes_schema_1.NodeEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cli_lib_service_1.CliLibService])
], NodeService);
exports.NodeService = NodeService;
//# sourceMappingURL=nodes.service.js.map