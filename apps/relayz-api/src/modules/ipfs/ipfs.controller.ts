import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IpfsService } from './ipfs.service';

@ApiTags('Ipfs')
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post()
  async sendTelemetryData() {
    return this.ipfsService.sendTelemetryData();
  }
}
