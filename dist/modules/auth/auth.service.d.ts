import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginAgentDto, LoginDto, MetamaskReferralLoginDto, NearReferralLoginDto } from './auth.types';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { ConfigService } from '@nestjs/config';
import { NodeService } from '../node-management/nodes.service';
export declare class AuthService {
    private readonly jwtService;
    private configService;
    private userService;
    private walletService;
    private nodeService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UserService, walletService: WalletService, nodeService: NodeService);
    private nearService;
    login(payload: LoginDto): Promise<{
        token: string;
        redirectionUrl: string;
    }>;
    loginAgent(payload: LoginAgentDto): Promise<{
        token: string;
    }>;
    generateJwtToken(payload: JwtPayload): string;
    connectToNear(): Promise<import("near-api-js").Near>;
    nearLogin(payload: NearReferralLoginDto): Promise<{
        token: string;
        userId: any;
    }>;
    getNearValidKeys(nearWalletId: string, publicKey: string): Promise<import("near-api-js/lib/providers/provider").AccessKeyInfoView>;
    metamaskLogin(payload: MetamaskReferralLoginDto): Promise<{
        token: string;
        userId: any;
    }>;
}
