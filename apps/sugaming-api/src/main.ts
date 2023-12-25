import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import version from 'project-version';
import { generate } from 'openapi-typescript-codegen';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';

export async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const { port } = appConfig;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  // OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('sugaming-api')
    .setDescription(
      'API for the Sofia University gaming club tournament and event platform.',
    )
    .setVersion(version)
    .setLicense(
      'License',
      'https://github.com/fss-fmi/sugaming/blob/main/LICENSE',
    )
    .setExternalDoc(
      'Developer Wiki',
      'https://github.com/fss-fmi/sugaming/wiki',
    )
    .setContact(
      'SUGAMING',
      'https://sugaming-site.vercel.app/',
      'all@fss.fmi.uni-sofia.bg',
    )
    .addBearerAuth({
      type: 'http',
      in: 'header',
      name: 'Authorization',
      description: 'Authorization bearer token',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Authorization',
      schema: {
        type: 'string',
        examples: ['Bearer <token>'],
      },
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Accept-Language',
      schema: {
        type: 'string',
        examples: ['bg', 'bg-bg', 'en', 'en-us', 'en;q=0.9, bg;q=0.8, *;q=0.7'],
        description: 'The natural language and locale that the client prefers',
      },
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Cache-Control',
      schema: {
        type: 'string',
        examples: ['no-cache'],
        description:
          'Used to specify directives that must be obeyed by all caching mechanisms along the request-response chain',
      },
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Pragma',
      schema: {
        type: 'string',
        examples: ['no-cache'],
        description:
          'Implementation-specific fields that may have various effects anywhere along the request-response chain',
      },
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Expires',
      schema: {
        type: 'string',
        examples: ['0'],
        description:
          'The date/time after which the response is considered stale',
      },
    })
    .addGlobalParameters({
      in: 'cookie',
      required: false,
      name: 'lang',
    })
    .build();
  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(globalPrefix, app, document);

  // Start the API
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );

  // Generate API client
  if (appConfig.env === 'development') {
    const clientOutputDirectory = './libs/sugaming-api-client/src/client/src';
    await generate({
      input: `http://localhost:${port}/api-json`,
      output: clientOutputDirectory,
      useOptions: true,
    });
    Logger.log(`🧬 Generated API client in ${clientOutputDirectory}`);
  }
}

bootstrap();

export default bootstrap;
