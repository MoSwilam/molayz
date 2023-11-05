import { HttpClientService } from 'src/shared/http/http.service';
export declare class IpfsService {
    private readonly httpsService;
    private apiKey;
    private apiSecret;
    constructor(httpsService: HttpClientService);
    getHeaders(): {
        authorization: string;
        'Content-Type': string;
    };
    sendTelemetryData(): Promise<any>;
}
