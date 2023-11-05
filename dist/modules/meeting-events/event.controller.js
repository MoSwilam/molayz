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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const event_types_1 = require("./event.types");
const event_service_1 = require("./event.service");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    createEventRoomCreated(payload) {
        return this.eventService.createRoom(payload);
    }
    createEventOccupantJoined(payload) {
        return this.eventService.createOccupantJoined(payload);
    }
    EventOccupantLeft(payload) {
        return this.eventService.createOccupantLeft(payload);
    }
    createEventRoomDestroyed(payload) {
        return this.eventService.createRommdestroyed(payload);
    }
};
__decorate([
    (0, common_1.Post)('/room/created'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_types_1.EventRoomCreatedType]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEventRoomCreated", null);
__decorate([
    (0, common_1.Post)('/occupant/joined'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_types_1.EventOccupantJoinedType]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEventOccupantJoined", null);
__decorate([
    (0, common_1.Post)('/occupant/left'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_types_1.EventOccupantLeftType]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "EventOccupantLeft", null);
__decorate([
    (0, common_1.Post)('/room/destroyed'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_types_1.EventRoomDestroyedType]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEventRoomDestroyed", null);
EventController = __decorate([
    (0, swagger_1.ApiTags)('Event'),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map