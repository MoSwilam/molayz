import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { NodesDocument, NodeEntity } from './nodes.schema';
import { NodeDataDto, NodeRegsiterDto, NodeState } from './nodes.types';
import { CliLibService } from '../cli-lib/cli-lib.service';

@Injectable()
export class NodeService {
  constructor(
    @InjectModel(NodeEntity.name)
    private nodesModel: Model<NodesDocument>,
    private cliLibService: CliLibService
  ) {}

  async getByIdOrThrowError(id) {
    // Utils.rLog(id);
    const nodeData = await this.nodesModel.findById(id);
    if (!nodeData) throw new NotFoundException();
    return nodeData;
  }

  async getOwnerNodes(ownerId: string) {
    const nodesData = await this.nodesModel.find({ ownerId });
    if (!nodesData.length) throw new NotFoundException(`Node with owner id: ${ownerId} not found`);
    return nodesData;
  }

  async getNodesByOwnerId(ownerId: string) {
    const nodesData = await this.nodesModel.find({ ownerId });
    return nodesData.length > 0;
  }

  async getNodeByOwnerId(ownerId: string): Promise<NodesDocument> {
    return await this.nodesModel.findOne({ ownerId });
  }

  async createNode(payload: NodeRegsiterDto): Promise<NodesDocument> {
    // Utils.rLog(payload);

    const { nodeId } = payload;
    const isNodeExists = await this.nodesModel.findOne({ nodeId });
    if (isNodeExists) {
      throw new BadRequestException(`Node with id: ${nodeId} already exists in DB`);
    }

    return await this.nodesModel.create(payload);
  }

  async updateNodeTelemetryData(payload: NodeDataDto): Promise<NodesDocument> {
    const { nodeId } = payload;
    const node = await this.nodesModel.findOne({ nodeId });
    if (!node) {
      throw new BadRequestException(`Node with id: ${nodeId} does not exist in DB`);
    }

    // const nodeRegisteredOnSmartContract = await this.cliLibService.getNode(payload.nodeId);
    // if (!nodeRegisteredOnSmartContract) {
    //   throw new BadRequestException('Cannot post or update telemetry data for the provided node because it does not exist on the smart contract.');
    // }

    const now = new Date().toISOString();

    payload.region = this.parseRegion(payload.region);

    return await this.nodesModel.findOneAndUpdate(
      { nodeId },
      { ...payload, lastActiveStatusUpdate: now },
      { new: true }
    );
  }

  parseRegion(rawRegion: string) {
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

  async logNodeStatus(nodeId: string) {
    // Utils.rLog(nodeId);

    const timestamp = new Date().toISOString();
    return await this.nodesModel.findOneAndUpdate(
      { nodeId },
      { lastActiveStatusUpdate: timestamp },
      { new: true }
    );
  }

  async findAll() {
    const nodesData = await this.nodesModel.find({ state: { $ne: NodeState.Disabled } });
    console.log(this.nodesModel.db.host);
    if (!nodesData) throw new NotFoundException();
    return nodesData;
  }

  async findPaginate(
    query: FilterQuery<NodesDocument>,
    fields: QueryOptions<NodesDocument>
  ): Promise<NodesDocument[]> {
    const nodesData = await this.nodesModel.find(query, fields, { skip: 10, limit: 5 });
    return nodesData;
  }

  async findOneByNodeId(id: string) {
    // Utils.rLog(id);

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

  async activateNode(nodeId: string) {
    const node = await this.findOneByNodeId(nodeId);
    if (!node) throw new NotFoundException(`Node with id: ${nodeId} not found`);

    await this.cliLibService.activateNode([nodeId]);

    const { state } = node;
    if (state === NodeState.Active) {
      throw new BadRequestException(`Node with id: ${nodeId} is already active`);
    }

    console.log(333333333);

    await this.nodesModel.findOneAndUpdate({ nodeId }, { state: NodeState.Active });
    return await this.nodesModel.find({ ownerId: node.ownerId });
  }

  async deactivateNode(nodeId: string) {
    const node = await this.findOneByNodeId(nodeId);
    if (!node) throw new NotFoundException(`Node with id: ${nodeId} not found`);

    await this.cliLibService.deactivateNode([nodeId]);

    const { state } = node;
    if (state === NodeState.Inactive) {
      throw new BadRequestException(`Node with id: ${nodeId} is already inactive`);
    }

    await this.nodesModel.findOneAndUpdate({ nodeId }, { state: NodeState.Inactive });
    return await this.nodesModel.find({ ownerId: node.ownerId });
  }

  async disableNode(nodeId: string) {
    const node = await this.findOneByNodeId(nodeId);
    if (!node) throw new NotFoundException(`Node with id: ${nodeId} not found`);

    const { state } = node;
    if (state === NodeState.Inactive) {
      // TODO: Change it !!!! For now we can't disable, becouse after the user can't manager the node.
      throw new BadRequestException(`Node with id: ${nodeId} is already disabled`);
    }

    await this.nodesModel.findOneAndUpdate(
      { nodeId },
      { state: NodeState.Inactive },
      { new: true }
    );
    return await this.nodesModel.find({ ownerId: node.ownerId });
  }

  async updateSpeedOfNodeByNodeId(payload) {
    const { nodeId, bandwidth } = payload;
    const timestamp = new Date().toISOString();
    const nodeFound = await this.nodesModel.findOne({ nodeId });

    if (!nodeFound) return;
    return await this.nodesModel.findOneAndUpdate(
      { nodeId },
      { bandwidth, bandwidthLastUpdatedAt: timestamp },
      { new: true }
    );
  }

  async updateNodeState() {
    const nodesInDb = await this.nodesModel.find({ lastActiveStatusUpdate: { $ne: null } });
    if (!nodesInDb || !nodesInDb.length) return;

    const deactivateNodes: string[] = [];
    const activateNodes: string[] = [];

    for (const node of nodesInDb) {
      const { lastActiveStatusUpdate, nodeId } = node;
      const lastActiveAt = new Date(lastActiveStatusUpdate);

      const currentTime = new Date();
      const timeDifference = Number(currentTime) - Number(lastActiveAt);
      const minutesDifference = Math.round(timeDifference / (1000 * 60)); // 1 minutes

      if (minutesDifference >= 10) {
        deactivateNodes.push(nodeId);
      } else {
        activateNodes.push(nodeId);
      }
    }

    console.log('================================================');
    console.log({
      activatingNodes: activateNodes.length,
      deactivatingNodes: deactivateNodes.length
    });
    console.log('================================================');

    // Deactivate nodes in smart contract
    // const deactivateRes = await this.cliLibService.deactivateNode(deactivateNodes);
    await this.nodesModel.updateMany(
      { nodeId: { $in: deactivateNodes } },
      { state: NodeState.Inactive },
      { new: true }
    );
    // console.log({ updateResInDb });
    // const activateRes = await this.cliLibService.activateNode(activateNodes);
    await this.nodesModel.updateMany(
      { nodeId: { $in: activateNodes } },
      { state: NodeState.Active },
      { new: true }
    );
    return { deactivateNodes: deactivateNodes.length, activateNodes: activateNodes.length };
  }

  async updateRegion() {
    return await this.nodesModel.updateMany({}, { region: 'EU' }, { new: true });
  }

  async deleteNodesByOwnerId(ownerId: string) {
    return await this.nodesModel.deleteMany({ ownerId });
  }
}
