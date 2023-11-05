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
import { WalletEntity } from '../wallet/wallet.schema';
import { AvatarDto } from './user.types';
export declare type UserDocument = UserEntity & Document;
export declare class UserEntity {
    displayName: string;
    publicKey: string;
    referredBy: string;
    accountId: string;
    mainAddress: string;
    metamaskWalletId: string;
    nearWalletId: string;
    relayzContractId: string;
    avatar: AvatarDto;
    userAgent: string;
    description: string;
    ip: string;
    nodeId: string;
    nodeDbId: string;
    wallets: WalletEntity[];
    loginType: string;
}
export declare const UserSchema: import("mongoose").Schema<UserEntity, import("mongoose").Model<UserEntity, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserEntity>;