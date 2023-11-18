import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

console.log(`gosho${__dirname}`);

@Module({
  imports: [
    HealthModule,
    UsersModule,
    AuthModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(
          process.cwd(),
          'apps',
          'sugaming-api',
          'assets',
          'i18n',
        ),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
