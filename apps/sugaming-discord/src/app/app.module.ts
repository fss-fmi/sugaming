import { Module } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';
import { appConfig } from './app.config';
import { BotModule } from '../bot/bot.module';
import { ManagementModule } from '../management/management.module';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => appConfig.discord,
    }),
    BotModule,
    ManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
