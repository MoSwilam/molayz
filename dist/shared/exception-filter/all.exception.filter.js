"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalErrorHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const common_1 = require("@nestjs/common");
let GlobalErrorHandler = GlobalErrorHandler_1 = class GlobalErrorHandler {
    constructor() {
        this.logger = new common_1.Logger(GlobalErrorHandler_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const { response: exceptionResponse } = exception;
        let errors;
        if (exceptionResponse && exceptionResponse instanceof Array) {
            const [validatedObjectErrors] = exceptionResponse;
            errors = validatedObjectErrors.constraints || undefined;
        }
        const errorMessage = errors && Object.keys(errors).length ? 'Validation Error' : exception.message;
        const errorResponse = {
            code: status,
            path: request.url,
            method: request.method,
            timestamp: new Date().toLocaleString(),
            context: GlobalErrorHandler_1.name,
            message: errorMessage,
            errors: errors
        };
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            console.error(exception);
        this.logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse, undefined, 2));
        response.status(status).json(errorResponse);
    }
};
GlobalErrorHandler = GlobalErrorHandler_1 = __decorate([
    (0, common_1.Catch)()
], GlobalErrorHandler);
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=all.exception.filter.js.map