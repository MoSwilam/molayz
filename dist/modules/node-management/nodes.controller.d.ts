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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { NodeDataDto } from './nodes.types';
import { NodeService } from './nodes.service';
import { Request } from 'express';
export declare class NodesController {
    private readonly nodesryService;
    constructor(nodesryService: NodeService);
    create(telemetryData: NodeDataDto, request: Request): Promise<import("./nodes.schema").NodesDocument>;
    logNodeStatus(nodeId: string, accountId: string): Promise<import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getNodesByOwnerId(id: string): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findAll(): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getNodeByAgentId(id: string): Promise<import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOnwerNodesByOwnerId(id: string): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    testUpdateSpeed(): Promise<any>;
    activateNode(nodeId: string): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deactivateNode(nodeId: string, user: any): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    disableNode(nodeId: string, user: any): Promise<(import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    speed(payload: any): Promise<import("./nodes.schema").NodeEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStateInSmartContract(): Promise<{
        deactivateNodes: number;
        activateNodes: number;
    }>;
    updateRegionInSmartContract(): Promise<import("mongodb").UpdateResult>;
    deleteNodesByOwnerId(ownerId: string): Promise<import("mongodb").DeleteResult>;
}
