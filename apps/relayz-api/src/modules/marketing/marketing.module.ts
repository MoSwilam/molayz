import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingEntity, MarketingSchema } from './marketing.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MarketingEntity.name, schema: MarketingSchema }])],
  controllers: [MarketingController],
  providers: [MarketingService]
})
export class MarketingModule {}
