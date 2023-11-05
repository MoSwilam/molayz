import { CliLibService } from './cli-lib.service';
export declare class CliLibController {
    private readonly cliLibService;
    constructor(cliLibService: CliLibService);
    getNodes(): Promise<any>;
    getNode(nodeId: string): Promise<never>;
}
