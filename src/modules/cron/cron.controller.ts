import { Controller, Get } from '@nestjs/common';
import { CronService } from './cron.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  // @Cron(CronExpression.EVERY_HOUR, { name: 'update-bandwidth' })
  @Get('/update-bandwidth')
  async updateBandwidth() {
    return await this.cronService.updateBandwidth();
  }

  @Get('/update-traffic')
  async updateTraffic() {
    return await this.cronService.updateTraffic();
  }
}
