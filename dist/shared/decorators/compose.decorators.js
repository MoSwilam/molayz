"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAuthDecorators = exports.AuthDecorators = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
const agent_auth_guard_1 = require("../guards/agent.auth.guard");
const AuthDecorators = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(new auth_guard_1.AuthGuard()), (0, swagger_1.ApiBearerAuth)());
};
exports.AuthDecorators = AuthDecorators;
const AgentAuthDecorators = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(new agent_auth_guard_1.AgentAuthGuard()), (0, swagger_1.ApiBearerAuth)());
};
exports.AgentAuthDecorators = AgentAuthDecorators;
//# sourceMappingURL=compose.decorators.js.map