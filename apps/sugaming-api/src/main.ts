import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import version from 'project-version';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';

export async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const { port } = appConfig;
  app.setGlobalPrefix(globalPrefix);

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
    .addGlobalParameters({
      in: 'query',
      required: false,
      name: 'lang',
      schema: {
        type: 'string',
        examples: ['bg', 'en'],
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
}

bootstrap();

export default bootstrap;
