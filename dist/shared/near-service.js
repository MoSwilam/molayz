"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NearService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearService = void 0;
const common_1 = require("@nestjs/common");
const near_api_js_1 = require("near-api-js");
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("./constants");
const types_1 = require("./types");
let NearService = NearService_1 = class NearService {
    constructor() {
        this.initialize();
    }
    static getInstance() {
        if (!NearService_1.instance) {
            NearService_1.instance = new NearService_1();
        }
        return NearService_1.instance;
    }
    async initialize() {
        this.near = await this.setupNear();
        this.account = await this.near.account(this.getCredentials().secrets.account_id);
    }
    async setupNear() {
        const env = process.env.NODE_ENV;
        console.log(`Using smart contract on env: ${env}`);
        const { secrets, credentials } = this.getCredentials();
        const myKeyStore = new near_api_js_1.keyStores.InMemoryKeyStore();
        const keyPair = near_api_js_1.KeyPair.fromString(secrets.private_key);
        myKeyStore.setKey('testnet', secrets.account_id, keyPair);
        const nearConfig = {
            keyStore: myKeyStore,
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org'
        };
        return await (0, near_api_js_1.connect)(nearConfig);
    }
    getCredentials() {
        let credsFilePath;
        const env = process.env.NODE_ENV;
        switch (env) {
            case constants_1.ENV.local:
            case constants_1.ENV.debug:
            case constants_1.ENV.development:
                credsFilePath = types_1.ClientLibCredsFilePath.development;
                this.contractId = types_1.ContracttIdEnv.development;
                break;
            case constants_1.ENV.production:
                credsFilePath = types_1.ClientLibCredsFilePath.production;
                this.contractId = types_1.ContracttIdEnv.production;
                break;
            case constants_1.ENV.staging:
                credsFilePath = types_1.ClientLibCredsFilePath.staging;
                this.contractId = types_1.ContracttIdEnv.staging;
                break;
            default:
                throw new common_1.NotFoundException('Invalid environment, please check your NODE_ENV variable, it should be one of: dev, prd, stg, local, debug');
        }
        const path = (0, path_1.join)(process.cwd(), credsFilePath);
        const creds = (0, fs_1.readFileSync)(path, { encoding: 'utf8' });
        const secrets = JSON.parse(creds);
        const credentials = near_api_js_1.KeyPair.fromString(secrets.private_key);
        return { secrets, credentials };
    }
    getContract() {
        return new near_api_js_1.Contract(this.account, this.contractId, {
            changeMethods: ['update_nodes_speed', 'update_nodes_traffic', 'deactivate_nodes', 'activate_nodes', 'initialize_node', 'delete_all_nodes'],
            viewMethods: ['all_nodes']
        });
    }
};
NearService = NearService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NearService);
exports.NearService = NearService;
//# sourceMappingURL=near-service.js.map