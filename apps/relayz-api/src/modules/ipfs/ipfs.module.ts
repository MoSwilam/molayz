import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { HttpClientModule } from '../../shared/http/http.module';

@Module({
  imports: [HttpClientModule],
  controllers: [IpfsController],
  providers: [IpfsService]
})
export class IpfsModule {}
