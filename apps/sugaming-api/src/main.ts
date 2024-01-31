import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import version from 'project-version';
import { generate } from 'openapi-typescript-codegen';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';

export async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const { port } = appConfig;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  // Validation setup
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

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
      in: 'cookie',
      required: false,
      name: 'access_token',
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
      httpClient: 'fetch',
      useOptions: true,
    });
    Logger.log(`🧬 Generated API client in ${clientOutputDirectory}`);
  }
}

bootstrap();

export default bootstrap;
