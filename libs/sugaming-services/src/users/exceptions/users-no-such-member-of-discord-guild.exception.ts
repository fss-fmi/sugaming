import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNoSuchMemberOfDiscordGuildException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'No such member of the Discord server exists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      super(
        i18n.t('errors.users.noSuchMemberOfDiscordGuild'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
