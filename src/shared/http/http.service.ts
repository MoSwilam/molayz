import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IRequestPayload } from '../constants';

@Injectable()
export class HttpClientService {
  constructor(private httpsService: HttpService) {}

  async request(payload: IRequestPayload): Promise<any> {
    try {
      const { url, headers, data: requestData, method, params, auth } = payload;

      const options = {
        url,
        headers: headers || null,
        method,
        data: requestData || null,
        params: params || null,
        auth
      };

      const res = await this.httpsService.request(options).toPromise();
      console.log({ res: res });
      return res.data;
    } catch (e) {
      const message = e.response.data || e.response.message || e.message || 'ambiguous';
      throw new HttpException(message, e.response.status || 400);
    }
  }
}
