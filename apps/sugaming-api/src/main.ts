import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import version from 'project-version';
import { AppModule } from './app/app.module';

export async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
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
