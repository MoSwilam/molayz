import { DAppService } from './dapp.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';

@ApiTags('DApp')
@Controller('DApp')
export class DAppController {
  constructor(private readonly dappService: DAppService) {}

  @Get('buffer')
  // @AuthDecorators()
  buffer(@Res() response: Response) {
    const file = this.dappService.imageBuffer();
    response.send(file);
  }

  @Get('stream')
  // @AuthDecorators()
  stream(@Res() response: Response) {
    const file = this.dappService.imageStream();
    file.pipe(response);
  }

  @Get('streamable')
  // @AuthDecorators()
  streamable() {
    const file = this.dappService.fileStream();
    // or
    // const file = this.dappService.fileBuffer();
    return new StreamableFile(file); // 👈 supports Buffer and Stream
  }
}
