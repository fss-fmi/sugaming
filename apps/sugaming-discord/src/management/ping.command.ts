import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';

@Injectable()
@Command({
  name: 'ping',
  description: 'Изпраща информация за всички събития по време на хакатона',
})
export class PingCommand {
  @Handler()
  async handler(interaction: CommandInteraction): Promise<string> {
    return 'pong';
  }
}
