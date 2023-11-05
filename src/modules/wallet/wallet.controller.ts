import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WalletDto } from '../auth/auth.types';
import { AuthDecorators } from '../../shared/decorators/compose.decorators';

@ApiTags('Wallets')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create new wallet' })
  @AuthDecorators()
  create(@Body() createWalletDto: WalletDto) {
    return this.walletService.getOrCreateWallet(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit the number of wallets returned' })
  @ApiQuery({ name: 'skip', required: false, description: 'Skip the first n wallets' })
  @AuthDecorators()
  getAllWallets(@Query() { limit, skip }) {
    return this.walletService.getAllWallets(limit, skip);
  }

  @Get('/connected')
  @ApiOperation({ summary: 'Get all connected wallets' })
  @AuthDecorators()
  getConnectedWallets() {
    return this.walletService.getConnectedWallets();
  }

  @Get('/ephemeral')
  @ApiOperation({ summary: 'Get all ephemeral wallets' })
  @AuthDecorators()
  getEphemeralWallets() {
    return this.walletService.getEhemeralWallets();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get wallet by id' })
  @AuthDecorators()
  getWalletById(@Param('id') walletId: string) {
    return this.walletService.findById(walletId);
  }
}
