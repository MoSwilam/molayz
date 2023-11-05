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
exports.CliLibService = void 0;
const common_1 = require("@nestjs/common");
const near_service_1 = require("../../shared/near-service");
let CliLibService = class CliLibService {
    constructor() {
        this.nearService = near_service_1.NearService.getInstance();
        this.contractId = this.nearService.contractId;
    }
    async updateSpeed(dbNodes) {
        try {
            const nodesOnSmartContract = await this.allNodes();
            const nodesThatExistOnSmartContractAndOnDb = await this.extractNodesThatExistOnSmartContractAndOnDb(nodesOnSmartContract, dbNodes);
            if (!nodesThatExistOnSmartContractAndOnDb || !nodesThatExistOnSmartContractAndOnDb.length) {
                console.warn('Warning: No matching nodes were found in the database that correspond to nodes on the Smart contract. Skipping the bandwidth update process.');
                return;
            }
            const map = {};
            for (const node of nodesThatExistOnSmartContractAndOnDb) {
                const { nodeId, bandwidth } = node;
                if (!bandwidth) {
                    continue;
                }
                map[nodeId] = bandwidth;
            }
            const contract = this.nearService.getContract();
            const functionCallArgs = {
                update_speed: {
                    map,
                    force: true
                }
            };
            const result = await contract.update_nodes_speed(functionCallArgs);
            console.log('--------------- Updated speed task completed Successfully -----------------');
            console.log({ bandwidthUpdateResponse: result });
            return result;
        }
        catch (error) {
            console.error('Error while updating speed in smart contract', { error });
        }
    }
    async updateTraffic(dbNodes) {
        try {
            const nodesOnSmartContract = await this.allNodes();
            const nodesThatExistOnSmartContractAndOnDb = await this.extractNodesThatExistOnSmartContractAndOnDb(nodesOnSmartContract, dbNodes);
            if (!nodesThatExistOnSmartContractAndOnDb || !nodesThatExistOnSmartContractAndOnDb.length) {
                console.warn('Warning: No matching nodes were found in the database that correspond to nodes on the Smart contract. Skipping the traffic update process.');
                return;
            }
            const map = {};
            for (const node of nodesThatExistOnSmartContractAndOnDb) {
                const { nodeId, traffic } = node;
                if (!traffic) {
                    continue;
                }
                map[nodeId] = +traffic;
            }
            const contract = this.nearService.getContract();
            const functionCallArgs = {
                update_traffic: {
                    map,
                    force: true
                }
            };
            const result = await contract.update_nodes_traffic(functionCallArgs);
            console.log('--------------- Updated traffic task completed Successfully -----------------');
            console.log({ updateTrafficRes: result });
            return result;
        }
        catch (error) {
            console.error('Error while updating traffic in smart contract', error);
        }
    }
    async allNodes() {
        try {
            const contract = this.nearService.getContract();
            const result = await contract.all_nodes();
            return result;
        }
        catch (error) {
            console.error('Error while getting list of nodes from smart contract', error);
        }
    }
    async getNode(nodeId) {
        try {
            const nodesList = await this.allNodes();
            const result = nodesList.find((s) => s.relay_id == nodeId);
            if (!result) {
                console.error(`Node not found on smart contract. NodeId ${nodeId}`);
                return;
            }
            console.log({ foundNodeOnSmartContract: result });
            return result;
        }
        catch (error) {
            console.error('Error while getting node information from smart contract', error);
        }
    }
    async activateNode(nodeIds) {
        try {
            const contract = this.nearService.getContract();
            const result = await contract.activate_nodes({
                data: nodeIds,
                gas: '300000000000000'
            });
            console.log({ activateNodeRes: result });
            return result;
        }
        catch (error) {
            console.error('Error while activating nodes in smart contract', error);
        }
    }
    async deactivateNode(nodeIds) {
        try {
            const contract = this.nearService.getContract();
            const result = await contract.deactivate_nodes({
                data: nodeIds,
                gas: '300000000000000'
            });
            console.log({ deactivateNodeRes: result });
            return result;
        }
        catch (error) {
            console.error('Error while deactivating nodes in smart contract', error);
        }
    }
    async deleteAllNodes() {
        try {
            const contract = this.nearService.getContract();
            const result = await contract.functionCall({
                contractId: this.contractId,
                methodName: 'deleteAllNodes',
                args: {},
                gas: '300000000000000'
            });
            console.log('All nodes deleted from smart contract');
            console.log({ deleteNodeRes: result });
        }
        catch (error) {
            console.error('Error while deleting all nodes in smart contract', error);
        }
    }
    async checkIfNodeExistsOnNodesArray(nodeId, nodesArray) {
        const nodeFound = nodesArray.find(({ nodeId: id }) => id === nodeId);
        if (!nodeFound) {
            throw new common_1.NotFoundException(`Node not found on smart contract. NodeId ${nodeId}`);
            return;
        }
        console.log({ foundNodeOnSmartContract: nodeFound });
        return nodeFound;
    }
    async extractNodesThatExistOnSmartContractAndOnDb(smarContractNodes, dbNodes) {
        return dbNodes.filter((dbNode) => smarContractNodes.some((smartContractNode) => dbNode.nodeId != smartContractNode.relay_Id));
    }
};
CliLibService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CliLibService);
exports.CliLibService = CliLibService;
//# sourceMappingURL=cli-lib.service.js.map