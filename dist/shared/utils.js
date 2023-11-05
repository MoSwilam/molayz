"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const constants_1 = require("./constants");
const fs = require("fs");
const common_1 = require("@nestjs/common");
class Utils {
    static getEntriesFromObjByArrayOfKeys(arr, obj) {
        return Object.fromEntries(arr
            .filter((key) => key in obj)
            .map((key) => [key, obj[key]]));
    }
    IsDebug() {
        const { NODE_ENV: env } = process.env;
        return env === constants_1.ENV.production ? false : true;
    }
    getEnv() {
        const env = this.IsDebug() ? '.env.local' : '.env';
        return env;
    }
    isFileExist(path) {
        if (fs.existsSync(path)) {
            return path;
        }
        throw new common_1.BadGatewayException(`Custom Error: File with ${path} Not found!`);
    }
    static getHttpOptions() {
        const keyPathOnServer = `${process.env.SERVER_CERT_PATH}/${process.env.SERVER_CERT_PRIVATE_KEY_FILE}`;
        const cerPathOnServer = `${process.env.SERVER_CERT_PATH}/${process.env.SERVER_CERT_CERTIFICATE_FILE}`;
        const { NODE_ENV: env } = process.env;
        console.log({ keyPathOnServer, cerPathOnServer });
        const keyOnServer = fs.readFileSync(keyPathOnServer, 'utf8');
        const cerOnServer = fs.readFileSync(cerPathOnServer, 'utf8');
        const prodOptions = {
            key: keyOnServer,
            cert: cerOnServer
        };
        return prodOptions;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map