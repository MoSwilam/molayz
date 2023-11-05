import { AuthService } from './auth.service';
import { LoginAgentDto, LoginDto, NearReferralLoginDto, MetamaskReferralLoginDto } from './auth.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(loginDto: LoginDto): Promise<{
        token: string;
        redirectionUrl: string;
    }>;
    authenticateAgent(loginDto: LoginAgentDto): Promise<{
        token: string;
    }>;
    appLogin(loginDto: NearReferralLoginDto): Promise<{
        token: string;
        userId: any;
    }>;
    nearLogin(loginDto: MetamaskReferralLoginDto): Promise<{
        token: string;
        userId: any;
    }>;
}
