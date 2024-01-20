import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersSteamAccountAlreadyLinkedException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'Your Steam account is already linked to an user.',
        HttpStatus.FORBIDDEN,
      );
    } else {
      super(
        i18n.t('errors.users.steamAccountAlreadyLinked'),
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
