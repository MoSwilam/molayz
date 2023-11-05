/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { Bandwidth, ColibriStats, CpuInfo, Memory, NodeOs, NodeState } from './nodes.types';
export declare type NodesDocument = NodeEntity & Document;
export declare class NodeEntity {
    nodeId: string;
    userId: string;
    ip: string;
    ipV4RemoteLogin: string;
    cpu: CpuInfo;
    memory: Memory;
    nodeOs: NodeOs;
    colibriStats: ColibriStats;
    bandwidth: Bandwidth;
    bandwidthLastUpdatedAt: Date;
    agentVersion: string;
    lastActiveStatusUpdate: Date;
    traffic: string;
    state: NodeState;
    ownerId: string;
    numberOfConferences: number;
    region: string;
    country: string;
    osVersion: string;
}
export declare const NodesSchema: import("mongoose").Schema<NodeEntity, import("mongoose").Model<NodeEntity, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NodeEntity>;
