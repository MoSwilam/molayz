import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Bandwidth, ColibriStats, CpuInfo, Memory, NodeOs, NodeState } from './nodes.types';

export type NodesDocument = NodeEntity & Document;

@Schema({ timestamps: true, collection: 'telemetry-data' })
export class NodeEntity {
  @Prop()
  nodeId: string;

  @Prop()
  userId: string;

  @Prop()
  ip: string;

  @Prop()
  ipV4RemoteLogin: string;

  @Prop({ type: CpuInfo })
  cpu: CpuInfo;

  @Prop({ type: Memory })
  memory: Memory;

  @Prop({ type: NodeOs })
  nodeOs: NodeOs;

  @Prop({ type: ColibriStats })
  colibriStats: ColibriStats;

  @Prop({ type: Bandwidth })
  bandwidth: Bandwidth;

  @Prop()
  bandwidthLastUpdatedAt: Date;

  @Prop()
  agentVersion: string;

  @Prop()
  lastActiveStatusUpdate: Date;

  @Prop()
  traffic: string;

  @Prop({ default: NodeState.Active })
  state: NodeState;

  @Prop()
  ownerId: string;

  @Prop()
  numberOfConferences: number;

  @Prop()
  region: string;

  @Prop()
  country: string;

  @Prop()
  osVersion: string;
}

export const NodesSchema = SchemaFactory.createForClass(NodeEntity);
