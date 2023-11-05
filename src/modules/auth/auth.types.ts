import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiHideProperty()
  name?: string;

  @ApiHideProperty()
  referredBy?: string;

  @ApiHideProperty()
  publicKey?: string;

  accountId: string;

  @ApiHideProperty()
  loginType?: string;
}

export class WalletDto {
  address: string;
  chain: string;
  network: string;
  name: string;
}

export class OldUserDto {
  displayName: string;
  roomName: string;
}

export class LoginDto {
  user: OldUserDto; // TO BE DELETED
  wallet: WalletDto;
}

export class NearReferralLoginDto {
  name?: string; // name of the new user to login
  // email: string; // email of the new user to login
  @IsString()
  @IsNotEmpty()
  nearWalletId: string; // account id of the new user to login

  @IsString()
  @IsNotEmpty()
  publicKey: string; // public key of the referrer to validate

  @IsString()
  referredBy: string; // account id of the referrer

  @IsString()
  @IsNotEmpty()
  loginType: string;
}

export class MetamaskReferralLoginDto {
  name?: string; // name of the new user to login

  @MinLength(42)
  metamaskAddress: string;

  @IsString()
  referredBy: string;

  @IsString()
  @IsNotEmpty()
  loginType: string;
}

export class LoginAgentDto {
  accountId: string;
  nodeId: string;
  accountSecret?: string;
}

export class JwtPayload {
  iss: string;
  aud: string;
  sub: string;
  room: string;
  exp: string;
  context: Context;
}

export class JwtAgentPayload {
  userId?: string;
  nodeOwnerId: string;
  nodeId: string;
  exp: number;
}

export class Context {
  user: UserJwt;
}

export class UserJwt {
  id: string;
  name: string;
}
