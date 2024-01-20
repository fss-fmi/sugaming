import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class UsersInviteAlreadyPendingException extends HttpException {
  constructor() {
    const i18n = I18nContext.current();
    if (!i18n) {
      super(
        'An invitation to this user is already pending.',
        HttpStatus.CONFLICT,
      );
    } else {
      super(i18n.t('errors.users.inviteAlreadyPending'), HttpStatus.CONFLICT);
    }
  }
}
