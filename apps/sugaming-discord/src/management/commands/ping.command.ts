import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { EnableMethodLoggerDecorator } from '../../decorators/enable-method-logger.decorator';

@Injectable()
@Command({
  name: 'ping',
  description: 'Изпраща информация за всички събития по време на хакатона',
})
export class PingCommand {
  @Handler()
  @EnableMethodLoggerDecorator()
  async handler(interaction: CommandInteraction): Promise<string> {
    return `🏓 Pong! ${Math.round(
      Date.now() - interaction.createdTimestamp,
    )}ms`;
  }
}
