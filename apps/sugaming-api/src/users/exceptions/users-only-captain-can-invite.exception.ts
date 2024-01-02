import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersOnlyCaptainCanInviteException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    super(
      i18n.t('errors.cs2.teams.onlyCaptainCanInvite'),
      HttpStatus.FORBIDDEN,
    );
  }
}
