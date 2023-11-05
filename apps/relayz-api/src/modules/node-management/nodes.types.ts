import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NodeType {
  id: string;
  payload: JSON;
}

export class DAppNodeType {
  id: string;
  walletAddress: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export class CpuInfo {
  brand: string;
  cores: number;
  speed: string;
}

export class Memory {
  free: string;
  total: string;
}

export class NodeOs {
  uptime: string;
}

export class Bandwidth {
  upload: Speed;
  download: Speed;
}

class Speed {
  speed: string;
  units: string;
}

interface ILoadManagement {
  state: string;
  stress: string;
  reducer_enabled: string;
  reducer: IColibriStatsReducer;
}

interface IColibriStatsReducer {
  jvbLastN: number;
}

export class ColibriStats {
  shutdownState: string;
  drain: string;
  time: number;
  'load-management': ILoadManagement;
  'overall_bridge_jitter': number;
  conferences: any;
  health: string;
}

export class NodeRegsiterDto {
  nodeId: string;
  userId: string;
}

export class NodeDataDto {
  @IsNotEmpty()
  @IsString()
  nodeId: string;

  // @IsNotEmpty()
  // @IsString()
  // meetingId: string;

  @IsNotEmpty()
  cpu: CpuInfo;

  agentVersion: string;

  region: string;

  @IsNotEmpty()
  nodeOs: NodeOs;

  @IsNotEmpty()
  memory: Memory;

  // @IsNotEmpty()
  bandwidth: Bandwidth;

  @IsString()
  ip: string;

  @IsNotEmpty()
  @IsString()
  ipV4RemoteLogin: string;

  // @IsNotEmpty()
  colibriStats: ColibriStats;

  @IsNumber()
  traffic: number;

  numberOfConferences: number;

  @IsNotEmpty()
  @IsString()
  ownerId: string;

  requestIp?: string;

  country: string;
}

export class NodeStatusDto {
  @ApiHideProperty()
  timestamp?: string;

  status: NodeStatus;
  nodeId: string;
}

export enum NodeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const nodeKeys = [
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

export enum NodeState {
  Active = 'Active',
  Inactive = 'Inactive',
  Disabled = 'Disabled'
}
