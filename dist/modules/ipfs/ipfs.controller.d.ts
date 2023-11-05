import { IpfsService } from './ipfs.service';
export declare class IpfsController {
    private readonly ipfsService;
    constructor(ipfsService: IpfsService);
    sendTelemetryData(): Promise<any>;
}
