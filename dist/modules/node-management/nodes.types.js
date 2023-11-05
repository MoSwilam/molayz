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
exports.NodeState = exports.nodeKeys = exports.NodeStatus = exports.NodeStatusDto = exports.NodeDataDto = exports.NodeRegsiterDto = exports.ColibriStats = exports.Bandwidth = exports.NodeOs = exports.Memory = exports.CpuInfo = exports.DAppNodeType = exports.NodeType = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NodeType {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, payload: { required: true, type: () => Object } };
    }
}
exports.NodeType = NodeType;
class DAppNodeType {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, walletAddress: { required: true, type: () => String }, accessKeyId: { required: true, type: () => String }, secretAccessKey: { required: true, type: () => String } };
    }
}
exports.DAppNodeType = DAppNodeType;
class CpuInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { brand: { required: true, type: () => String }, cores: { required: true, type: () => Number }, speed: { required: true, type: () => String } };
    }
}
exports.CpuInfo = CpuInfo;
class Memory {
    static _OPENAPI_METADATA_FACTORY() {
        return { free: { required: true, type: () => String }, total: { required: true, type: () => String } };
    }
}
exports.Memory = Memory;
class NodeOs {
    static _OPENAPI_METADATA_FACTORY() {
        return { uptime: { required: true, type: () => String } };
    }
}
exports.NodeOs = NodeOs;
class Bandwidth {
    static _OPENAPI_METADATA_FACTORY() {
        return { upload: { required: true, type: () => Speed }, download: { required: true, type: () => Speed } };
    }
}
exports.Bandwidth = Bandwidth;
class Speed {
    static _OPENAPI_METADATA_FACTORY() {
        return { speed: { required: true, type: () => String }, units: { required: true, type: () => String } };
    }
}
class ColibriStats {
    static _OPENAPI_METADATA_FACTORY() {
        return { shutdownState: { required: true, type: () => String }, drain: { required: true, type: () => String }, time: { required: true, type: () => Number }, 'load-management': { required: true, type: () => Object }, 'overall_bridge_jitter': { required: true, type: () => Number }, conferences: { required: true, type: () => Object }, health: { required: true, type: () => String } };
    }
}
exports.ColibriStats = ColibriStats;
class NodeRegsiterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nodeId: { required: true, type: () => String }, userId: { required: true, type: () => String } };
    }
}
exports.NodeRegsiterDto = NodeRegsiterDto;
class NodeDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nodeId: { required: true, type: () => String }, cpu: { required: true, type: () => require("./nodes.types").CpuInfo }, agentVersion: { required: true, type: () => String }, region: { required: true, type: () => String }, nodeOs: { required: true, type: () => require("./nodes.types").NodeOs }, memory: { required: true, type: () => require("./nodes.types").Memory }, bandwidth: { required: true, type: () => require("./nodes.types").Bandwidth }, ip: { required: true, type: () => String }, ipV4RemoteLogin: { required: true, type: () => String }, colibriStats: { required: true, type: () => require("./nodes.types").ColibriStats }, traffic: { required: true, type: () => Number }, numberOfConferences: { required: true, type: () => Number }, ownerId: { required: true, type: () => String }, requestIp: { required: false, type: () => String }, country: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDataDto.prototype, "nodeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", CpuInfo)
], NodeDataDto.prototype, "cpu", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", NodeOs)
], NodeDataDto.prototype, "nodeOs", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Memory)
], NodeDataDto.prototype, "memory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDataDto.prototype, "ip", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDataDto.prototype, "ipV4RemoteLogin", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NodeDataDto.prototype, "traffic", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDataDto.prototype, "ownerId", void 0);
exports.NodeDataDto = NodeDataDto;
class NodeStatusDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("./nodes.types").NodeStatus }, nodeId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], NodeStatusDto.prototype, "timestamp", void 0);
exports.NodeStatusDto = NodeStatusDto;
var NodeStatus;
(function (NodeStatus) {
    NodeStatus["ACTIVE"] = "ACTIVE";
    NodeStatus["INACTIVE"] = "INACTIVE";
})(NodeStatus = exports.NodeStatus || (exports.NodeStatus = {}));
exports.nodeKeys = [
    'nodeId',
    'meetingId',
    'cpu',
    'ram',
    'totalPackets',
    'totalMegaBytes',
    'perMeeting',
    'region',
    'participants',
    'bandwidth',
    'ip'
];
var NodeState;
(function (NodeState) {
    NodeState["Active"] = "Active";
    NodeState["Inactive"] = "Inactive";
    NodeState["Disabled"] = "Disabled";
})(NodeState = exports.NodeState || (exports.NodeState = {}));
//# sourceMappingURL=nodes.types.js.map