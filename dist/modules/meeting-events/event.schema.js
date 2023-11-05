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
exports.EventSchema = exports.EventEntity = exports.OcupantEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
class OcupantEntity {
}
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OcupantEntity.prototype, "occupant_jid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OcupantEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OcupantEntity.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OcupantEntity.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", String)
], OcupantEntity.prototype, "joined_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", String)
], OcupantEntity.prototype, "left_at", void 0);
exports.OcupantEntity = OcupantEntity;
let EventEntity = class EventEntity {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventEntity.prototype, "event_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventEntity.prototype, "room_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", String)
], EventEntity.prototype, "room_jid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventEntity.prototype, "is_breakout", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Object)
], EventEntity.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Object)
], EventEntity.prototype, "destroyed_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({
        ref: OcupantEntity.name,
        required: false
    }),
    __metadata("design:type", Array)
], EventEntity.prototype, "all_occupants", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, mongoose_1.Prop)({
        ref: OcupantEntity.name,
        required: false
    }),
    __metadata("design:type", OcupantEntity)
], EventEntity.prototype, "occupant", void 0);
EventEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'event-sync-data' })
], EventEntity);
exports.EventEntity = EventEntity;
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(EventEntity);
//# sourceMappingURL=event.schema.js.map