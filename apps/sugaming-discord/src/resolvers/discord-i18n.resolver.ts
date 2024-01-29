import { I18nResolver } from 'nestjs-i18n';
import { ExecutionContext } from '@nestjs/common';

export class DiscordI18nResolver implements I18nResolver {
  resolve(context: ExecutionContext) {
    return context.getArgByIndex(0)?.guildLocale;
  }
}
