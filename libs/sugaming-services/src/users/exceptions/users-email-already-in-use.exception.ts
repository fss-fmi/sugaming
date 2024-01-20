import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersEmailAlreadyInUseException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('This email address is already in use.', HttpStatus.CONFLICT);
    } else {
      super(i18n.t('errors.users.emailAlreadyInUse'), HttpStatus.CONFLICT);
    }
  }
}
