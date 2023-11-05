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
import { UserDocument, UserEntity } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, LoginAgentDto, OldUserDto } from './../auth/auth.types';
import { WalletDocument } from '../wallet/wallet.schema';
import { AvatarDto } from './user.types';
import { WalletService } from '../wallet/wallet.service';
import { NodeService } from '../node-management/nodes.service';
export declare class UserService {
    private userModel;
    private walletService;
    private nodesService;
    constructor(userModel: Model<UserDocument>, walletService: WalletService, nodesService: NodeService);
    getUserByIdOrThrowError(id: any): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    CreateUserAgent(payload: LoginAgentDto): Promise<UserDocument>;
    getUserByNodeId(nodeId: string): Promise<boolean>;
    getUserByNickname(nickName: string): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrCreateUser(payload: CreateUserDto): Promise<UserDocument>;
    getUserByAccountId(accountId: string): Promise<boolean>;
    getUserByAccountIdTemp(accountId: string): Promise<import("../node-management/nodes.schema").NodesDocument>;
    oldCreate(payload: OldUserDto): Promise<UserDocument>;
    setMainAddress(): Promise<any[]>;
    findUserByAccountId(accountId: string): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setAvatar(avatar: AvatarDto): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addWalletToUser(user: UserDocument, wallet: WalletDocument): Promise<void>;
    findAll(): Promise<Omit<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findById(userId: any): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByLoginAccId(loginAccId: string): Promise<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllUsersReferredByLoginAccountId(loginAccId: string): Promise<(UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
