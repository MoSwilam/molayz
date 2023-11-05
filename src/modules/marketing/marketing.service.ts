import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GetMarketingByIdAndSecret, MarketingDto } from './marketing.types';
import { InjectModel } from '@nestjs/mongoose';
import { MarketingEntity } from './marketing.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MarketingService {
  constructor(
    @InjectModel(MarketingEntity.name)
    private readonly marketingModel: Model<MarketingEntity>
  ) {}

  async getMarketingCampaign({ id, secret }: GetMarketingByIdAndSecret) {
    const campaign = await this.marketingModel.findById(id);
    if (!campaign) throw new NotFoundException();

    const isSecretValid = await bcrypt.compare(secret, campaign.secret);
    if (!isSecretValid) {
      throw new UnauthorizedException('secret is not valid!');
    }
    return campaign;
  }

  async create(payload: MarketingDto) {
    payload.secret = await bcrypt.hash(payload.secret, 10);
    return await this.marketingModel.create(payload);
  }
}
