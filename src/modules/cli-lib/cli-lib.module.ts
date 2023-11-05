import { Module } from '@nestjs/common';
import { CliLibService } from './cli-lib.service';
import { CliLibController } from './cli-lib.controller';

@Module({
  controllers: [CliLibController],
  providers: [CliLibService],
  exports: [CliLibService]
})
export class CliLibModule {}
