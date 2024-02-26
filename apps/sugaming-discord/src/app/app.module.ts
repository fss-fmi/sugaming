import { Module } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';
import { I18nModule } from 'nestjs-i18n';
import path from 'path';
import { RedisModule } from '@songkeys/nestjs-redis';
import { appConfig } from './app.config';
import { BotModule } from '../bot/bot.module';
import { ManagementModule } from '../management/management.module';
import { DiscordI18nResolver } from '../resolvers/discord-i18n.resolver';
import { UsersModule } from '../users/users.module';
import { Cs2TeamsModule } from '../cs2-teams/cs2-teams.module';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => appConfig.discord,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'bg',
      loaderOptions: {
        path: path.join(__dirname, 'assets', 'i18n'),
        watch: true,
      },
      resolvers: [DiscordI18nResolver],
    }),
    RedisModule.forRoot({ config: appConfig.redis }),
    BotModule,
    ManagementModule,
    UsersModule,
    Cs2TeamsModule,
  ],
})
export class AppModule {}
