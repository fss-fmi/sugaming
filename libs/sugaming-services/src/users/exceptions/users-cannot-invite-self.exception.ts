import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersCannotInviteSelfException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('You cannot invite yourself.', HttpStatus.FORBIDDEN);
    } else {
      super(i18n.t('errors.users.cannotInviteSelf'), HttpStatus.FORBIDDEN);
    }
  }
}
