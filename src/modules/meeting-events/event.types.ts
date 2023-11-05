import { IsNotEmpty } from 'class-validator';

// Refer.: https://github.com/jitsi-contrib/prosody-plugins/tree/main/event_sync

export class EventType {
  @IsNotEmpty()
  event_name: string;
  room_name: string;
  room_jid: string;
  is_breakout: boolean;
}

export class EventOcupantType {
  name: string;
  email: string;
  id: string;
  occupant_jid: string;
  joined_at: Date;
  left_at: Date;
}

//#region Ocupant

/**
 * @class {OccupantJoined}
 * When an occupant joins, POST ${api_prefix}/events/occupant/joined is called with JSON payload containing:
 * - event_name
 * - room_name
 * - room_jid
 * - is_breakout
 * - breakout_room_id (only if is_breakout is true)
 * - occupant joined object as {@class EventOcupantType}
 */
export class EventOccupantJoinedType extends EventType {
  occupant: EventOcupantType;
}

/**
 * @class {OccupantLeft}
 * When an occupant joins, POST ${api_prefix}/events/occupant/left is called with JSON payload containing:
 * - event_name
 * - room_name
 * - room_jid
 * - is_breakout
 * - breakout_room_id (only if is_breakout is true)
 * - occupant left object as {@class EventOcupantType}
 */
export class EventOccupantLeftType extends EventType {
  occupant: EventOcupantType;
}

//#endregion

//#region Room
/**
 * @class {RoomCreated}
 * When a room is created, POST ${api_prefix}/events/room/created is called with JSON payload containing:
 */
export class EventRoomCreatedType extends EventType {
  created_at: Date;
}

/**
 * @class {RoomDestroyed}
 * When a room is destroyed, POST ${api_prefix}/events/room/destroyed is called with JSON payload containing:
 * - event_name
 * - room_name
 * - room_jid
 * - is_breakout
 * - breakout_room_id (only if is_breakout is true)
 * - created_at
 * - destroyed_at
 * - all_occupants (list of all occupants that has joined since room created)
 */
export class EventRoomDestroyedType extends EventRoomCreatedType {
  created_at: Date;
  destroyed_at: Date;
  all_occupants: EventOcupantType[];
}

//#endregion
