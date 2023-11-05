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
import { WalletDto } from '../auth/auth.types';
import { Model } from 'mongoose';
import { WalletDocument, WalletEntity } from './wallet.schema';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<WalletDocument>);
    getAllWallets(limit: number, skip: number): Promise<(WalletEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getOrCreateWallet(payload: WalletDto): Promise<WalletDocument>;
    getWalletByAddressOrThrow(address: string): Promise<WalletEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(walletId: any): Promise<WalletEntity & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getConnectedWallets(): Promise<{
        wallets: (WalletEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    getEhemeralWallets(): Promise<{
        wallets: (WalletEntity & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
}
