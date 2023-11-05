import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Date, Document, Types as MongooseTypes } from 'mongoose';

export type EventDocument = EventEntity & Document;

export class OcupantEntity {
  @Prop()
  occupant_jid: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  id: string;

  @Prop({ type: Date })
  joined_at: string;

  @IsOptional()
  @Prop({ type: Date })
  left_at: string;
}

@Schema({ timestamps: true, collection: 'event-sync-data' })
export class EventEntity {
  @Prop()
  event_name: string;

  @Prop()
  room_name: string;

  @Prop({ type: MongooseTypes.ObjectId })
  room_jid: string;

  @Prop()
  is_breakout: string;

  @IsOptional()
  @Prop({ type: Date })
  created_at: Date;

  @IsOptional()
  @Prop({ type: Date })
  destroyed_at: Date;

  @IsOptional()
  @Prop({
    ref: OcupantEntity.name,
    required: false
  })
  all_occupants: OcupantEntity[];

  @IsOptional()
  @Prop({
    ref: OcupantEntity.name,
    required: false
  })
  occupant: OcupantEntity;
}

export const EventSchema = SchemaFactory.createForClass(EventEntity);
