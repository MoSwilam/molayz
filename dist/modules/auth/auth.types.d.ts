export declare class CreateUserDto {
    name?: string;
    referredBy?: string;
    publicKey?: string;
    accountId: string;
    loginType?: string;
}
export declare class WalletDto {
    address: string;
    chain: string;
    network: string;
    name: string;
}
export declare class OldUserDto {
    displayName: string;
    roomName: string;
}
export declare class LoginDto {
    user: OldUserDto;
    wallet: WalletDto;
}
export declare class NearReferralLoginDto {
    name?: string;
    nearWalletId: string;
    publicKey: string;
    referredBy: string;
    loginType: string;
}
export declare class MetamaskReferralLoginDto {
    name?: string;
    metamaskAddress: string;
    referredBy: string;
    loginType: string;
}
export declare class LoginAgentDto {
    accountId: string;
    nodeId: string;
    accountSecret?: string;
}
export declare class JwtPayload {
    iss: string;
    aud: string;
    sub: string;
    room: string;
    exp: string;
    context: Context;
}
export declare class JwtAgentPayload {
    userId?: string;
    nodeOwnerId: string;
    nodeId: string;
    exp: number;
}
export declare class Context {
    user: UserJwt;
}
export declare class UserJwt {
    id: string;
    name: string;
}
