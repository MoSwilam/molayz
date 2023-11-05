import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAgentDto,
  LoginDto,
  NearReferralLoginDto,
  MetamaskReferralLoginDto
} from './auth.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/agent/login')
  authenticateAgent(@Body() loginDto: LoginAgentDto) {
    return this.authService.loginAgent(loginDto);
  }

  @Post('/referral/near/login')
  appLogin(@Body() loginDto: NearReferralLoginDto) {
    return this.authService.nearLogin(loginDto);
  }

  @Post('/referral/metamask/login')
  nearLogin(@Body() loginDto: MetamaskReferralLoginDto) {
    return this.authService.metamaskLogin(loginDto);
  }
}
