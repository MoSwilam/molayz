"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const compression = require("compression");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const express = require("express");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const http = require("http");
const console_1 = require("console");
async function bootstrap() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors();
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.setGlobalPrefix('api');
    app.use(compression());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidUnknownValues: false,
        exceptionFactory: (validationErrors = []) => {
            return new common_1.HttpException(validationErrors, common_1.HttpStatus.BAD_REQUEST);
        }
    }));
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Relayz API')
        .setDescription('Relayz API documentation')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(`${process.env.SWAGGER_URI}`, app, document);
    await app.init();
    http.createServer(server).listen(process.env.SERVER_PORT_HTTP);
    const { NODE_ENV: env, SERVER_PORT_HTTPS: https_port, SERVER_PORT_HTTP: http_port } = process.env;
    (0, console_1.log)('====================================================');
    (0, console_1.log)(`HTTPS | API started on port: ${https_port}`);
    (0, console_1.log)(`HTTP | API started on port: ${http_port}`);
    (0, console_1.log)(`Running Environment: ${env}`);
    (0, console_1.log)('====================================================');
}
bootstrap();
//# sourceMappingURL=main.js.map