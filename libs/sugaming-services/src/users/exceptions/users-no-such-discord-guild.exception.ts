import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNoSuchDiscordGuildException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('No such Discord server exists.', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      super(
        i18n.t('errors.users.noSuchDiscordGuild'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
