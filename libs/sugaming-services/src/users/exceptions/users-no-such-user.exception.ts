import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersNoSuchUserException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super('No such user exists.', HttpStatus.NOT_FOUND);
    } else {
      super(i18n.t('errors.users.noSuchUser'), HttpStatus.NOT_FOUND);
    }
  }
}
