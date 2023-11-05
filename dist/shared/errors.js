"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorGenerator = void 0;
class ErrorGenerator {
    static userFound(email) {
        return `user with email "${email}" exists!`;
    }
    static walletFound(address) {
        return `wallet "${address}" exists!`;
    }
    static telemetryFound(address) {
        return `telemetry "${address}" exists!`;
    }
}
exports.ErrorGenerator = ErrorGenerator;
//# sourceMappingURL=errors.js.map