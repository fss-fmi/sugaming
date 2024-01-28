import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class AuthUnauthorizedException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'You are not authorized to access this resource.',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      super(i18n.t('errors.auth.unauthorized'), HttpStatus.UNAUTHORIZED);
    }
  }
}
