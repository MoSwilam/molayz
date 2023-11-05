import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEntity, EventSchema } from './event.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: EventEntity.name, schema: EventSchema }])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
