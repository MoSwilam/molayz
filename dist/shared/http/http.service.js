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
exports.HttpClientService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let HttpClientService = class HttpClientService {
    constructor(httpsService) {
        this.httpsService = httpsService;
    }
    async request(payload) {
        try {
            const { url, headers, data: requestData, method, params, auth } = payload;
            const options = {
                url,
                headers: headers || null,
                method,
                data: requestData || null,
                params: params || null,
                auth
            };
            const res = await this.httpsService.request(options).toPromise();
            console.log({ res: res });
            return res.data;
        }
        catch (e) {
            const message = e.response.data || e.response.message || e.message || 'ambiguous';
            throw new common_1.HttpException(message, e.response.status || 400);
        }
    }
};
HttpClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpClientService);
exports.HttpClientService = HttpClientService;
//# sourceMappingURL=http.service.js.map