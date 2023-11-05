import { Injectable, NotFoundException } from '@nestjs/common';
import { NearService } from '../../shared/near-service'; // Substitua pelo caminho correto

@Injectable()
export class CliLibService {
  private nearService: NearService;
  private contractId: string;

  constructor() {
    this.nearService = NearService.getInstance();
    this.contractId = this.nearService.contractId;
  }

  /**
   * @deprecated The method should not be used
   */
  async updateSpeed(dbNodes) {
    try {
      const nodesOnSmartContract = await this.allNodes();
      const nodesThatExistOnSmartContractAndOnDb =
        await this.extractNodesThatExistOnSmartContractAndOnDb(nodesOnSmartContract, dbNodes);

      if (!nodesThatExistOnSmartContractAndOnDb || !nodesThatExistOnSmartContractAndOnDb.length) {
        console.warn(
          'Warning: No matching nodes were found in the database that correspond to nodes on the Smart contract. Skipping the bandwidth update process.'
        );
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
    } catch (error) {
      // TODO: implement logger system
      console.error('Error while updating speed in smart contract', { error });
    }
  }

  /**
   * @deprecated The method should not be used
   */
  async updateTraffic(dbNodes) {
    try {
      const nodesOnSmartContract = await this.allNodes();
      const nodesThatExistOnSmartContractAndOnDb =
        await this.extractNodesThatExistOnSmartContractAndOnDb(nodesOnSmartContract, dbNodes);

      if (!nodesThatExistOnSmartContractAndOnDb || !nodesThatExistOnSmartContractAndOnDb.length) {
        console.warn(
          'Warning: No matching nodes were found in the database that correspond to nodes on the Smart contract. Skipping the traffic update process.'
        );
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
    } catch (error) {
      console.error('Error while updating traffic in smart contract', error);
    }
  }

  async allNodes() {
    try {
      const contract = this.nearService.getContract();
      const result = await contract.all_nodes();
      return result;
    } catch (error) {
      console.error('Error while getting list of nodes from smart contract', error);
    }
  }

  async getNode(nodeId) {
    try {
      const nodesList = await this.allNodes();
      const result = (nodesList as []).find((s: any) => s.relay_id == nodeId);

      if (!result) {
        console.error(`Node not found on smart contract. NodeId ${nodeId}`);
        return;
      }

      console.log({ foundNodeOnSmartContract: result });
      return result;
    } catch (error) {
      console.error('Error while getting node information from smart contract', error);
    }
  }

  async activateNode(nodeIds: string[]) {
    try {
      const contract = this.nearService.getContract();
      const result = await contract.activate_nodes({
        data: nodeIds,
        gas: '300000000000000' // Note the placement of 'gas'
      });
      console.log({ activateNodeRes: result });
      return result;
    } catch (error) {
      console.error('Error while activating nodes in smart contract', error);
    }
  }
  async deactivateNode(nodeIds: string[]) {
    try {
      const contract = this.nearService.getContract();
      const result = await contract.deactivate_nodes({
        data: nodeIds,
        gas: '300000000000000' // Note the placement of 'gas'
      });
      console.log({ deactivateNodeRes: result });
      return result;
    } catch (error) {
      console.error('Error while deactivating nodes in smart contract', error);
    }
  }

  /**
   * @deprecated The method should not be used
   */
  async deleteAllNodes() {
    try {
      const contract = this.nearService.getContract();
      const result = await contract.functionCall({
        contractId: this.contractId,
        methodName: 'deleteAllNodes', // Substitua pelo nome do método no seu contrato
        args: {},
        gas: '300000000000000' // Ajuste a quantidade de gás conforme necessário
      });

      console.log('All nodes deleted from smart contract');
      console.log({ deleteNodeRes: result });
    } catch (error) {
      console.error('Error while deleting all nodes in smart contract', error);
    }
  }

  async checkIfNodeExistsOnNodesArray(nodeId: string, nodesArray: any[]) {
    const nodeFound = nodesArray.find(({ nodeId: id }) => id === nodeId);
    if (!nodeFound) {
      throw new NotFoundException(`Node not found on smart contract. NodeId ${nodeId}`);
      return;
    }
    console.log({ foundNodeOnSmartContract: nodeFound });
    return nodeFound;
  }

  async extractNodesThatExistOnSmartContractAndOnDb(smarContractNodes, dbNodes) {
    return dbNodes.filter((dbNode) =>
      smarContractNodes.some((smartContractNode) => dbNode.nodeId != smartContractNode.relay_Id)
    );
  }
}
