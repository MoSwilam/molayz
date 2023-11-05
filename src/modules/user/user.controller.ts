import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../auth/auth.types';
import { AvatarDto } from './user.types';
import { AuthDecorators } from 'src/shared/decorators/compose.decorators';

@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register user' })
  // @AuthDecorators()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.getOrCreateUser(userDto);
  }

  @Post('/avatar/add')
  @ApiOperation({ summary: 'Add avatar' })
  // @AuthDecorators()
  setAvatar(@Body() avatar: AvatarDto) {
    return this.userService.setAvatar(avatar);
  }

  @Get()
  // @AuthDecorators()
  findAll() {
    return this.userService.setMainAddress();
  }

  @Get('/:id')
  @AuthDecorators()
  async getById(@Param('id') userId: string) {
    return await this.userService.findById(userId);
  }

  @Get('/login/account')
  @AuthDecorators()
  async getByLoginAccountId(@Body('loginAccountId') loginAccId: string) {
    return await this.userService.findByLoginAccId(loginAccId);
  }

  @Get('referrals/:loginAcccId')
  // @AuthDecorators()
  async getAllUsersReferredByLoginAccountId(@Param('loginAcccId') loginAcccId: string) {
    return await this.userService.getAllUsersReferredByLoginAccountId(loginAcccId);
  }
}
