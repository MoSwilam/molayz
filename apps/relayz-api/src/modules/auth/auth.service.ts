import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JwtAgentPayload,
  JwtPayload,
  LoginAgentDto,
  LoginDto,
  MetamaskReferralLoginDto,
  NearReferralLoginDto
} from './auth.types';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { ConfigService } from '@nestjs/config';
import { NearService } from '../../shared/near-service'; // Substitua pelo caminho correto
import { NodeService } from '../node-management/nodes.service';
import { FunctionCallPermissionView } from 'near-api-js/lib/providers/provider';
import { KeyPair, keyStores, connect } from 'near-api-js'; // Importe KeyPair e NearConfig corretamente

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private walletService: WalletService,
    private nodeService: NodeService
  ) {}

  private nearService = NearService.getInstance();

  async login(payload: LoginDto) {
    const {
      user: { displayName, roomName },
      user,
      wallet
    } = payload;

    const savedUser = await this.userService.oldCreate(user);
    const savedWallet = await this.walletService.getOrCreateWallet(wallet);

    await this.userService.addWalletToUser(savedUser, savedWallet);

    /** compose JWT payload */
    const jwtConfig = this.configService.get('jwt');
    const { videoPath } = this.configService.get('relayz');

    const today = new Date();
    const expiry = today.setDate(today.getDate() + jwtConfig.exp);

    /**
     * wallet => network ( near, metamask )
     * walletId => walletAddress ( 0X34djsahshs )
     *
     * */
    const jwtContext = {
      user: { id: savedUser.id, name: displayName || 'Relayz User' }
    };

    const jwtPayload: JwtPayload = {
      ...jwtConfig,
      exp: expiry,
      context: jwtContext
    };

    const token = this.generateJwtToken(jwtPayload);
    const redirectionUrl = `https://${videoPath}/${roomName}?jwt=${token}`;
    return { token, redirectionUrl };
  }

  async loginAgent(payload: LoginAgentDto) {
    const { accountId, nodeId } = payload;
    const existingNode = await this.userService.getUserByAccountIdTemp(accountId);

    if (!existingNode) {
      throw new BadRequestException(`Node Registration is temporarily disabled`);
      //const newUser = await this.userService.CreateUserAgent(payload);
    }

    const agentSecret = this.configService.get('agentSecret');
    const exp = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30; // 30 years

    const jwtPayload: JwtAgentPayload = {
      nodeOwnerId: existingNode.id,
      nodeId,
      exp
    };

    const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
    return { token };
  }

  generateJwtToken(payload: JwtPayload): string {
    const secret = this.configService.get('jitsiSecret');
    /**
     * The value of the secret below should match the one in Prosody configuration file
     * */
    return this.jwtService.sign(payload, { secret });
  }

  async connectToNear() {
    // creates keyStore from a private key string
    // you can define your key here or use an environment variable

    const creds = this.nearService.getCredentials();
    const { private_key, account_id } = creds.secrets;

    const myKeyStore = new keyStores.InMemoryKeyStore();

    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(private_key);
    // adds the keyPair you created to keyStore
    await myKeyStore.setKey('testnet', account_id, keyPair);

    const connectionConfig = {
      networkId: 'testnet',
      keyStore: myKeyStore,
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org'
    };

    return await connect(connectionConfig);
  }

  async nearLogin(payload: NearReferralLoginDto) {
    const agentSecret = this.configService.get('agentSecret');
    const { name, publicKey, referredBy, nearWalletId, loginType } = payload;

    if (referredBy) {
      const referrerAsNodeOwner = await this.nodeService.getNodesByOwnerId(referredBy);
      const referrerAsUser = await this.userService.getUserByAccountId(referredBy);
      if (!referrerAsNodeOwner && !referrerAsUser) {
        throw new NotFoundException(`Referrer with account Id: ${referredBy} not found`);
      }
    }

    const contractId = this.nearService.contractId;
    const nearValidKeys = await this.getNearValidKeys(nearWalletId, publicKey);
    // console.log({ nearValidKeys });

    if (!nearValidKeys) {
      throw new BadRequestException(
        `No valid key found for public key: ${publicKey} and receiver_id: ${contractId}`
      );
    }

    const loginDto = {
      name,
      referredBy,
      accountId: nearWalletId,
      publicKey,
      loginType,
      relayzContractId: contractId
    };
    // console.log({ loginDto })
    const user = await this.userService.getOrCreateUser(loginDto);
    const { id: userId } = user;

    const jwtPayload = {
      userId,
      accountId: nearWalletId,
      publicKey,
      validKey: nearValidKeys,
      exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30 // 30 years
    };
    const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
    return { token, userId };
  }

  async getNearValidKeys(nearWalletId: string, publicKey: string) {
    // Validation of NEAR wallet
    // Connect to the NEAR network
    const nearConnection = await this.connectToNear();

    // Get the user's account based on loginAccountId
    const account = await nearConnection.account(nearWalletId);

    // Check if the user account exists
    if (!account) {
      throw new NotFoundException(`Account with id: ${nearWalletId} not found`);
    }

    // Get the list of access keys for the account
    const accessKeys = await account.getAccessKeys();

    // Public key to be verified
    const contractId = this.nearService.contractId;
    // const contractKey = 'relayz-api.testnet';

    let receiverId;

    // Check if there is a key in the accessKeys list for the contract `contractKey`
    const validKey = accessKeys.find((key) => {
      return (
        key.public_key === publicKey &&
        (key.access_key.permission as FunctionCallPermissionView) &&
        (key.access_key.permission as FunctionCallPermissionView).FunctionCall
      );
      // && (key.access_key.permission as FunctionCallPermissionView).FunctionCall.receiver_id ===
      //   contractKey
    });

    console.log({ contractId, validKey, publicKey, account, receiverId });
    return validKey;
  }

  async metamaskLogin(payload: MetamaskReferralLoginDto) {
    const agentSecret = this.configService.get('agentSecret');
    const { name, referredBy, metamaskAddress, loginType } = payload;

    if (referredBy) {
      const referrerAsNodeOwner = await this.nodeService.getNodesByOwnerId(referredBy);
      const referrerAsUser = await this.userService.getUserByAccountId(referredBy);
      if (!referrerAsNodeOwner && !referrerAsUser) {
        throw new NotFoundException(`Referrer with account Id: ${referredBy} not found`);
      }
    }

    if (metamaskAddress.length != 42)
      throw new BadRequestException(
        `Invalid metamask address, length should be 42 characters, received: ${metamaskAddress.length}`
      );
    // TODO: add proper validation to metamask address
    // integrate web3 lib -> https://www.npmjs.com/package/web3

    const loginDto = { name, referredBy, accountId: metamaskAddress, loginType };
    const user = await this.userService.getOrCreateUser(loginDto);
    const { id: userId } = user;

    const jwtPayload = {
      userId,
      accountId: metamaskAddress,
      exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30 // 30 years
    };
    const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
    return { token, userId };
  }
}
