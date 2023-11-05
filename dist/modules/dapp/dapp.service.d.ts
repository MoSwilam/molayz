/// <reference types="node" />
/// <reference types="node" />
export declare class DAppService {
    filePath: string;
    imageBuffer(): Buffer;
    imageStream(): import("fs").ReadStream;
    fileBuffer(): Buffer;
    fileStream(): import("fs").ReadStream;
}
