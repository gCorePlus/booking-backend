import 'dotenv/config';
import 'source-map-support/register';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

export const NODE_PORT = +process.env.NODE_PORT || +process.env.PORT || 3000;
export const NODE_HOST = process.env.NODE_HOST || '0.0.0.0';

export const bootstrap = async (module, adapter?: any, options?: any) => {
  const app = await NestFactory.create<INestApplication>(module, new ExpressAdapter(adapter), options || { bufferLogs: true });
  // Configs
  app.useLogger(app.get(Logger));

  // Swagger
  if (!isProduction() || isSwaggerEnabled()) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .addBearerAuth();

    // Swagger Servers
    getSwaggerServers()
      .forEach((url) => config.addServer(url));

    config.setVersion('1.0.0');
    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('/swagger', app, document);
  }

  return app;
};

const isProduction = (): boolean => process.env.NODE_ENV === 'production';
const isSwaggerEnabled = (): boolean => /true/i.test(process.env.SWAGGER_ENABLED);
const getSwaggerServers = (): string[] => process.env.SWAGGER_SERVERS ? process.env.SWAGGER_SERVERS.split(',') : [];
