import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersEmailAlreadyInUseException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    super(
      i18n.t('errors.users.emailAlreadyInUseException'),
      HttpStatus.CONFLICT,
    );
  }
}
