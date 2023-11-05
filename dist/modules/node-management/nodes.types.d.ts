export declare class NodeType {
    id: string;
    payload: JSON;
}
export declare class DAppNodeType {
    id: string;
    walletAddress: string;
    accessKeyId: string;
    secretAccessKey: string;
}
export declare class CpuInfo {
    brand: string;
    cores: number;
    speed: string;
}
export declare class Memory {
    free: string;
    total: string;
}
export declare class NodeOs {
    uptime: string;
}
export declare class Bandwidth {
    upload: Speed;
    download: Speed;
}
declare class Speed {
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
export declare class ColibriStats {
    shutdownState: string;
    drain: string;
    time: number;
    'load-management': ILoadManagement;
    'overall_bridge_jitter': number;
    conferences: any;
    health: string;
}
export declare class NodeRegsiterDto {
    nodeId: string;
    userId: string;
}
export declare class NodeDataDto {
    nodeId: string;
    cpu: CpuInfo;
    agentVersion: string;
    region: string;
    nodeOs: NodeOs;
    memory: Memory;
    bandwidth: Bandwidth;
    ip: string;
    ipV4RemoteLogin: string;
    colibriStats: ColibriStats;
    traffic: number;
    numberOfConferences: number;
    ownerId: string;
    requestIp?: string;
    country: string;
}
export declare class NodeStatusDto {
    timestamp?: string;
    status: NodeStatus;
    nodeId: string;
}
export declare enum NodeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare const nodeKeys: string[];
export declare enum NodeState {
    Active = "Active",
    Inactive = "Inactive",
    Disabled = "Disabled"
}
export {};
