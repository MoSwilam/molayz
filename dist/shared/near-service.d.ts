import { KeyPair } from 'near-api-js';
export declare class NearService {
    private static instance;
    private near;
    private account;
    contractId: string;
    private constructor();
    static getInstance(): NearService;
    private initialize;
    private setupNear;
    getCredentials(): {
        secrets: any;
        credentials: KeyPair;
    };
    getContract(): any;
}
