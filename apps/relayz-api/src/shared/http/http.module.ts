import { Module } from '@nestjs/common';
import { HttpClientService } from './http.service';
import { HttpModule } from '@nestjs/axios';

enum HTTP_MODULE {
  TIMEOUT = 5000,
  MAX_REDIRECTS = 5
}

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_MODULE.TIMEOUT,
      maxRedirects: HTTP_MODULE.MAX_REDIRECTS
    })
  ],
  providers: [HttpClientService],
  exports: [HttpClientService]
})
export class HttpClientModule {}
