import { Injectable, NotFoundException } from '@nestjs/common';
import { Near, KeyPair, keyStores, ConnectConfig, Contract, connect, Account } from 'near-api-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ENV } from './constants';
import { ClientLibCredsFilePath, ContracttIdEnv } from './types';

@Injectable()
export class NearService {
  private static instance: NearService;
  private near: Near;
  private account: Account;
  public contractId: string;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): NearService {
    if (!NearService.instance) {
      NearService.instance = new NearService();
    }
    return NearService.instance;
  }

  private async initialize() {
    this.near = await this.setupNear();
    this.account = await this.near.account(this.getCredentials().secrets.account_id);
  }

  private async setupNear(): Promise<Near> {
    const env = process.env.NODE_ENV;
    console.log(`Using smart contract on env: ${env}`);

    const { secrets, credentials } = this.getCredentials();

    // Configure o keyStore com suas credenciais
    const myKeyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(secrets.private_key);
    myKeyStore.setKey('testnet', secrets.account_id, keyPair);

    // Configure o Near com suas próprias configurações
    const nearConfig: ConnectConfig = {
      keyStore: myKeyStore,
      networkId: 'testnet', // ou 'mainnet' dependendo da rede que você está usando
      nodeUrl: 'https://rpc.testnet.near.org', // substitua pela URL da sua rede
      walletUrl: 'https://wallet.testnet.near.org', // substitua pela URL da sua carteira
      helperUrl: 'https://helper.testnet.near.org' // substitua pela URL do helper
    };
    return await connect(nearConfig);
  }

  public getCredentials() {
    let credsFilePath: string;
    const env = process.env.NODE_ENV;
    switch (env) {
      case ENV.local:
      case ENV.debug:
      case ENV.development:
        credsFilePath = ClientLibCredsFilePath.development;
        this.contractId = ContracttIdEnv.development;
        break;
      case ENV.production:
        credsFilePath = ClientLibCredsFilePath.production;
        this.contractId = ContracttIdEnv.production;
        break;
      case ENV.staging:
        credsFilePath = ClientLibCredsFilePath.staging;
        this.contractId = ContracttIdEnv.staging;
        break;
      default:
        throw new NotFoundException(
          'Invalid environment, please check your NODE_ENV variable, it should be one of: dev, prd, stg, local, debug'
        );
    }

    const path = join(process.cwd(), credsFilePath);
    const creds = readFileSync(path, { encoding: 'utf8' });
    const secrets = JSON.parse(creds);
    const credentials = KeyPair.fromString(secrets.private_key);
    return { secrets, credentials };
  }
  public getContract(): any {
    return new Contract(this.account, this.contractId, {
      // eslint-disable-next-line prettier/prettier
      changeMethods: ['update_nodes_speed', 'update_nodes_traffic', 'deactivate_nodes', 'activate_nodes', 'initialize_node', 'delete_all_nodes' ], // Métodos que mudam o estado
      viewMethods: ['all_nodes'] // Métodos que apenas visualizam o estado
    });
  }
}
