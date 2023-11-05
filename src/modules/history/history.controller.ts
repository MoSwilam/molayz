import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorators } from '../../shared/decorators/compose.decorators';
import { InsertManyDto } from './history.types';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @AuthDecorators()
  findAll() {
    return this.historyService.findAll();
  }

  @Post('/insertMany')
  insertManyHistory(@Body() payload: InsertManyDto) {
    return this.historyService.insertManyWallets(payload);
  }
}
