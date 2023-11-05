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
exports.IpfsService = void 0;
const common_1 = require("@nestjs/common");
const http_service_1 = require("../../shared/http/http.service");
const constants_1 = require("../../shared/constants");
const ipfs_types_1 = require("./ipfs.types");
const FormData = require("form-data");
const fs_1 = require("fs");
let IpfsService = class IpfsService {
    constructor(httpsService) {
        this.httpsService = httpsService;
        this.apiKey = process.env.INFURA_API_KEY;
        this.apiSecret = process.env.INFURA_API_SECRET;
    }
    getHeaders() {
        const auth = 'Basic ' + Buffer.from(this.apiKey + ':' + this.apiSecret).toString('base64');
        return {
            authorization: auth,
            'Content-Type': 'multipart/form-data'
        };
    }
    async sendTelemetryData() {
        const formData = new FormData();
        const filePath = './sampleData.json';
        if (!fs_1.default.existsSync(filePath))
            throw new common_1.BadRequestException('file does not exist');
        formData.append('file', fs_1.default.createReadStream(filePath));
        const url = `${ipfs_types_1.IpfsBaseUrl}/api/v0/add`;
        const method = constants_1.HttpMethod.POST;
        const headers = this.getHeaders();
        const testPayload = {
            ip: { id: 123, misc: ['User1', 'User2'] },
            throughput_mbs: '20',
            cpu: '120gb',
            ram: '16gb'
        };
        const requestPayload = {
            url,
            method,
            headers,
            data: JSON.stringify(testPayload)
        };
        return await this.httpsService.request(requestPayload);
    }
};
IpfsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_service_1.HttpClientService])
], IpfsService);
exports.IpfsService = IpfsService;
//# sourceMappingURL=ipfs.service.js.map