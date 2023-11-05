import { Module } from '@nestjs/common';
import { DAppController } from './dapp.controller';
import { DAppService } from './dapp.service';

@Module({
  controllers: [DAppController],
  providers: [DAppService],
  exports: [DAppService]
})
export class DAppModule {}
