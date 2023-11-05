import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginType {
  id: string;
  walletAddress: string;
}

export class RoomLoginType {
  id: string;
  isModerator: boolean;
}

export class AvatarDto {
  address: string;

  @IsString()
  @IsNotEmpty()
  tokenId: string;
}
