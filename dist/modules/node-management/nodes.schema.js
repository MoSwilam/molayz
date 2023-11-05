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
exports.NodesSchema = exports.NodeEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const nodes_types_1 = require("./nodes.types");
let NodeEntity = class NodeEntity {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "nodeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "ipV4RemoteLogin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nodes_types_1.CpuInfo }),
    __metadata("design:type", nodes_types_1.CpuInfo)
], NodeEntity.prototype, "cpu", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nodes_types_1.Memory }),
    __metadata("design:type", nodes_types_1.Memory)
], NodeEntity.prototype, "memory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nodes_types_1.NodeOs }),
    __metadata("design:type", nodes_types_1.NodeOs)
], NodeEntity.prototype, "nodeOs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nodes_types_1.ColibriStats }),
    __metadata("design:type", nodes_types_1.ColibriStats)
], NodeEntity.prototype, "colibriStats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: nodes_types_1.Bandwidth }),
    __metadata("design:type", nodes_types_1.Bandwidth)
], NodeEntity.prototype, "bandwidth", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], NodeEntity.prototype, "bandwidthLastUpdatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "agentVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], NodeEntity.prototype, "lastActiveStatusUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "traffic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: nodes_types_1.NodeState.Active }),
    __metadata("design:type", String)
], NodeEntity.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], NodeEntity.prototype, "numberOfConferences", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], NodeEntity.prototype, "osVersion", void 0);
NodeEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'telemetry-data' })
], NodeEntity);
exports.NodeEntity = NodeEntity;
exports.NodesSchema = mongoose_1.SchemaFactory.createForClass(NodeEntity);
//# sourceMappingURL=nodes.schema.js.map