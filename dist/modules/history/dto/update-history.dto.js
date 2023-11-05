"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHistoryDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_history_dto_1 = require("./create-history.dto");
class UpdateHistoryDto extends (0, mapped_types_1.PartialType)(create_history_dto_1.CreateHistoryDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateHistoryDto = UpdateHistoryDto;
//# sourceMappingURL=update-history.dto.js.map