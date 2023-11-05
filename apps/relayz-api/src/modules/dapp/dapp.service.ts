import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DAppService {
  filePath = 'src/misc/dapp/docker-compose.yml';

  imageBuffer() {
    return readFileSync(join(process.cwd(), this.filePath));
  }

  imageStream() {
    return createReadStream(join(process.cwd(), this.filePath));
  }

  fileBuffer() {
    return readFileSync(join(process.cwd(), this.filePath));
  }

  fileStream() {
    return createReadStream(join(process.cwd(), this.filePath));
  }
}
