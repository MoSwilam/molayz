"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoomDestroyedType = exports.EventRoomCreatedType = exports.EventOccupantLeftType = exports.EventOccupantJoinedType = exports.EventOcupantType = exports.EventType = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EventType {
    static _OPENAPI_METADATA_FACTORY() {
        return { event_name: { required: true, type: () => String }, room_name: { required: true, type: () => String }, room_jid: { required: true, type: () => String }, is_breakout: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EventType.prototype, "event_name", void 0);
exports.EventType = EventType;
class EventOcupantType {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, id: { required: true, type: () => String }, occupant_jid: { required: true, type: () => String }, joined_at: { required: true, type: () => Date }, left_at: { required: true, type: () => Date } };
    }
}
exports.EventOcupantType = EventOcupantType;
class EventOccupantJoinedType extends EventType {
    static _OPENAPI_METADATA_FACTORY() {
        return { occupant: { required: true, type: () => require("./event.types").EventOcupantType } };
    }
}
exports.EventOccupantJoinedType = EventOccupantJoinedType;
class EventOccupantLeftType extends EventType {
    static _OPENAPI_METADATA_FACTORY() {
        return { occupant: { required: true, type: () => require("./event.types").EventOcupantType } };
    }
}
exports.EventOccupantLeftType = EventOccupantLeftType;
class EventRoomCreatedType extends EventType {
    static _OPENAPI_METADATA_FACTORY() {
        return { created_at: { required: true, type: () => Date } };
    }
}
exports.EventRoomCreatedType = EventRoomCreatedType;
class EventRoomDestroyedType extends EventRoomCreatedType {
    static _OPENAPI_METADATA_FACTORY() {
        return { created_at: { required: true, type: () => Date }, destroyed_at: { required: true, type: () => Date }, all_occupants: { required: true, type: () => [require("./event.types").EventOcupantType] } };
    }
}
exports.EventRoomDestroyedType = EventRoomDestroyedType;
//# sourceMappingURL=event.types.js.map