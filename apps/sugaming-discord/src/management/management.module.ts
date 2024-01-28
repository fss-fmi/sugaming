import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { PingCommand } from './ping.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [PingCommand],
})
export class ManagementModule {}
