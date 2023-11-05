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
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../user/user.schema';
import { WalletDocument } from '../wallet/wallet.schema';
import { InsertManyDto } from './history.types';
export declare class HistoryService {
    private userService;
    private userModel;
    private walletModel;
    constructor(userService: UserService, userModel: Model<UserDocument>, walletModel: Model<WalletDocument>);
    findAll(): Promise<Omit<UserEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    insertMany(payload: any): Promise<number>;
    insertManyWallets(payload: InsertManyDto): Promise<{
        existingEphemerals: number;
        toBeInserted: number;
        sent: number;
        insertionResult: number;
    }>;
}
