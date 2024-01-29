import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { I18nContext } from 'nestjs-i18n';
import { EnableMethodLoggerDecorator } from '../../decorators/enable-method-logger.decorator';

@Injectable()
@Command({
  name: 'ping',
  description: 'Отговаря с "Pong!" когато ботът функционира правилно.',
})
export class PingCommand {
  @Handler()
  @EnableMethodLoggerDecorator()
  async pingCommandHandler(interaction: CommandInteraction) {
    const i18n = I18nContext.current();

    return `🏓 ${i18n.t('management.messages.pong')} (${
      interaction.client.ws.ping
    } ms)`;
  }
}
