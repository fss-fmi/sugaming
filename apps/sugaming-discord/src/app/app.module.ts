import { Module } from '@nestjs/common';

import { DiscordModule } from '@discord-nestjs/core';
import { appConfig } from './app.config';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => appConfig.discord,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
