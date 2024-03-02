import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { RedisModule } from '@songkeys/nestjs-redis';
import { MulterModule } from '@nestjs/platform-express';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Cs2TeamsModule } from '../cs2/teams/cs2-teams.module';
import { appConfig } from './app.config';
import { SponsorsModule } from '../sponsors/sponsors.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, 'assets', 'i18n'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    RedisModule.forRoot({ config: appConfig.redis }),
    MulterModule.register({
      dest: appConfig.multer.destination,
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    Cs2TeamsModule,
    SponsorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
