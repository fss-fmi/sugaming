import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNoDiscordAccountLinkedException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You have not linked your Discord account.', HttpStatus.NOT_FOUND);
    } else {
      super(
        i18n.t('errors.users.noDiscordAccountLinked'),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
