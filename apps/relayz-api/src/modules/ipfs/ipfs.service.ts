import { BadRequestException, Injectable } from '@nestjs/common';
import { IpfsBaseUrl } from './ipfs.types';
import FormData = require('form-data');
import fs from 'fs';
import { HttpClientService } from '../../shared/http/http.service';
import { HttpMethod, IRequestPayload } from '../../shared/constants';

@Injectable()
export class IpfsService {
  private apiKey = process.env.INFURA_API_KEY;
  private apiSecret = process.env.INFURA_API_SECRET;

  constructor(private readonly httpsService: HttpClientService) {}

  getHeaders() {
    const auth = 'Basic ' + Buffer.from(this.apiKey + ':' + this.apiSecret).toString('base64');
    return {
      authorization: auth,
      'Content-Type': 'multipart/form-data'
    };
  }

  async sendTelemetryData() {
    const formData = new FormData();
    const filePath = './sampleData.json';
    if (!fs.existsSync(filePath)) throw new BadRequestException('file does not exist');
    formData.append('file', fs.createReadStream(filePath));

    const url = `${IpfsBaseUrl}/api/v0/add`;
    const method = HttpMethod.POST;
    const headers = this.getHeaders();

    const testPayload = {
      ip: { id: 123, misc: ['User1', 'User2'] },
      throughput_mbs: '20',
      cpu: '120gb',
      ram: '16gb'
    };

    const requestPayload: IRequestPayload = {
      url,
      method,
      headers,
      data: JSON.stringify(testPayload)
      // auth: `${this.apiKey}:${this.apiSecret}`
    };

    return await this.httpsService.request(requestPayload);
  }
}
