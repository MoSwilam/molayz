import { NodeDataDto } from '../modules/node-management/nodes.types';
export declare class Utils {
    static getEntriesFromObjByArrayOfKeys(arr: string[], obj: any): NodeDataDto;
    IsDebug(): boolean;
    getEnv(): string;
    isFileExist(path: string): string;
    static getHttpOptions(): {
        key: string;
        cert: string;
    };
}
