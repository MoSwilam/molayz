"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAppService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let DAppService = class DAppService {
    constructor() {
        this.filePath = 'src/misc/dapp/docker-compose.yml';
    }
    imageBuffer() {
        return (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), this.filePath));
    }
    imageStream() {
        return (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), this.filePath));
    }
    fileBuffer() {
        return (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), this.filePath));
    }
    fileStream() {
        return (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), this.filePath));
    }
};
DAppService = __decorate([
    (0, common_1.Injectable)()
], DAppService);
exports.DAppService = DAppService;
//# sourceMappingURL=dapp.service.js.map