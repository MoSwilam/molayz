export declare class EventType {
    event_name: string;
    room_name: string;
    room_jid: string;
    is_breakout: boolean;
}
export declare class EventOcupantType {
    name: string;
    email: string;
    id: string;
    occupant_jid: string;
    joined_at: Date;
    left_at: Date;
}
export declare class EventOccupantJoinedType extends EventType {
    occupant: EventOcupantType;
}
export declare class EventOccupantLeftType extends EventType {
    occupant: EventOcupantType;
}
export declare class EventRoomCreatedType extends EventType {
    created_at: Date;
}
export declare class EventRoomDestroyedType extends EventRoomCreatedType {
    created_at: Date;
    destroyed_at: Date;
    all_occupants: EventOcupantType[];
}
