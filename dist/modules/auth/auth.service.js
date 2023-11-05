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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const wallet_service_1 = require("../wallet/wallet.service");
const config_1 = require("@nestjs/config");
const near_service_1 = require("../../shared/near-service");
const nodes_service_1 = require("../node-management/nodes.service");
const near_api_js_1 = require("near-api-js");
let AuthService = class AuthService {
    constructor(jwtService, configService, userService, walletService, nodeService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
        this.walletService = walletService;
        this.nodeService = nodeService;
        this.nearService = near_service_1.NearService.getInstance();
    }
    async login(payload) {
        const { user: { displayName, roomName }, user, wallet } = payload;
        const savedUser = await this.userService.oldCreate(user);
        const savedWallet = await this.walletService.getOrCreateWallet(wallet);
        await this.userService.addWalletToUser(savedUser, savedWallet);
        const jwtConfig = this.configService.get('jwt');
        const { videoPath } = this.configService.get('relayz');
        const today = new Date();
        const expiry = today.setDate(today.getDate() + jwtConfig.exp);
        const jwtContext = {
            user: { id: savedUser.id, name: displayName || 'Relayz User' }
        };
        const jwtPayload = Object.assign(Object.assign({}, jwtConfig), { exp: expiry, context: jwtContext });
        const token = this.generateJwtToken(jwtPayload);
        const redirectionUrl = `https://${videoPath}/${roomName}?jwt=${token}`;
        return { token, redirectionUrl };
    }
    async loginAgent(payload) {
        const { accountId, nodeId } = payload;
        const existingNode = await this.userService.getUserByAccountIdTemp(accountId);
        if (!existingNode) {
            throw new common_1.BadRequestException(`Node Registration is temporarily disabled`);
        }
        const agentSecret = this.configService.get('agentSecret');
        const exp = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30;
        const jwtPayload = {
            nodeOwnerId: existingNode.id,
            nodeId,
            exp
        };
        const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
        return { token };
    }
    generateJwtToken(payload) {
        const secret = this.configService.get('jitsiSecret');
        return this.jwtService.sign(payload, { secret });
    }
    async connectToNear() {
        const creds = this.nearService.getCredentials();
        const { private_key, account_id } = creds.secrets;
        const myKeyStore = new near_api_js_1.keyStores.InMemoryKeyStore();
        const keyPair = near_api_js_1.KeyPair.fromString(private_key);
        await myKeyStore.setKey('testnet', account_id, keyPair);
        const connectionConfig = {
            networkId: 'testnet',
            keyStore: myKeyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org'
        };
        return await (0, near_api_js_1.connect)(connectionConfig);
    }
    async nearLogin(payload) {
        const agentSecret = this.configService.get('agentSecret');
        const { name, publicKey, referredBy, nearWalletId, loginType } = payload;
        if (referredBy) {
            const referrerAsNodeOwner = await this.nodeService.getNodesByOwnerId(referredBy);
            const referrerAsUser = await this.userService.getUserByAccountId(referredBy);
            if (!referrerAsNodeOwner && !referrerAsUser) {
                throw new common_1.NotFoundException(`Referrer with account Id: ${referredBy} not found`);
            }
        }
        const contractId = this.nearService.contractId;
        const nearValidKeys = await this.getNearValidKeys(nearWalletId, publicKey);
        if (!nearValidKeys) {
            throw new common_1.BadRequestException(`No valid key found for public key: ${publicKey} and receiver_id: ${contractId}`);
        }
        const loginDto = {
            name,
            referredBy,
            accountId: nearWalletId,
            publicKey,
            loginType,
            relayzContractId: contractId
        };
        const user = await this.userService.getOrCreateUser(loginDto);
        const { id: userId } = user;
        const jwtPayload = {
            userId,
            accountId: nearWalletId,
            publicKey,
            validKey: nearValidKeys,
            exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30
        };
        const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
        return { token, userId };
    }
    async getNearValidKeys(nearWalletId, publicKey) {
        const nearConnection = await this.connectToNear();
        const account = await nearConnection.account(nearWalletId);
        if (!account) {
            throw new common_1.NotFoundException(`Account with id: ${nearWalletId} not found`);
        }
        const accessKeys = await account.getAccessKeys();
        const contractId = this.nearService.contractId;
        let receiverId;
        const validKey = accessKeys.find((key) => {
            return (key.public_key === publicKey &&
                key.access_key.permission &&
                key.access_key.permission.FunctionCall);
        });
        console.log({ contractId, validKey, publicKey, account, receiverId });
        return validKey;
    }
    async metamaskLogin(payload) {
        const agentSecret = this.configService.get('agentSecret');
        const { name, referredBy, metamaskAddress, loginType } = payload;
        if (referredBy) {
            const referrerAsNodeOwner = await this.nodeService.getNodesByOwnerId(referredBy);
            const referrerAsUser = await this.userService.getUserByAccountId(referredBy);
            if (!referrerAsNodeOwner && !referrerAsUser) {
                throw new common_1.NotFoundException(`Referrer with account Id: ${referredBy} not found`);
            }
        }
        if (metamaskAddress.length != 42)
            throw new common_1.BadRequestException(`Invalid metamask address, length should be 42 characters, received: ${metamaskAddress.length}`);
        const loginDto = { name, referredBy, accountId: metamaskAddress, loginType };
        const user = await this.userService.getOrCreateUser(loginDto);
        const { id: userId } = user;
        const jwtPayload = {
            userId,
            accountId: metamaskAddress,
            exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30
        };
        const token = this.jwtService.sign(jwtPayload, { secret: agentSecret });
        return { token, userId };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService,
        wallet_service_1.WalletService,
        nodes_service_1.NodeService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map