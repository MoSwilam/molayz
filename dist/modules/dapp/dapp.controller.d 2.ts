import { DAppService } from './dapp.service';
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
export declare class DAppController {
    private readonly dappService;
    constructor(dappService: DAppService);
    buffer(response: Response): void;
    stream(response: Response): void;
    streamable(): StreamableFile;
}
