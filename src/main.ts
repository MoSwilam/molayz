import 'dotenv';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import * as express from 'express';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Utils } from './shared/utils';
import * as http from 'http';
import * as https from 'https';
import { log } from 'console';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.setGlobalPrefix('api');
  app.use(compression());

  // app.use(
  //   rateLimit({
  //     validate: false,
  //     windowMs: 5 * 60 * 1000, // 5 minutes
  //     max: 200 // limit each IP to 100 requests per windowMs
  //   })
  // );

  /** Global Validation pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new HttpException(validationErrors, HttpStatus.BAD_REQUEST);
      }
    })
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Relayz API')
    .setDescription('Relayz API documentation')
    .setVersion('1.0')
    .build();

  // if (process.env.NODE_ENV !== 'prd') {
  //   const document = SwaggerModule.createDocument(app, options);
  //   SwaggerModule.setup(`${process.env.SWAGGER_URI}`, app, document);
  // }

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${process.env.SWAGGER_URI}`, app, document);

  await app.init();
  http.createServer(server).listen(process.env.SERVER_PORT_HTTP);

  // const httpsOptions = Utils.getHttpOptions();
  // https.createServer(httpsOptions, server).listen(process.env.SERVER_PORT_HTTPS);

  const { NODE_ENV: env, SERVER_PORT_HTTPS: https_port, SERVER_PORT_HTTP: http_port } = process.env;
  log('====================================================');
  log(`HTTPS | API started on port: ${https_port}`);
  log(`HTTP | API started on port: ${http_port}`);
  log(`Running Environment: ${env}`);
  log('====================================================');
}
bootstrap();
