import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  EventOccupantJoinedType,
  EventOccupantLeftType,
  EventRoomCreatedType,
  EventRoomDestroyedType
} from './event.types';
import { EventService } from './event.service';

@ApiTags('Event')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/room/created')
  // @AuthDecorators()
  createEventRoomCreated(@Body() payload: EventRoomCreatedType) {
    return this.eventService.createRoom(payload);
  }

  @Post('/occupant/joined')
  // @AuthDecorators()
  createEventOccupantJoined(@Body() payload: EventOccupantJoinedType) {
    return this.eventService.createOccupantJoined(payload);
  }

  @Post('/occupant/left')
  // @AuthDecorators()
  EventOccupantLeft(@Body() payload: EventOccupantLeftType) {
    return this.eventService.createOccupantLeft(payload);
  }

  @Post('/room/destroyed')
  // @AuthDecorators()
  createEventRoomDestroyed(@Body() payload: EventRoomDestroyedType) {
    return this.eventService.createRommdestroyed(payload);
  }
}
