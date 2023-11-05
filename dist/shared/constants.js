"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.HttpMethod = void 0;
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
//# sourceMappingURL=constants.js.map