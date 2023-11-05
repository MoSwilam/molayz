import { HttpService } from '@nestjs/axios';
import { IRequestPayload } from '../constants';
export declare class HttpClientService {
    private httpsService;
    constructor(httpsService: HttpService);
    request(payload: IRequestPayload): Promise<any>;
}
