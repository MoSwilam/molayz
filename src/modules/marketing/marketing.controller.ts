import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { GetMarketingByIdAndSecret, MarketingDto } from './marketing.types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Marketing')
@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Post()
  create(@Body() createMarketingDto: MarketingDto) {
    return this.marketingService.create(createMarketingDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string, @Query('secret') secret: string) {
    const payload: GetMarketingByIdAndSecret = { id, secret };
    return this.marketingService.getMarketingCampaign(payload);
  }
}
