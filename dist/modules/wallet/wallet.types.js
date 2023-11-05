"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.Chains = void 0;
const openapi = require("@nestjs/swagger");
var Chains;
(function (Chains) {
    Chains["ephemeral"] = "ephemeral";
    Chains["metamask"] = "metamask";
    Chains["near"] = "near";
})(Chains = exports.Chains || (exports.Chains = {}));
var Network;
(function (Network) {
    Network["testNet"] = "testNet";
    Network["mainNet"] = "mainNet";
})(Network = exports.Network || (exports.Network = {}));
//# sourceMappingURL=wallet.types.js.map