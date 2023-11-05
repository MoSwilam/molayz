"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLibCredsFilePath = exports.ContracttIdEnv = void 0;
const openapi = require("@nestjs/swagger");
var ContracttIdEnv;
(function (ContracttIdEnv) {
    ContracttIdEnv["development"] = "dev-relayz-node.testnet";
    ContracttIdEnv["production"] = "relayz-node.testnet";
    ContracttIdEnv["staging"] = "stage-relayz-node.testnet";
})(ContracttIdEnv = exports.ContracttIdEnv || (exports.ContracttIdEnv = {}));
var ClientLibCredsFilePath;
(function (ClientLibCredsFilePath) {
    ClientLibCredsFilePath["development"] = "dev-relayz-api-secret.json";
    ClientLibCredsFilePath["production"] = "relayz-api-secret.json";
    ClientLibCredsFilePath["staging"] = "stage-relayz-api-secret.json";
})(ClientLibCredsFilePath = exports.ClientLibCredsFilePath || (exports.ClientLibCredsFilePath = {}));
//# sourceMappingURL=cli-lib.types.js.map