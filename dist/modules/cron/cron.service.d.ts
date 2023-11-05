import { NodeService } from '../node-management/nodes.service';
export declare class CronService {
    private nodeService;
    private isCronRunning;
    constructor(nodeService: NodeService);
    updateBandwidth(): Promise<void>;
    updateTraffic(): Promise<void>;
    updateState(): Promise<void>;
}
