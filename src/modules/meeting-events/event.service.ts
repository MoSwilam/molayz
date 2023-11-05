import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument, EventEntity } from './event.schema';

import {
  EventRoomCreatedType,
  EventRoomDestroyedType,
  EventOccupantJoinedType,
  EventOccupantLeftType
} from './event.types';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventEntity.name)
    private eventModel: Model<EventDocument>
  ) {}

  async createRoom(payload: EventRoomCreatedType) {
    const doc = new this.eventModel(payload);
    return await doc.save();
  }

  async createRommdestroyed(payload: EventRoomDestroyedType) {
    const doc = new this.eventModel(payload);
    return await doc.save();
  }

  async createOccupantJoined(payload: EventOccupantJoinedType) {
    const doc = new this.eventModel(payload);
    return await doc.save();
  }

  async createOccupantLeft(payload: EventOccupantLeftType) {
    const doc = new this.eventModel(payload);
    return await doc.save();
  }
}
