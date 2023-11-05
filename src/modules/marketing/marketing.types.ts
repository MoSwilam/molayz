import { IsNotEmpty } from 'class-validator';

export class MarketingDto {
  label: string;
  secret: string;
  urlToRedirect: string;
  startDate: string;
  expirationdate: string;
}

export class GetMarketingByIdAndSecret {
  id?: string;

  @IsNotEmpty()
  secret: string;
}

export enum MarketingStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}
