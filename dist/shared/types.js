"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLibCredsFilePath = exports.ContracttIdEnv = exports.ENV = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var ENV;
(function (ENV) {
    ENV["development"] = "dev";
    ENV["production"] = "prd";
    ENV["staging"] = "stg";
    ENV["local"] = "local";
    ENV["debug"] = "debug";
})(ENV = exports.ENV || (exports.ENV = {}));
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
//# sourceMappingURL=types.js.map