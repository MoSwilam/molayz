import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MarketingStatus } from './marketing.types';

export type MarketingDocument = HydratedDocument<MarketingEntity>;

@Schema({ timestamps: true, collection: 'marketing' })
export class MarketingEntity {
  @Prop()
  secret: string;

  @Prop()
  label: string;

  @Prop()
  urlToredirect: string;

  @Prop()
  startDate: string;

  @Prop()
  expirationdate: string;

  @Prop({ default: MarketingStatus.SUCCESS })
  status: MarketingStatus;

  @Prop()
  error: string;
}

export const MarketingSchema = SchemaFactory.createForClass(MarketingEntity);
