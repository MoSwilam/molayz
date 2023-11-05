import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { NodesModule } from '../node-management/nodes.module';

@Module({
  imports: [NodesModule],
  controllers: [CronController],
  providers: [CronService]
})
export class CronModule {}
