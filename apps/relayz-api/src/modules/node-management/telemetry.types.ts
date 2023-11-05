// import { IsNotEmpty, IsString } from 'class-validator';

// export class TelemetryType {
//   id: string;
//   payload: JSON;
// }
// export class DAppNodeType {
//   id: string;
//   walletAddress: string;
//   accessKeyId: string;
//   secretAccessKey: string;
// }

// export class CpuInfo {
//   brand: string;
//   cores: number;
//   speed: string;
// }

// export class Memory {
//   free: string;
//   total: string;
// }

// export class NodeOs {
//   arch: string;
//   uptime: string;
//   version: string;
// }

// interface ILoadManagement {
//   state: string;
//   stress: string;
//   reducer_enabled: string;
//   reducer: IColibriStatsReducer;
// }

// interface IColibriStatsReducer {
//   jvbLastN: number;
// }

// export class ColibriStats {
//   shutdownState: string;
//   drain: string;
//   time: number;
//   'load-management': ILoadManagement;
//   'overall_bridge_jitter': number;
//   conferences: any;
//   health: string;
// }

// export class TelemetryDataDto {
//   // @IsNotEmpty()
//   // @IsString()
//   // nodeId: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // meetingId: string;

//   @IsNotEmpty()
//   cpu: CpuInfo;

//   @IsNotEmpty()
//   nodeOs: NodeOs;

//   @IsNotEmpty()
//   memory: Memory;

//   // @IsNotEmpty()
//   // @IsString()
//   // totalPackets: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // totalMegaBytes: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // perMeeting: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // region: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // participants: string;

//   // @IsNotEmpty()
//   // @IsString()
//   // bandwidth: string;

//   @IsString()
//   ip: string;

//   @IsNotEmpty()
//   @IsString()
//   ipV4RemoteLogin: string;

//   @IsNotEmpty()
//   colibriStats: ColibriStats;
// }

// export const telemetryKeys = [
//   'nodeId',
//   'meetingId',
//   'cpu',
//   'ram',
//   'totalPackets',
//   'totalMegaBytes',
//   'perMeeting',
//   'region',
//   'participants',
//   'bandwidth',
//   'ip'
// ];
